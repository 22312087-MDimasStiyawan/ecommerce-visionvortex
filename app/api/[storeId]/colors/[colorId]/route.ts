import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
    { params }: { params: { colorId: string } }
  ) {
    try {
      if (!params.colorId) {
        return new NextResponse("WARNA id dibutuhkan", { status: 400 });
      }

      const color = await db.color.findUnique({
        where: {
          id: params.colorId,
        },
      });
  
      return NextResponse.json(color);
    } catch (error) {
      console.log("[COLOR_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, colorId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse(" menginput nama", { status: 400 });
    }
    if (!value) {
        return new NextResponse("menginput Value", { status: 400 });
      }
    if (!params.colorId) {
      return new NextResponse("Warna id Diinputkan", { status: 400 });
    }

    const storeByUserId =  await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!storeByUserId) {
        return new NextResponse("Unauthorized", {status: 403});
    }

    const color = await db.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
  ) {
    try {
      const { userId } = await auth();
  
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      if (!params.colorId) {
        return new NextResponse("id ukuran dibutuhkan", { status: 400 });
      }

      const storeByUserId =  await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!storeByUserId) {
        return new NextResponse("Unauthorized", {status: 403});
    }
  
      const color = await db.color.deleteMany({
        where: {
          id: params.colorId,
        },
      });
  
      return NextResponse.json(color);
    } catch (error) {
      console.log("[COLOR_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
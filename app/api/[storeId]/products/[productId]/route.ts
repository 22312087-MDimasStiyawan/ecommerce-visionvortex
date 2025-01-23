import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
    { params }: { params: { productId: string } }
  ) {
    try {
      if (!params.productId) {
        return new NextResponse("Produk id dibutuhkan", { status: 400 });
      }

      const product = await db.product.findUnique({
        where: {
          id: params.productId,
        },
        include: {
          images: true,
          category: true,
          size: true,
          color: true,
        },
      });
  
      return NextResponse.json(product);
    } catch (error) {
      console.log("[PRODUCT_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, billboardId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label menginput nama", { status: 400 });
    }
    if (!imageUrl) {
        return new NextResponse("menginput Gambar Url", { status: 400 });
      }
    if (!params.billboardId) {
      return new NextResponse("Papan Iklan Diinputkan", { status: 400 });
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

    const billboard = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
  ) {
    try {
      const { userId } = await auth();
  
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      if (!params.billboardId) {
        return new NextResponse("Papan Iklan id dibutuhkan", { status: 400 });
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
  
      const billboard = await db.billboard.deleteMany({
        where: {
          id: params.billboardId,
        },
      });
  
      return NextResponse.json(billboard);
    } catch (error) {
      console.log("[BILLBOARD_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
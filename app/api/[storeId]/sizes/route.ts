import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { useParams } from "next/navigation";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try{
        const { userId} = await auth()
        const body = await req.json();

        const {name, value} = body

        if (!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!name){
            return new NextResponse("Nama Toko Perlu diinput", {status: 400})
        }

        if (!value){
            return new NextResponse("Value Perlu diinput", {status: 400})
        }

        if (!params.storeId) {
            return new NextResponse("Id Toko Perlu diinput", {status: 400})
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
        
        // Membuat entri baru pada tabel 'store' dalam database.
        const size = await db.size.create({
            data: {
                name,
                value,
                storeId: params.storeId
            },
         });
    return NextResponse.json(size);
    }catch (error){
        console.log("[SIZES_POST]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function GET(
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try{
        if (!params.storeId) {
            return new NextResponse("Id Toko Perlu diinput", {status: 400})
        }

        const size = await db.size.findMany({
            where: {
                storeId: params.storeId,
            }
         });
    return NextResponse.json(size);
    }catch (error){
        console.log("[SIZES_GET]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}
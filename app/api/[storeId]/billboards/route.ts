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

        const {label, imageUrl} = body

        if (!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!label){
            return new NextResponse("label Toko Perlu diinput", {status: 400})
        }

        if (!imageUrl){
            return new NextResponse("Gambar URL Perlu diinput", {status: 400})
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
        const billboard = await db.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            },
         });
    return NextResponse.json(billboard);
    }catch (error){
        console.log("[BILLBOARDS_POST]", error)
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

        const billboard = await db.billboard.findMany({
            where: {
                storeId: params.storeId,
            }
         });
    return NextResponse.json(billboard);
    }catch (error){
        console.log("[BILLBOARDS_GET]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}
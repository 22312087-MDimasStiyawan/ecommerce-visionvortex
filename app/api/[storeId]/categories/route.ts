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

        const {name, billboardId} = body

        if (!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!name){
            return new NextResponse("Nama Toko Perlu diinput", {status: 400})
        }

        if (!billboardId){
            return new NextResponse("Billboard Perlu diinput", {status: 400})
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
        const category = await db.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            },
         });
    return NextResponse.json(category);
    }catch (error){
        console.log("[CATEGORIES_POST]", error)
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

        const categories = await db.category.findMany({
            where: {
                storeId: params.storeId,
            }
         });
    return NextResponse.json(categories);
    }catch (error){
        console.log("[CATEGORIES_GET]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}
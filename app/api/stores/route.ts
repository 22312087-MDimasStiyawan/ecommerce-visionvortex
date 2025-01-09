import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const { userId} = await auth()
        const body = await req.json();

        const {name} = body

        if (!userId){
            return new NextResponse("unauthorized", {status: 401})
        }

        if (!name){
            return new NextResponse("Nama Toko Perlu diinput", {status: 400})
        }
        
        // Membuat entri baru pada tabel 'store' dalam database.
        const store = await db.store.create({
            data: {
                name,
                userId
            },
         });
    return new NextResponse(JSON.stringify(store), { status: 200 });
    }catch (error){
        console.log("[STORES_POST]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}
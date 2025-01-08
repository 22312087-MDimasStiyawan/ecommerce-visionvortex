import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const { userId} = await auth()
        const body = await req.json();

        const {name} = body

    }catch (error){
        console.log("[STORES_POST]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}
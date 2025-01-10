import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async  function DELETE (
    req:Request,
    { params }: {params: {storeId: string }}
){ 
    try {
        const {userId } = await auth();

        if (!userId) {
            return new NextResponse("unauthenticated", { status: 401 });
        }

        if (!params.storeId){
            return new NextResponse("Store id is required", { status:400});
            }

        const store = await db.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        });
        
        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal error", {status: 500})
    }
};
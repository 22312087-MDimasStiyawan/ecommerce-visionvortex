import { format, formatDate } from "date-fns"

import db from "@/lib/db";
import { SizesClient } from "./components/client";
import { SizeColumn } from "./components/columns";

const ColorsPage = async ({
    params
}: {
    params: {storeId: string}
}) => {
    const colors= await db.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedColors: SizeColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: formatDate(item.createdAt,"MMMM do, yyyy" )
    }));

    return (  
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizesClient data={formattedColors}/>
            </div>
        </div>
    );
}
 
export default ColorsPage;
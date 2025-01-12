import db from "@/lib/db";

const BillboardPage = async({
    params
}: {
    params: {billboardId: string}
}) => {
    const billboard = await db.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })

    return ( 
        <div>
            Existing Billboard: {billboard?.label}
        </div>
     );
}
 
export default BillboardPage;
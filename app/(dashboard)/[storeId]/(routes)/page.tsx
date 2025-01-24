import db from "@/lib/db"

interface DashboardPageProps {
    params: { storeId: string }
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
    const store = await db.store.findFirst({
        where: {
            id: params.storeId
        }
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-lg rounded-lg max-w-md w-full text-center">
                {store ? (
                    <>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            Toko Aktif
                        </h1>
                        <p className="text-lg text-gray-600">
                            Selamat datang di toko:
                        </p>
                        <h2 className="text-3xl font-semibold text-blue-600 mt-2">
                            {store.name}
                        </h2>
                    </>
                ) : (
                    <p className="text-lg text-red-500">
                        Toko tidak ditemukan.
                    </p>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;

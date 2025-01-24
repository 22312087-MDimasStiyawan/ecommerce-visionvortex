import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

const Navbar = async () => {
    const {userId} = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await db.store.findMany({
        where: {
            userId,
        }
    })

    return (
        <div className="border-b bg-white shadow-sm">
            <div className="flex h-16 items-center px-4 lg:px-8">
                {/* Store Switcher */}
                <div className="flex items-center space-x-4">
                    <StoreSwitcher items={stores} />
                </div>

                {/* Main Navigation */}
                <MainNav className="mx-6 text-gray-600" />

                {/* User Menu */}
                <div className="ml-auto flex items-center space-x-6">
                    <UserButton />
                </div>
            </div>
        </div>
    );
};
 
export default Navbar;
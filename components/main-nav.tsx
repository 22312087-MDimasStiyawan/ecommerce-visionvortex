'use client'

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"

export function MainNav({
    className,
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}/`,
            label: 'Ringkasan',
            active: pathname === `/${params.storeId}/`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Banner',
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Kategori',
            active: pathname === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/sizes`,
            label: 'Ukuran',
            active: pathname === `/${params.storeId}/sizes`,
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Produk',
            active: pathname === `/${params.storeId}/products`,
        },
        {
            href: `/${params.storeId}/colors`,
            label: 'Warna',
            active: pathname === `/${params.storeId}/colors`,
        },
        {
            href: `/${params.storeId}/orders`,
            label: 'Pesanan',
            active: pathname === `/${params.storeId}/orders`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Pengaturan',
            active: pathname === `/${params.storeId}/settings`,
        },
    ];

    return (
        <nav className={cn(
            "flex items-center space-x-4 lg:space-x-6",
            className
        )}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "relative text-sm font-medium transition-colors hover:text-primary",
                        route.active 
                            ? "text-black dark:text-white font-bold"
                            : "text-muted-foreground"
                    )}
                >
                    {route.label}
                    {route.active && (
                        <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-blue-500 rounded-full"></span>
                    )}
                </Link>
            ))}
        </nav>
    )
}

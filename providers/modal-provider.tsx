"use client"
// Mengimpor komponen `StoreModal` yang bertugas untuk menampilkan modal untuk menambahkan toko.
import { StoreModal } from "@/components/modals/store-modal";
// Mengimpor hook `useEffect` dan `useState` dari React untuk mengelola efek samping dan state lokal.
import { useEffect, useState } from "react"

// `ModalProvider` yang bertugas mengelola render modal di sisi klien.
export const ModalProvider = () =>{
    // State `isMounted` untuk mengecek apakah komponen sudah ter-mount.
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() =>{
        // Mengubah `isMounted` menjadi `true` setelah komponen ter-mount di klien.
        setIsMounted(true)
    }, []);

    if(!isMounted){
        // Tidak merender komponen hingga ter-mount di klien.
        return null;
    }

    return(
        <>
        {/* Render `StoreModal` setelah komponen ter-mount. */}
            <StoreModal/>
        </>
    );
};
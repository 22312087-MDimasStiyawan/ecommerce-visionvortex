"use client"

// Mengimpor hook `useStoreModal` untuk mengakses store modal.
import { useStoreModal } from "@/hooks/use-store-modal";

import { useEffect } from "react";


// Fungsi `setUpPage` adalah komponen fungsional React yang digunakan untuk merender halaman.
const setUpPage = () => {

   // Mengambil fungsi `onOpen` dan status `isOpen` dari store `useStoreModal`.
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  // Menggunakan `useEffect` untuk membuka modal jika `isOpen` bernilai false.
  useEffect(() => {
    if(!isOpen){
      onOpen();
    }
  }, [isOpen,onOpen]);

  
  return (
    <div className="p-4">
       {/* Konten dari halaman, menampilkan teks "Root Page". */}
       Root Page
    </div>

  );
}

// Mengekspor `setUpPage` sebagai default, sehingga komponen ini dapat digunakan di file lain.
export default setUpPage

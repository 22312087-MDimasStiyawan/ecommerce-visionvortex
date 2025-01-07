"use client"

// Mengimpor hook `useStoreModal` yang digunakan untuk mengakses state global modal dari Zustand.
import { useStoreModal } from "@/hooks/use-store-modal"
// Mengimpor komponen `Modal` dari path lokal. Komponen ini bertugas untuk menampilkan dialog/modal.
import { Modal } from "../ui/modal";

// Mendefinisikan komponen fungsional React bernama `StoreModal`.
 export const StoreModal = () => {
    // Mengakses state dan fungsi dari store modal menggunakan hook `useStoreModal`.
    const storeModal = useStoreModal();

    return(
        <Modal
        title="create store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
        >
            future Create Sore Form
            {/* Konten modal yang akan muncul di dalamnya. Saat ini berupa placeholder teks, 
                tetapi akan digantikan dengan form atau elemen lain di masa mendatang. */}
        </Modal>
    )
}
// Mengimpor fungsi `create` dari pustaka Zustand untuk membuat store global pada aplikasi React.
import { create } from "zustand";

// Mendefinisikan tipe data untuk store yang mengelola status modal.
interface useStoreModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

// Membuat store dengan Zustand dan mendefinisikan status dan fungsi pengelolaan modal.
export  const useStoreModal = create<useStoreModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));
"use client"

// Mengimpor komponen yang dibutuhkan dari library U
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Interface untuk mendefinisikan properti yang akan diterima oleh komponen Modal
interface ModalProps{
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

// Deklarasi komponen Modal menggunakan React.FC dengan properti yang sesuai dengan interface ModalProps
export const Modal: React.FC<ModalProps> =({
    title,
    description,
    isOpen,
    onClose,
    children
}) => {
    // Fungsi untuk menangani perubahan status dialog (terbuka atau tertutup)
    const onChange =(open: boolean) => {
        if (!open){
            onClose();
        }
    };
       // Komponen yang dirender
    return(
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};
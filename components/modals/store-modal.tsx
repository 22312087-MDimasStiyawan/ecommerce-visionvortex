"use client"
// Mengimpor semua ekspor dari pustaka "zod" ke dalam namespace "z".
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
// Mengimpor hook `useStoreModal` yang digunakan untuk mengakses state global modal dari Zustand.
import { useStoreModal } from "@/hooks/use-store-modal"
// Mengimpor komponen `Modal` dari path lokal. Komponen ini bertugas untuk menampilkan dialog/modal.
import { Modal } from "@/components/ui/modal";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";


const formSchema = z.object({
    name: z.string().min(1),
});

// Mendefinisikan komponen fungsional React bernama `StoreModal`.
 export const StoreModal = () => {
    const [loading, setLoading] = useState(false)

    // Mengakses state dan fungsi dari store modal menggunakan hook `useStoreModal`.
    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = await axios.post('/api/stores', values)
            console.log(response.data);
            toast.success("Berhasil Membuat Toko");
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error("Gagal Membuat Toko")
        } finally{
            setLoading(false)
        }
        
    }

    return(
        <Modal
        title="create store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4"> 
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                            disabled={loading} 
                                            placeholder="E-Commerce" 
                                            {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button 
                                    disabled={loading}
                                    variant="outline" 
                                    onClick={storeModal.onClose}>Cancel
                                </Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}
"use client";

import * as z from "zod";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";



interface SettingsFormProps {
    initialData: Store;
}

const formSchema = z. object ({
    name: z.string().min(1)
});
type SettingsFormValues = z. infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })
    return (
       <><div className="flex items-center justify-between">
            <Heading
                title="Settings"
                description="Manage store preferences" />
            <Button
                variant="destructive"
                size="icon"
                onClick={() => { } }
            >
                <Trash className="h-4 w-4" />
            </Button>
        </div>
        <Separator />
        </>
    );
};
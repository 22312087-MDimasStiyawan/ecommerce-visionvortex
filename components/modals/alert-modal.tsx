"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onconfirm: () => void;
    loading:boolean;
}

export const AlertModal: React.FC<AlertModalProps> =({
    isOpen,
    onClose,
    onconfirm,
    loading
}) => {
    const  [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }
    return (
        <Modal
        title="Are you sure?"
        description="This action cannot be undone."
        isOpen={isOpen}
        onClose={onClose}
        >

        </Modal>
    )
}
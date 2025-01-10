"use client";

import { Store } from "@prisma/client";

interface SettingsPageProps {
    initialData: Store;
}

export const SettingsFrom: React.FC <SettingsPageProps> = ({
    initialData
}) => {
    return (
        <div>
        Settings From
        </div>
    );
};
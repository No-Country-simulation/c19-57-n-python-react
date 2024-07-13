import { Spinner } from "@material-tailwind/react";

export function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner className="h-16 w-16 animate-spin text-blue-900/50" />
        </div>
    );
}

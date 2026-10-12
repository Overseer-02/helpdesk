import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);

    const message = flash?.success || flash?.error;
    const isError = Boolean(flash?.error);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message || !visible) return null;

    return (
        <div
            className={`mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-md border px-4 py-3 text-sm sm:px-6 lg:px-8 ${
                isError
                    ? "border-red-300 bg-red-50 text-red-800"
                    : "border-green-300 bg-green-50 text-green-800"
            }`}
        >
            <span>{message}</span>
            <button
                type="button"
                onClick={() => setVisible(false)}
                className="ml-4 font-bold"
            >
                ×
            </button>
        </div>
    );
}

import * as React from "react";

export function Alert({ children }) {
    return (
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
            {children}
        </div>
    );
}

export function AlertDescription({ children }) {
    return <p className="text-sm">{children}</p>;
}

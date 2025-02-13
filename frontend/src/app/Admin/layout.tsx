import Sidebar from "@/layouts/Sidebar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="font-Quicksand flex  gap-3">
            <Sidebar />
            <div className="flex-grow h-full border-5 border-green-600">
                {children}
            </div>
        </div>
    );
}
import Sidebar from "@/app/components/sidebar";
import "./system-layout.css";

export default function SystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="system-layout">
      <Sidebar />

      <main className="system-content">
        {children}
      </main>
    </div>
  );
}
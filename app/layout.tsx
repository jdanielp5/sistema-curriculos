// app/layout.tsx
import { Sidebar } from "@/components/ui/Sidebar";
import { Toaster } from "sonner";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontePrincipal = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata = {
  title: "Gestão de Currículos",
  description: "Trabalho 2 - Desenvolvimento de Sistema de Gestão de Currículos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={fontePrincipal.className}>
      <body className="flex min-h-screen bg-gray-50">
        
        <Sidebar />
        
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
          
          <footer className="p-6 border-t text-center text-gray-400 text-sm bg-white mt-auto">
            © 2026 Sistema de Gestão de Currículos - Trabalho Acadêmico
          </footer>
        </main>
        
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
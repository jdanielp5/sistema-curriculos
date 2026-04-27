import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <Header /> 
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster /> {/* */}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WatiLive - The Binding of Isaac Infinity",
  description: "El primer hispanohablante en completar el Infinity en The Binding of Isaac. Jugador apasionado y revienta platinos.",
  keywords: ["gaming", "twitch", "youtube", "streamer", "the binding of isaac", "wati", "watilive", "infinity", "español"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

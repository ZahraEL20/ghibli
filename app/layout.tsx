import type React from "react"
import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/organisms/nav-bar"
import { Footer } from "@/components/organisms/footer"
import { AudioProvider } from "@/components/organisms/audio-provider"
import { KonamiProvider } from "@/components/organisms/konami-provider"

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
})

export const metadata: Metadata = {
  title: "Studio Ghibli Dreamscape",
  description: "Explore the magical world of Studio Ghibli films",
  icons: {
    icon: "/favicon.png",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-sans`}>
        <KonamiProvider>
          <AudioProvider>
            <div className="flex min-h-screen flex-col">
              <NavBar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AudioProvider>
        </KonamiProvider>
      </body>
    </html>
  )
}

import { Providers } from "./components/Providers"
import "./globals.css"
import type { Metadata } from "next"
import type React from "react" // Added import for React

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Explore Pokémon types and their details",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}


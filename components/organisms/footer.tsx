import Link from "next/link"
import { Github, Linkedin, MessageSquare, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t py-8 px-4">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200/40 to-purple-200/40 backdrop-blur-[3px] z-0" />

      <div className="max-w-6xl mx-auto relative z-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Studio Ghibli Dreamscape
          </h3>
          <p className="text-sm text-black/70">
            Explore the magical world of Studio Ghibli films through our immersive experience.
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-4 text-black">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-black/70 hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/films" className="text-black/70 hover:text-primary transition-colors">
                Films
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-black/70 hover:text-primary transition-colors">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4 text-black">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://ghibliapi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 hover:text-primary transition-colors"
              >
                API Documentation
              </a>
            </li>
            <li>
              <a
                href="https://github.com/deywersonp/ghibliapi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 hover:text-primary transition-colors"
              >
                Studio Ghibli API
              </a>
            </li>
            <li>
              <a
                href="https://www.ghibli.jp/works/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 hover:text-primary transition-colors"
              >
                Official Studio Ghibli
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom legal bar */}
      <div className="container mx-auto mt-8 text-sm relative z-10">
        {/* Top full-width bar with disclaimer */}
        <div className="bg-black/5 text-black/70 py-3 px-4 text-center">
          This is a fan-made website for educational purposes. Studio Ghibli and all related films are trademarks of Studio Ghibli Co., Ltd.
        </div>

        {/* Bottom bar with social icons + copyright */}
        <div className="mt-4 pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/andre-moura-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 hover:text-primary transition-colors rounded-full"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">Linkedin</span>
            </a>
            <a
              href="https://github.com/andre-moura"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 hover:text-primary transition-colors rounded-full"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
                        <a
              href="https://t.me/PragmaticThoughts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 hover:text-primary transition-colors rounded-full"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Telegram</span>
            </a>
          </div>
          <p className="text-black/70">
            © 2025 Andre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

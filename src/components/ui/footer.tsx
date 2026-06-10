"use client";

import {
  Globe,
  MessageCircle,
  Link as LinkIcon,
  Send,
  Feather,
  Share2,
} from 'lucide-react'

const links = [
  { title: 'Features', href: '#' },
  { title: 'Solution', href: '#' },
  { title: 'Customers', href: '#' },
  { title: 'Pricing', href: '#' },
  { title: 'Help', href: '#' },
  { title: 'About', href: '#' },
]

export default function FooterSection() {
  return (
    <footer className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <a href="/" aria-label="go home" className="mx-auto block size-fit" />

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <span>{link.title}</span>
            </a>
          ))}
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          <a href="#" aria-label="Social Link 1" className="text-muted-foreground hover:text-primary block">
            <Share2 className="size-6" />
          </a>
          <a href="#" aria-label="Social Link 2" className="text-muted-foreground hover:text-primary block">
            <MessageCircle className="size-6" />
          </a>
          <a href="#" aria-label="Social Link 3" className="text-muted-foreground hover:text-primary block">
            <LinkIcon className="size-6" />
          </a>
          <a href="#" aria-label="Social Link 4" className="text-muted-foreground hover:text-primary block">
            <Globe className="size-6" />
          </a>
          <a href="#" aria-label="Social Link 5" className="text-muted-foreground hover:text-primary block">
            <Send className="size-6" />
          </a>
          <a href="#" aria-label="Social Link 6" className="text-muted-foreground hover:text-primary block">
            <Feather className="size-6" />
          </a>
        </div>
        <span className="text-muted-foreground block text-center text-sm">
          © {new Date().getFullYear()} Tailark, All rights reserved
        </span>
      </div>
    </footer>
  )
}

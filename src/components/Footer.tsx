"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import footerData from "../content/footer.json";

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

function QuickLinks() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]);
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
      {footerData.quickLinks.map((item) => {
        const active = isActive(item.href);
        return (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`text-xs sm:text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 group ${
                active
                  ? "text-red-500"
                  : "text-zinc-500 hover:text-red-500"
              }`}
            >
              <span
                className={`h-px w-0 transition-all duration-200 ${
                  active
                    ? "w-3 bg-red-500"
                    : "group-hover:w-3 bg-zinc-700 group-hover:bg-red-500"
                }`}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">
            {/* Brand Information */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-5">
              <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
                <Image
                  src={footerData.brand.logo}
                  alt={footerData.brand.logoAlt}
                  width={140}
                  height={90}
                  priority={false}
                  className="max-h-[50px] sm:max-h-[60px] w-auto"
                />
              </Link>
              <p className="text-red-500 text-xs sm:text-sm font-black uppercase tracking-[0.2em]">
                {footerData.brand.tagline}
              </p>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                {footerData.brand.description}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-5">
              <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
                {footerData.quickLinksTitle}
              </h3>
              <QuickLinks />
            </div>

            {/* Contact Information */}
            <div className="space-y-5">
              <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
                {footerData.contactTitle}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <p className="text-zinc-600 text-[10px] sm:text-xs uppercase tracking-widest mb-1">
                    {footerData.contact.email.label}
                  </p>
                  <Link
                    href={footerData.contact.email.href}
                    className="text-zinc-400 hover:text-red-500 text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    {footerData.contact.email.value}
                  </Link>
                </li>
                <li>
                  <p className="text-zinc-600 text-[10px] sm:text-xs uppercase tracking-widest mb-1">
                    {footerData.contact.phone.label}
                  </p>
                  <Link
                    href={footerData.contact.phone.href}
                    className="text-zinc-400 hover:text-red-500 text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    {footerData.contact.phone.value}
                  </Link>
                </li>
                <li>
                  <p className="text-zinc-600 text-[10px] sm:text-xs uppercase tracking-widest mb-1">
                    {footerData.contact.location.label}
                  </p>
                  <p className="text-zinc-400 text-xs sm:text-sm font-medium">
                    {footerData.contact.location.value}
                  </p>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-5">
              <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
                {footerData.socialTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {footerData.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-600/50 hover:bg-zinc-800 transition-all duration-300"
                  >
                    {socialIcons[social.icon] || social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-zinc-700 text-[10px] sm:text-xs font-medium tracking-wide text-center sm:text-left">
              {footerData.bottomBar.copyright}
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/privacy"
                className="text-zinc-700 hover:text-red-500 text-[10px] sm:text-xs font-medium transition-colors duration-200"
              >
                {footerData.bottomBar.links.privacy}
              </Link>
              <Link
                href="/terms"
                className="text-zinc-700 hover:text-red-500 text-[10px] sm:text-xs font-medium transition-colors duration-200"
              >
                {footerData.bottomBar.links.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/updates", label: "Updates" },
  { href: "/gallery", label: "Gallery" },
  { href: "/upcoming-races", label: "Upcoming Races" },
  { href: "/results", label: "Results" },
];

const socialLinks = [
  {
    href: "https://youtube.com",
    label: "YouTube",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: "https://flickr.com",
    label: "Flickr",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.319 5.065c.087-.002.172.002.258.003.527.012 1.039.121 1.524.328.485.207.916.509 1.262.883.347.373.609.813.773 1.298.164.486.244 1.007.235 1.538-.009.531-.11 1.049-.301 1.537-.19.488-.483.922-.855 1.277-.373.354-.824.603-1.318.727-.494.124-1.019.166-1.543.122-.524-.044-1.031-.177-1.505-.395-.473-.218-.886-.53-1.213-.917-.328-.387-.563-.853-.685-1.367-.122-.513-.147-1.058-.073-1.595.074-.537.251-1.048.519-1.508.268-.461.632-.853 1.067-1.147.435-.293.938-.48 1.462-.544zm12.564 6.828c.087.002.172-.002.258-.003.527-.012 1.039-.121 1.524-.328.485-.207.916-.509 1.262-.883.347-.373.609-.813.773-1.298.164-.486.244-1.007.235-1.538-.009-.531-.11-1.049-.301-1.537-.19-.488-.483-.922-.855-1.277-.373-.354-.824-.603-1.318-.727-.494-.124-1.019-.166-1.543-.122-.524.044-1.031.177-1.505.395-.473.218-.886.53-1.213.917-.328.387-.563.853-.685 1.367-.122.513-.147 1.058-.073 1.595.074.537.251 1.048.519 1.508.268.461.632.853 1.067 1.147.435.293.938.48 1.462.544zM5.319 5.065c.087-.002.172.002.258.003.527.012 1.039.121 1.524.328.485.207.916.509 1.262.883.347.373.609.813.773 1.298.164.486.244 1.007.235 1.538-.009.531-.11 1.049-.301 1.537-.19.488-.483.922-.855 1.277-.373.354-.824.603-1.318.727-.494.124-1.019.166-1.543.122-.524-.044-1.031-.177-1.505-.395-.473-.218-.886-.53-1.213-.917-.328-.387-.563-.853-.685-1.367-.122-.513-.147-1.058-.073-1.595.074-.537.251-1.048.519-1.508.268-.461.632-.853 1.067-1.147.435-.293.938-.48 1.462-.544z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12">
            {/* Logo and description */}
            <div className="md:col-span-4 space-y-4 sm:space-y-6">
              <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
                <Image
                  src="/Gusto Racing india logo white (1).png"
                  alt="CUSTO Racing Logo"
                  width={100}
                  height={45}
                  priority={false}
                  className="h-auto w-auto max-h-[40px] sm:max-h-[50px]"
                />
              </Link>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                Asia&apos;s biggest road racing championship. Home of the Asian Champions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-4">
              <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-zinc-500 hover:text-red-500 text-xs sm:text-sm font-medium transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="md:col-span-4">
              <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-600/50 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-900 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-zinc-700 text-[10px] sm:text-xs font-medium tracking-wide text-center sm:text-left">
              &copy; Copyright 2025 Two Wheels Motor Racing Sdn Bhd (TWMR). All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/privacy" className="text-zinc-700 hover:text-red-500 text-[10px] sm:text-xs font-medium transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-zinc-700 hover:text-red-500 text-[10px] sm:text-xs font-medium transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

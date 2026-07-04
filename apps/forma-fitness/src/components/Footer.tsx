import Link from "next/link";
import { Zap } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "How It Works", "Success Stories", "Blog"],
  Company: ["About", "Contact", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="bg-[#0d1b2a] text-gray-400 py-16 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#0ea5a0] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">Forma</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Your AI fitness coach, health partner, and accountability system — built for real life after 35.
            </p>
            <div className="flex gap-3 mt-6">
              {["App Store", "Google Play"].map((s) => (
                <button
                  key={s}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors cursor-pointer border border-white/10"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-white font-semibold text-sm mb-4">{section}</p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm hover:text-teal-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © 2025 Forma Health, Inc. All rights reserved.
          </p>
          <p className="text-xs">
            Made with ❤️ for busy parents and professionals everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

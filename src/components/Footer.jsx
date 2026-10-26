import config from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-oil-dark py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-gold">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="w-6 h-6 drop-shadow-[0_0_10px_rgba(245,168,0,0.4)]"
            >
              <path d="M14 2C7.5 2 2 7.5 2 14s5.5 12 12 12 12-5.5 12-12S20.5 2 14 2ZM14 24c-6.6 0-12-5.4-12-12S7.4 0 14 0s12 5.4 12 12-5.4 12-12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-serif italic uppercase tracking-widest text-lg">bistrô 1994</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-cream/70">
            <a
              href={config.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              Instagram
            </a>
            <a
              href={config.whatsappLink}
              className="hover:text-gold transition-colors"
            >
              WhatsApp
            </a>
            <span>Horário: ter a dom, 18h às 22h</span>
          </div>

          <div className="text-xs text-cream/50 uppercase tracking-widest">
            Feito com 🔥 em Matureia - PB
          </div>
        </div>
      </div>
    </footer>
  );
}

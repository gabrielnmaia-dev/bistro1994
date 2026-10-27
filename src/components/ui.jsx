/**
 * Ícones e pequenos utilitários de UI compartilhados.
 * Todos os ícones são decorativos (aria-hidden): o texto do link/botão
 * é quem dá o nome acessível.
 */

function Svg({ className = "h-4 w-4", children, ...props }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </Svg>
  );
}

export function MapPinIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Svg>
  );
}

export function ChatIcon(props) {
  return (
    <Svg {...props}>
      <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12Z" />
    </Svg>
  );
}

export function BagIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 7h12l1 14H5L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </Svg>
  );
}

export function PhoneIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </Svg>
  );
}

export function LogoMark({ className = "h-8 w-8" }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M18 2C9.4 2 2 9.4 2 18s7.4 16 16 16 16-7.4 16-16S26.6 2 18 2ZM18 32c-7.73 0-14-6.27-14-14S10.27 4 18 4s14 6.27 14 14-6.27 14-14 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18h12c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Aviso para leitores de tela em links que abrem nova aba (WCAG 3.2.5) */
export function NewTab() {
  return <span className="sr-only"> (abre em nova aba)</span>;
}

/** Emoji decorativo: não é lido pelo leitor de tela */
export function Emoji({ children }) {
  return <span aria-hidden="true">{children}</span>;
}

/** Selo de status Aberto/Fechado, usado em várias seções */
export function OpenStatus({ hours, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] ${
        hours.isOpen
          ? "border-gold/40 bg-gold/10 text-gold"
          : "border-fire/40 bg-fire/10 text-fire"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          hours.isOpen
            ? "bg-gold shadow-[0_0_10px_rgba(245,168,0,0.7)] motion-safe:animate-pulse"
            : "bg-fire"
        }`}
      />
      {hours.statusLabel}
      {hours.detailLabel && (
        <span className="font-semibold normal-case tracking-normal text-cream/80">
          · {hours.detailLabel}
        </span>
      )}
    </span>
  );
}

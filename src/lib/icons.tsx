export function FacebookIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21.9v-7.1h2.5l.4-3h-2.9V9.9c0-.9.3-1.5 1.6-1.5h1.4V5.7c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5v7.1a12 12 0 0 0 2.9 0Z" />
    </svg>
  );
}

export function MessengerIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.04C6.36 2.04 1.79 6.15 1.79 11.24c0 2.89 1.4 5.46 3.6 7.14v3.58l3.3-1.8c1.04.28 2.14.44 3.31.44 5.64 0 10.21-4.11 10.21-9.2S17.64 2.04 12 2.04Zm1.03 12.38-2.61-2.79-5.1 2.79 5.61-5.96 2.67 2.79 5.03-2.79-5.6 5.96Z" />
    </svg>
  );
}

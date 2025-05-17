import React from 'react';

export function TennisBallIcon({ className = "", size = 16, filled = false }: { className?: string, size?: number, filled?: boolean }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill={filled ? "none" : undefined} />
      <path d="M2 12h20" fill={filled ? "none" : undefined} />
    </svg>
  );
}

export function TennisRacquetIcon({ className = "", size = 16 }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <ellipse cx="12" cy="8" rx="6" ry="8" />
      <path d="M15 8L18 18" />
      <path d="M9 8L6 18" />
      <path d="M6 8h12" />
      <path d="M6 11h12" />
      <path d="M6 14h12" />
      <path d="M12 8v8" />
      <path d="M12 16l6 4" />
    </svg>
  );
}

export function CourtIcon({ className = "", size = 16 }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="12" y1="8" x2="22" y2="8" />
      <line x1="12" y1="16" x2="22" y2="16" />
      <line x1="2" y1="8" x2="12" y2="8" />
      <line x1="2" y1="16" x2="12" y2="16" />
    </svg>
  );
}

export function TimerIcon({ className = "", size = 16 }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
} 
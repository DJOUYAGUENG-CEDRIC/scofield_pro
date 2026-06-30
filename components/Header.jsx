'use client';

import { PROFILE_IMAGE, ASSISTANT_NAME } from '@/lib/config';

export default function Header() {
  return (
    <header
      className="flex-shrink-0 flex items-center gap-3 px-4 py-3 z-10 border-b border-violet-900/40"
      style={{
        background: 'linear-gradient(135deg, #1e0a3c 0%, #12062a 50%, #1a0836 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 24px rgba(109, 40, 217, 0.15)',
      }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: '0 0 16px 4px rgba(139, 92, 246, 0.5)', borderRadius: '50%' }}
        />
        <img
          src={PROFILE_IMAGE}
          alt={ASSISTANT_NAME}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-violet-500 relative"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='24' fill='%237c3aed'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' fill='white' font-size='18' font-family='sans-serif' font-weight='bold'%3ESP%3C/text%3E%3C/svg%3E";
          }}
        />
        <span
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2"
          style={{
            background: '#a78bfa',
            ringColor: '#0f0a1e',
            boxShadow: '0 0 6px #a78bfa',
          }}
        />
      </div>

      {/* Nom + statut */}
      <div className="flex-1 min-w-0">
        <p
          className="font-bold text-sm truncate leading-tight"
          style={{
            background: 'linear-gradient(90deg, #e9d5ff, #c4b5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {ASSISTANT_NAME}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#a78bfa', boxShadow: '0 0 4px #a78bfa' }}
          />
          <span className="text-xs text-violet-300 font-medium">En ligne</span>
        </div>
      </div>

      {/* Badge décoratif */}
      <div
        className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider text-violet-200"
        style={{
          background: 'linear-gradient(135deg, rgba(109,40,217,0.4), rgba(139,92,246,0.2))',
          border: '1px solid rgba(139,92,246,0.3)',
        }}
      >
        PRO
      </div>
    </header>
  );
}

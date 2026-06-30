'use client';

import { useState } from 'react';

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Écrivez votre message..."
        disabled={disabled}
        className="flex-1 text-white placeholder-slate-500 rounded-full px-4 py-2.5 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
        style={{
          background: 'rgba(30, 20, 60, 0.7)',
          border: '1px solid rgba(109, 40, 217, 0.3)',
          boxShadow: value ? '0 0 0 2px rgba(139, 92, 246, 0.3)' : 'none',
        }}
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!value.trim() || disabled}
        className="flex-shrink-0 w-10 h-10 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: !value.trim() || disabled
            ? 'rgba(109, 40, 217, 0.3)'
            : 'linear-gradient(135deg, #7c3aed, #5b21b6)',
          boxShadow: !value.trim() || disabled
            ? 'none'
            : '0 4px 15px rgba(124, 58, 237, 0.5)',
        }}
        aria-label="Envoyer"
      >
        <SendIcon />
      </button>
    </form>
  );
}

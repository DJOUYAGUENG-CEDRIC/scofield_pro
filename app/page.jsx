'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import ChatBubble from '@/components/ChatBubble';
import AudioMessage from '@/components/AudioMessage';
import PlatformsCard from '@/components/PlatformsCard';
import ChatInput from '@/components/ChatInput';
import { WELCOME_MESSAGE, AUDIO_URL } from '@/lib/config';
import { sendMessage } from '@/services/chatApi';

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const currentHistory = history;
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text }]);
    setIsLoading(true);

    try {
      const reply = await sendMessage(text, currentHistory.slice(-20));
      setMessages((prev) => [...prev, { id: Date.now(), sender: 'assistant', text: reply }]);
      setHistory((prev) => [
        ...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'assistant', text: "Désolé, je n'ai pas pu répondre. Réessaie dans un instant." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-screen max-w-md mx-auto text-white overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0f0a1e 0%, #0d0d1a 50%, #0a0a16 100%)' }}
    >
      <Header />

      <main className="flex-1 overflow-y-auto min-h-0 px-3 py-4 space-y-3">
        <ChatBubble sender="assistant" text={WELCOME_MESSAGE} />
        <AudioMessage src={AUDIO_URL} />

        {messages.map((msg) => (
          <ChatBubble key={msg.id} sender={msg.sender} text={msg.text} />
        ))}

        {isLoading && (
          <ChatBubble sender="assistant">
            <span className="flex gap-1 items-center py-0.5">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:300ms]" />
            </span>
          </ChatBubble>
        )}

        <div ref={bottomRef} />
      </main>

      <div
        className="flex-shrink-0 border-t border-violet-900/40"
        style={{ background: 'rgba(15, 10, 30, 0.95)', backdropFilter: 'blur(12px)' }}
      >
        <PlatformsCard />
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}

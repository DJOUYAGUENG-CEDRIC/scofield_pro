'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const mdComponents = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

export default function ChatBubble({ sender, text, children }) {
  const isUser = sender === 'user';

  let content;
  if (isUser) {
    content = <p>{text ?? children}</p>;
  } else if (text) {
    content = (
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {text}
        </ReactMarkdown>
      </div>
    );
  } else {
    content = children;
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div
          className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm text-white leading-relaxed"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)',
          }}
        >
          {content}
        </div>
      ) : (
        <div
          className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm text-slate-100"
          style={{
            background: 'rgba(30, 20, 60, 0.8)',
            border: '1px solid rgba(109, 40, 217, 0.2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

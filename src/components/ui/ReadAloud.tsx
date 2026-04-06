import { useState } from 'react';
import { motion } from 'framer-motion';

interface ReadAloudProps {
  text: string;
}

export default function ReadAloud({ text }: ReadAloudProps) {
  const [speaking, setSpeaking] = useState(false);

  const handleClick = () => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm shrink-0"
      style={{
        background: speaking ? 'rgba(45, 212, 191, 0.12)' : 'rgba(18, 24, 51, 0.8)',
        border: `1px solid ${speaking ? 'rgba(45, 212, 191, 0.3)' : 'rgba(37, 48, 82, 0.5)'}`,
        color: speaking ? '#2dd4bf' : '#94a3b8',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={speaking ? 'Stop reading aloud' : 'Read aloud'}
      title={speaking ? 'Stop reading' : 'Read this question aloud'}
    >
      {/* Speaker icon */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 6h2.5L8 3v10L4.5 10H2a1 1 0 01-1-1V7a1 1 0 011-1z"
          fill="currentColor"
        />
        {speaking && (
          <>
            <path d="M10 5.5a3.5 3.5 0 010 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 3.5a6 6 0 010 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
      </svg>
      {speaking ? 'Stop' : 'Read Aloud'}
    </motion.button>
  );
}

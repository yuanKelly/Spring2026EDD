import { useState } from 'react';

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
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-2 bg-navy-700 hover:bg-navy-600 text-gray-300 rounded-lg transition text-sm border border-navy-600"
      aria-label={speaking ? 'Stop reading aloud' : 'Read aloud'}
      title={speaking ? 'Stop reading' : 'Read this question aloud'}
    >
      {speaking ? '⏹️ Stop' : '🔊 Read Aloud'}
    </button>
  );
}

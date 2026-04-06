import { createContext, useContext, useState, type ReactNode } from 'react';

interface SoundContextType {
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType>({ muted: false, toggleMute: () => {} });

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(() => localStorage.getItem('muted') === 'true');

  const toggleMute = () => {
    setMuted((prev) => {
      localStorage.setItem('muted', String(!prev));
      return !prev;
    });
  };

  return (
    <SoundContext.Provider value={{ muted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}

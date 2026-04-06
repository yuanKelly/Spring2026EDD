import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentBriefingProps {
  agentName: string;
  onComplete: () => void;
}

const slides = [
  {
    title: 'Welcome, Agent!',
    text: 'You have been selected for a top-secret math mission! Your job is to travel the world, solve word problems, and collect pieces of a secret code.',
    icon: '🌍',
  },
  {
    title: 'Your World Map',
    text: 'The World Map is your headquarters. Each pin on the map is a city with a mission. Click a city to start! You can do the first 5 missions in any order.',
    icon: '📍',
  },
  {
    title: 'Meet Your Contacts',
    text: 'In each city, a local contact will teach you a problem-solving tip. Pay attention — these tips will help you solve harder problems later!',
    icon: '🤝',
  },
  {
    title: 'Earn Points',
    text: 'Solve problems correctly on your first try to earn points. Get 5 points to complete a mission and earn a code piece! If you get one wrong, you get a hint and can try again.',
    icon: '⭐',
  },
  {
    title: 'Complete the Mission',
    text: 'Collect all 5 code pieces from around the world to unlock the Final Challenge at Secret HQ. Are you ready, Agent?',
    icon: '🔓',
  },
];

export default function AgentBriefing({ agentName, onComplete }: AgentBriefingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        padding: '1in',
        background: 'rgba(6, 8, 24, 0.9)',
        backdropFilter: 'blur(8px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="max-w-md w-full dossier rounded-2xl shadow-2xl relative overflow-hidden"
        style={{
          padding: '2.5rem 3rem',
          boxShadow: '0 8px 48px rgba(0,0,0,0.5), 0 0 1px rgba(251,191,36,0.3)',
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-amber-400/20 rounded-tl" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-amber-400/20 rounded-tr" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              className="text-4xl mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
            >
              {slide.icon}
            </motion.div>

            <h2
              className="text-2xl font-bold mb-5"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {currentSlide === 0 ? `Welcome, Agent ${agentName}!` : slide.title}
            </h2>
            <p className="text-gray-300 text-lg" style={{ lineHeight: '1.8', marginBottom: '2rem' }}>{slide.text}</p>
          </motion.div>
        </AnimatePresence>

        {/* Dots — elongated active */}
        <div className="flex justify-center" style={{ gap: '0.5rem', marginBottom: '1.5rem' }}>
          {slides.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full transition"
              style={{
                width: i === currentSlide ? '20px' : '8px',
                height: '8px',
                backgroundColor: i === currentSlide ? '#fbbf24' : '#1a2242',
                boxShadow: i === currentSlide ? '0 0 8px rgba(251, 191, 36, 0.4)' : 'none',
              }}
              layout
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          className="w-full text-midnight-950 font-bold rounded-xl transition text-lg"
          style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.25)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {currentSlide < slides.length - 1 ? 'Next' : "Let's Go!"}
        </motion.button>

        {currentSlide > 0 && (
          <button
            onClick={() => setCurrentSlide((s) => s - 1)}
            className="w-full text-gray-500 hover:text-gray-300 transition text-sm"
            style={{ padding: '0.6rem', marginTop: '0.5rem' }}
          >
            Back
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

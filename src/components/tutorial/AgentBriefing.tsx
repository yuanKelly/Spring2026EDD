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
    icon: '🕵️',
  },
  {
    title: 'Your World Map',
    text: 'The World Map is your headquarters. Each pin on the map is a city with a mission. Click a city to start! You can do the first 5 missions in any order.',
    icon: '🗺️',
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
    icon: '🏆',
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
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="max-w-md w-full bg-navy-800 rounded-2xl p-8 border border-gold-400/30 shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-2xl font-bold text-gold-400 mb-3">
              {currentSlide === 0 ? `Welcome, Agent ${agentName}!` : slide.title}
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">{slide.text}</p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i === currentSlide ? 'bg-gold-400' : 'bg-navy-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition text-lg"
        >
          {currentSlide < slides.length - 1 ? 'Next' : "Let's Go!"}
        </button>

        {currentSlide > 0 && (
          <button
            onClick={() => setCurrentSlide((s) => s - 1)}
            className="w-full py-2 mt-2 text-gray-400 hover:text-gray-300 transition text-sm"
          >
            Back
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

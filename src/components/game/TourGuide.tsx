import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ProblemSolvingTip } from '../../types';
import PlaceholderImage from '../ui/PlaceholderImage';

interface TourGuideProps {
  contactName: string;
  tip: ProblemSolvingTip;
  onContinue: () => void;
}

function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
}

export default function TourGuide({ contactName, tip, onContinue }: TourGuideProps) {
  const [showTip, setShowTip] = useState(false);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-navy-900 px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl w-full bg-navy-800 rounded-2xl p-8 border border-navy-600 shadow-2xl">
        <div className="flex items-start gap-6 mb-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.3 }}
          >
            <PlaceholderImage
              width={120}
              height={120}
              label={contactName}
              bgColor="#334155"
            />
          </motion.div>

          <div className="flex-1">
            <h2 className="text-gold-400 text-xl font-bold mb-1">{contactName}</h2>
            <div className="bg-navy-700 rounded-xl p-4 relative">
              <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-navy-700" />
              <p className="text-gray-200 text-lg">
                <TypewriterText
                  text={`Welcome, Agent! Before we begin, let me teach you a powerful technique: the ${tip.title}. This will help you crack any word problem!`}
                />
              </p>
            </div>
          </div>
        </div>

        {!showTip ? (
          <motion.button
            onClick={() => setShowTip(true)}
            className="w-full py-3 bg-agent-blue hover:bg-blue-700 text-white font-bold rounded-xl transition text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            Learn the {tip.title}
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-navy-700/50 rounded-xl p-6 mb-6 border border-gold-400/20">
              <h3 className="text-gold-400 font-bold text-xl mb-2">{tip.title}</h3>
              <p className="text-gray-300 mb-4">{tip.description}</p>
              <ol className="space-y-2">
                {tip.steps.map((step, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-gray-200"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.3 }}
                  >
                    <span className="bg-gold-500 text-navy-900 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ol>
            </div>

            <button
              onClick={onContinue}
              className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition text-lg"
            >
              Got it! Let's start!
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

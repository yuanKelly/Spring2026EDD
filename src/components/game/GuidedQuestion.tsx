import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GeneratedQuestion } from '../../types';
import PlaceholderImage from '../ui/PlaceholderImage';
import ReadAloud from '../ui/ReadAloud';

interface GuidedQuestionProps {
  question: GeneratedQuestion;
  contactName: string;
  onComplete: () => void;
}

export default function GuidedQuestion({ question, contactName, onComplete }: GuidedQuestionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; correct: boolean } | null>(null);
  const steps = question.steps || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const step = steps[currentStep];
    const userAnswer = parseFloat(input);
    const expected = typeof step.expectedAnswer === 'string' ? parseFloat(step.expectedAnswer) : step.expectedAnswer;
    const correct = userAnswer === expected;

    setFeedback({
      text: correct ? step.feedbackCorrect : step.feedbackIncorrect,
      correct,
    });

    setTimeout(() => {
      setFeedback(null);
      setInput('');
      if (currentStep < steps.length - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        onComplete();
      }
    }, 2000);
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="dossier rounded-2xl" style={{ padding: '2.5rem 3rem', marginBottom: '1.5rem' }}>
        {/* Header badges */}
        <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span
            className="rounded-full text-sm font-medium"
            style={{
              padding: '0.35rem 1rem',
              background: 'rgba(59, 130, 246, 0.12)',
              color: '#60a5fa',
              border: '1px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            Guided Practice
          </span>
          <span className="text-midnight-500 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>
            Step {currentStep + 1}/{steps.length}
          </span>
        </div>

        {/* Problem text */}
        <div className="flex justify-between items-start" style={{ marginBottom: '2rem' }}>
          <p className="text-gray-100 text-xl flex-1" style={{ lineHeight: '1.8', marginRight: '1rem' }}>{question.problemText}</p>
          <ReadAloud text={question.problemText} />
        </div>

        {/* Contact instruction */}
        <div className="flex items-start" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
          <PlaceholderImage width={60} height={60} label={contactName} bgColor="#0b0f24" />
          <div
            className="flex-1 rounded-xl"
            style={{
              padding: '1rem 1.25rem',
              background: 'rgba(6, 8, 24, 0.6)',
              border: '1px solid rgba(37, 48, 82, 0.5)',
            }}
          >
            <p className="text-gray-200" style={{ lineHeight: '1.7' }}>{steps[currentStep]?.instruction}</p>
          </div>
        </div>

        {/* Answer input */}
        <form onSubmit={handleSubmit} className="flex" style={{ gap: '0.75rem' }}>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-midnight-950 border border-midnight-500 rounded-xl text-white text-xl focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition"
            style={{ padding: '0.85rem 1.25rem' }}
            placeholder="Your answer..."
            disabled={feedback !== null}
            autoFocus
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || feedback !== null}
            className="text-midnight-950 font-bold rounded-xl transition disabled:opacity-50"
            style={{
              padding: '0.85rem 2rem',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Check
          </motion.button>
        </form>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              className="rounded-xl"
              style={{
                marginTop: '1.25rem',
                padding: '1rem 1.25rem',
                lineHeight: '1.6',
                background: feedback.correct ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${feedback.correct ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                color: feedback.correct ? '#86efac' : '#fca5a5',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {feedback.correct ? 'Correct! ' : 'Not quite. '}
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step progress dots — elongated active dot */}
      <div className="flex justify-center" style={{ gap: '0.5rem' }}>
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full transition"
            style={{
              width: i === currentStep ? '24px' : '10px',
              height: '10px',
              backgroundColor: i < currentStep ? '#22c55e' : i === currentStep ? '#fbbf24' : '#1a2242',
              boxShadow: i === currentStep ? '0 0 8px rgba(251, 191, 36, 0.4)' : 'none',
            }}
            layout
          />
        ))}
      </div>
    </motion.div>
  );
}

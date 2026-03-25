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
      <div className="bg-navy-800 rounded-2xl p-6 border border-navy-600 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-agent-blue/20 text-agent-blue px-3 py-1 rounded-full text-sm font-medium">
            Guided Practice
          </span>
          <span className="text-gray-500 text-sm">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        <div className="flex justify-between items-start mb-6">
          <p className="text-gray-100 text-xl leading-relaxed flex-1">{question.problemText}</p>
          <ReadAloud text={question.problemText} />
        </div>

        <div className="flex items-start gap-4 mb-4">
          <PlaceholderImage width={60} height={60} label={contactName} bgColor="#334155" />
          <div className="flex-1 bg-navy-700 rounded-xl p-4">
            <p className="text-gray-200">{steps[currentStep]?.instruction}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white text-xl focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
            placeholder="Your answer..."
            disabled={feedback !== null}
            autoFocus
          />
          <button
            type="submit"
            disabled={!input.trim() || feedback !== null}
            className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition disabled:opacity-50"
          >
            Check
          </button>
        </form>

        <AnimatePresence>
          {feedback && (
            <motion.div
              className={`mt-4 p-4 rounded-xl border ${
                feedback.correct
                  ? 'bg-green-900/30 border-agent-green text-green-200'
                  : 'bg-red-900/30 border-agent-red text-red-200'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className="mr-2">{feedback.correct ? '✓' : '✗'}</span>
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step progress dots */}
      <div className="flex justify-center gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i < currentStep ? 'bg-agent-green' : i === currentStep ? 'bg-gold-400' : 'bg-navy-600'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

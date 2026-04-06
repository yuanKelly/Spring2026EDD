import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GeneratedQuestion, AttemptResult } from '../../types';
import ReadAloud from '../ui/ReadAloud';

interface IndependentQuestionProps {
  question: GeneratedQuestion;
  onAnswer: (userAnswer: number) => AttemptResult;
  onNext: () => void;
  isFirstAttempt: boolean;
}

export default function IndependentQuestion({
  question,
  onAnswer,
  onNext,
  isFirstAttempt,
}: IndependentQuestionProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userAnswer = parseFloat(input);
    const attemptResult = onAnswer(userAnswer);
    setResult(attemptResult);

    if (attemptResult.correct) {
      setTimeout(() => {
        setInput('');
        setResult(null);
        setShowSolution(false);
        onNext();
      }, 1500);
    } else if (!attemptResult.isFirstAttempt) {
      setShowSolution(true);
    }
  };

  const handleTryAgain = () => {
    setInput('');
    setResult(null);
  };

  const handleNextAfterSolution = () => {
    setInput('');
    setResult(null);
    setShowSolution(false);
    onNext();
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="dossier rounded-2xl" style={{ padding: '2rem 2.5rem' }}>
        {/* Header badges */}
        <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span
            className="rounded-full text-sm font-medium"
            style={{
              padding: '0.35rem 1rem',
              background: 'rgba(251, 191, 36, 0.1)',
              color: '#fbbf24',
              border: '1px solid rgba(251, 191, 36, 0.2)',
            }}
          >
            Independent Mission
          </span>
          {!isFirstAttempt && (
            <span
              className="rounded-full text-sm font-medium"
              style={{
                padding: '0.35rem 1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              Second Attempt
            </span>
          )}
        </div>

        {/* Problem text */}
        <div className="flex justify-between items-start" style={{ marginBottom: '2rem' }}>
          <p className="text-gray-100 text-xl flex-1" style={{ lineHeight: '1.8', marginRight: '1rem' }}>{question.problemText}</p>
          <ReadAloud text={question.problemText} />
        </div>

        {/* Answer input */}
        {!showSolution ? (
          <form onSubmit={handleSubmit} className="flex" style={{ gap: '0.75rem', marginBottom: '1.25rem' }}>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-midnight-950 border border-midnight-500 rounded-xl text-white text-xl focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition"
              style={{ padding: '0.85rem 1.25rem' }}
              placeholder="Your answer..."
              disabled={result !== null}
              autoFocus
            />
            <motion.button
              type="submit"
              disabled={!input.trim() || result !== null}
              className="text-midnight-950 font-bold rounded-xl transition disabled:opacity-50"
              style={{
                padding: '0.85rem 2rem',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Submit
            </motion.button>
          </form>
        ) : null}

        {/* Feedback / Hint / Solution */}
        <AnimatePresence mode="wait">
          {result && !showSolution && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {result.correct ? (
                <div
                  className="rounded-xl"
                  style={{
                    padding: '1rem 1.25rem',
                    lineHeight: '1.6',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#86efac',
                  }}
                >
                  {result.isFirstAttempt
                    ? 'Excellent work, Agent! +1 point!'
                    : 'Correct! No points this time, but great job figuring it out.'}
                </div>
              ) : result.isFirstAttempt ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div
                    className="rounded-xl"
                    style={{
                      padding: '1rem 1.25rem',
                      lineHeight: '1.6',
                      background: 'rgba(234, 179, 8, 0.08)',
                      border: '1px solid rgba(234, 179, 8, 0.25)',
                      color: '#fde68a',
                    }}
                  >
                    <strong>Hint:</strong> {question.hint}
                  </div>
                  <motion.button
                    onClick={handleTryAgain}
                    className="w-full text-white font-bold rounded-xl transition text-lg"
                    style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      boxShadow: '0 4px 16px rgba(59, 130, 246, 0.25)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Try Again
                  </motion.button>
                </div>
              ) : null}
            </motion.div>
          )}

          {showSolution && (
            <motion.div
              key="solution"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <div
                className="rounded-xl"
                style={{
                  padding: '1rem 1.25rem',
                  lineHeight: '1.6',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#fca5a5',
                }}
              >
                Not quite right.{' '}
                {result && result.pointsChange < 0
                  ? 'You lost 1 point.'
                  : 'No points lost.'}
              </div>
              <div
                className="rounded-xl"
                style={{
                  padding: '1.25rem 1.5rem',
                  background: 'rgba(6, 8, 24, 0.6)',
                  border: '1px solid rgba(37, 48, 82, 0.5)',
                }}
              >
                <p className="text-amber-400 font-bold" style={{ marginBottom: '0.5rem', fontFamily: "'Fredoka', sans-serif" }}>Solution:</p>
                <p className="text-gray-200" style={{ lineHeight: '1.7' }}>{question.solution}</p>
                <p className="text-gray-400" style={{ marginTop: '0.75rem' }}>
                  The answer was: <strong className="text-white font-mono">{question.answer}</strong>
                </p>
              </div>
              <motion.button
                onClick={handleNextAfterSolution}
                className="w-full text-midnight-950 font-bold rounded-xl transition text-lg"
                style={{
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  boxShadow: '0 4px 20px rgba(251, 191, 36, 0.25)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next Question
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

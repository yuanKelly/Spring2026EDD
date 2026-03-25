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
      // Move to next after a short delay
      setTimeout(() => {
        setInput('');
        setResult(null);
        setShowSolution(false);
        onNext();
      }, 1500);
    } else if (!attemptResult.isFirstAttempt) {
      // Second wrong attempt — show solution
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
      <div className="bg-navy-800 rounded-2xl p-6 border border-navy-600">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gold-400/20 text-gold-400 px-3 py-1 rounded-full text-sm font-medium">
            Independent Mission
          </span>
          {!isFirstAttempt && (
            <span className="bg-agent-red/20 text-agent-red px-3 py-1 rounded-full text-sm font-medium">
              Second Attempt
            </span>
          )}
        </div>

        <div className="flex justify-between items-start mb-4">
          <p className="text-gray-100 text-xl leading-relaxed flex-1">{question.problemText}</p>
          <ReadAloud text={question.problemText} />
        </div>

        {!showSolution ? (
          <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white text-xl focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition"
              placeholder="Your answer..."
              disabled={result !== null}
              autoFocus
            />
            <button
              type="submit"
              disabled={!input.trim() || result !== null}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        ) : null}

        <AnimatePresence mode="wait">
          {result && !showSolution && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {result.correct ? (
                <div className="p-4 rounded-xl bg-green-900/30 border border-agent-green text-green-200">
                  <span className="text-2xl mr-2">✓</span>
                  {result.isFirstAttempt
                    ? 'Excellent work, Agent! +1 point!'
                    : 'Correct! No points this time, but great job figuring it out.'}
                </div>
              ) : result.isFirstAttempt ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-yellow-900/30 border border-yellow-500 text-yellow-200">
                    <span className="text-2xl mr-2">💡</span>
                    <strong>Hint:</strong> {question.hint}
                  </div>
                  <button
                    onClick={handleTryAgain}
                    className="w-full py-3 bg-agent-blue hover:bg-blue-700 text-white font-bold rounded-xl transition text-lg"
                  >
                    Try Again
                  </button>
                </div>
              ) : null}
            </motion.div>
          )}

          {showSolution && (
            <motion.div
              key="solution"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-xl bg-red-900/30 border border-agent-red text-red-200">
                <span className="text-2xl mr-2">✗</span>
                Not quite right.{' '}
                {result && result.pointsChange < 0
                  ? 'You lost 1 point.'
                  : 'No points lost.'}
              </div>
              <div className="p-4 rounded-xl bg-navy-700 border border-navy-600">
                <p className="text-gold-400 font-bold mb-1">Solution:</p>
                <p className="text-gray-200">{question.solution}</p>
                <p className="text-gray-400 mt-2">The answer was: <strong className="text-white">{question.answer}</strong></p>
              </div>
              <button
                onClick={handleNextAfterSolution}
                className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition text-lg"
              >
                Next Question
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

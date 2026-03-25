import { useState, useCallback } from 'react';
import type { AttemptResult } from '../types';

export function useScoring(maxPoints: number) {
  const [points, setPoints] = useState(0);
  const [lastChange, setLastChange] = useState<number | undefined>(undefined);
  const [isFirstAttempt, setIsFirstAttempt] = useState(true);

  const checkAnswer = useCallback(
    (userAnswer: number, correctAnswer: number): AttemptResult => {
      const correct = userAnswer === correctAnswer;

      if (isFirstAttempt) {
        if (correct) {
          const change = 1;
          setPoints((p) => p + change);
          setLastChange(change);
          setIsFirstAttempt(true); // reset for next question
          return { correct: true, isFirstAttempt: true, pointsChange: change };
        } else {
          setIsFirstAttempt(false);
          return { correct: false, isFirstAttempt: true, pointsChange: 0 };
        }
      } else {
        // Second attempt
        if (correct) {
          setLastChange(0);
          setIsFirstAttempt(true); // reset for next question
          return { correct: true, isFirstAttempt: false, pointsChange: 0 };
        } else {
          const change = points > 0 ? -1 : 0;
          if (change !== 0) {
            setPoints((p) => p + change);
          }
          setLastChange(change);
          setIsFirstAttempt(true); // reset for next question
          return { correct: false, isFirstAttempt: false, pointsChange: change };
        }
      }
    },
    [isFirstAttempt, points]
  );

  const resetScoring = useCallback(() => {
    setPoints(0);
    setLastChange(undefined);
    setIsFirstAttempt(true);
  }, []);

  const resetForNextQuestion = useCallback(() => {
    setIsFirstAttempt(true);
    setLastChange(undefined);
  }, []);

  return {
    points,
    maxPoints,
    lastChange,
    isFirstAttempt,
    isComplete: points >= maxPoints,
    checkAnswer,
    resetScoring,
    resetForNextQuestion,
  };
}

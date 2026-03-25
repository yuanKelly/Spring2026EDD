import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { units } from '../data/units';
import { tips } from '../data/tips';
import { questionGenerators } from '../data/generators';
import { useScoring } from '../hooks/useScoring';
import { useProgress } from '../hooks/useProgress';
import type { GeneratedQuestion, SessionState } from '../types';
import MissionIntro from '../components/game/MissionIntro';
import TourGuide from '../components/game/TourGuide';
import GuidedQuestion from '../components/game/GuidedQuestion';
import IndependentQuestion from '../components/game/IndependentQuestion';
import CodePieceReveal from '../components/game/CodePieceReveal';
import SessionSummary from '../components/session/SessionSummary';
import ScoreDisplay from '../components/ui/ScoreDisplay';
import ProgressBar from '../components/ui/ProgressBar';

const GUIDED_COUNT = 3;

export default function UnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const unit = units.find((u) => u.id === unitId);
  const tip = tips.find((t) => t.id === unit?.tipId);
  const { completeUnit, startUnit } = useProgress();

  const { points, maxPoints, lastChange, isFirstAttempt, isComplete, checkAnswer, resetForNextQuestion } =
    useScoring(unit?.maxPoints || 5);

  const [session, setSession] = useState<SessionState>({
    unitId: unitId || '',
    points: 0,
    questionsAttempted: 0,
    questionsCorrectFirstTry: 0,
    currentPhase: 'mission-intro',
    guidedQuestionsCompleted: 0,
    startedAt: new Date(),
  });

  const [currentQuestion, setCurrentQuestion] = useState<GeneratedQuestion | null>(null);

  const generateNewQuestion = useCallback(
    (guided: boolean) => {
      if (!unitId) return;
      const generator = questionGenerators[unitId];
      if (generator) {
        setCurrentQuestion(generator(guided));
      }
    },
    [unitId]
  );

  useEffect(() => {
    if (unitId) {
      startUnit(unitId);
    }
  }, [unitId, startUnit]);

  if (!unit || !tip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <p className="text-gray-400">Unit not found.</p>
        <button onClick={() => navigate('/home')} className="text-gold-400 ml-2">
          Go home
        </button>
      </div>
    );
  }

  const handleMissionIntroContinue = () => {
    setSession((s) => ({ ...s, currentPhase: 'meet-contact' }));
  };

  const handleTourGuideContinue = () => {
    generateNewQuestion(true);
    setSession((s) => ({ ...s, currentPhase: 'guided' }));
  };

  const handleGuidedComplete = () => {
    const newCount = session.guidedQuestionsCompleted + 1;
    setSession((s) => ({
      ...s,
      guidedQuestionsCompleted: newCount,
      questionsAttempted: s.questionsAttempted + 1,
      questionsCorrectFirstTry: s.questionsCorrectFirstTry + 1,
    }));

    if (newCount >= GUIDED_COUNT) {
      // Switch to independent questions
      generateNewQuestion(false);
      setSession((s) => ({ ...s, currentPhase: 'independent', guidedQuestionsCompleted: newCount }));
    } else {
      generateNewQuestion(true);
      setSession((s) => ({ ...s, guidedQuestionsCompleted: newCount }));
    }
  };

  const handleIndependentAnswer = (userAnswer: number) => {
    if (!currentQuestion) return { correct: false, isFirstAttempt: true, pointsChange: 0 };
    return checkAnswer(userAnswer, currentQuestion.answer);
  };

  const handleNextQuestion = () => {
    setSession((s) => ({
      ...s,
      questionsAttempted: s.questionsAttempted + 1,
    }));

    if (isComplete) {
      completeUnit(unit.id);
      setSession((s) => ({ ...s, currentPhase: 'code-reveal' }));
    } else {
      resetForNextQuestion();
      generateNewQuestion(false);
    }
  };

  const handleCodeRevealContinue = () => {
    setSession((s) => ({ ...s, currentPhase: 'summary' }));
  };

  const handleSaveAndExit = () => {
    navigate('/home');
  };

  // Check if scoring just completed (after answer but before next)
  useEffect(() => {
    if (isComplete && session.currentPhase === 'independent') {
      completeUnit(unit.id);
      setSession((s) => ({ ...s, currentPhase: 'code-reveal' }));
    }
  }, [isComplete, session.currentPhase, completeUnit, unit.id]);

  return (
    <div className="min-h-screen bg-navy-900">
      <AnimatePresence mode="wait">
        {session.currentPhase === 'mission-intro' && (
          <MissionIntro key="intro" unit={unit} onContinue={handleMissionIntroContinue} />
        )}

        {session.currentPhase === 'meet-contact' && (
          <TourGuide
            key="guide"
            contactName={unit.contactName}
            tip={tip}
            onContinue={handleTourGuideContinue}
          />
        )}

        {session.currentPhase === 'guided' && currentQuestion && (
          <div key="guided" className="min-h-screen flex flex-col items-center pt-6 px-4">
            <div className="w-full max-w-2xl flex items-center justify-between mb-6">
              <ProgressBar
                current={session.guidedQuestionsCompleted}
                max={GUIDED_COUNT}
                label="Guided Practice"
              />
              <button
                onClick={handleSaveAndExit}
                className="ml-4 px-4 py-2 bg-navy-700 hover:bg-navy-600 text-gray-300 rounded-lg transition text-sm whitespace-nowrap"
              >
                Save & Exit
              </button>
            </div>
            <GuidedQuestion
              question={currentQuestion}
              contactName={unit.contactName}
              onComplete={handleGuidedComplete}
            />
          </div>
        )}

        {session.currentPhase === 'independent' && currentQuestion && (
          <div key="independent" className="min-h-screen flex flex-col items-center pt-6 px-4">
            <div className="w-full max-w-2xl flex items-center justify-between mb-6">
              <ScoreDisplay points={points} maxPoints={maxPoints} lastChange={lastChange} />
              <button
                onClick={handleSaveAndExit}
                className="ml-4 px-4 py-2 bg-navy-700 hover:bg-navy-600 text-gray-300 rounded-lg transition text-sm whitespace-nowrap"
              >
                Save & Exit
              </button>
            </div>
            <IndependentQuestion
              key={session.questionsAttempted}
              question={currentQuestion}
              onAnswer={handleIndependentAnswer}
              onNext={handleNextQuestion}
              isFirstAttempt={isFirstAttempt}
            />
          </div>
        )}

        {session.currentPhase === 'code-reveal' && (
          <CodePieceReveal key="reveal" unit={unit} onContinue={handleCodeRevealContinue} />
        )}

        {session.currentPhase === 'summary' && (
          <SessionSummary
            key="summary"
            unit={unit}
            pointsEarned={points}
            questionsAttempted={session.questionsAttempted}
            questionsCorrectFirstTry={session.questionsCorrectFirstTry}
            startedAt={session.startedAt}
            onGoHome={() => navigate('/home')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

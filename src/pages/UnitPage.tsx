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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#060818' }}>
        <p className="text-gray-400">Unit not found.</p>
        <button onClick={() => navigate('/home')} className="text-amber-400 ml-2">
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

  useEffect(() => {
    if (isComplete && session.currentPhase === 'independent') {
      completeUnit(unit.id);
      setSession((s) => ({ ...s, currentPhase: 'code-reveal' }));
    }
  }, [isComplete, session.currentPhase, completeUnit, unit.id]);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#060818' }}>
      {/* Top bar */}
      <header
        className="flex items-center justify-between shrink-0 h-14 relative"
        style={{
          padding: '0 0.5in',
          background: 'linear-gradient(180deg, #0b0f24, #060818)',
          borderBottom: '1px solid rgba(37, 48, 82, 0.5)',
        }}
      >
        {/* Accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, #2dd4bf, #f59e0b, transparent)' }}
        />

        <h1
          className="font-bold text-lg"
          style={{
            fontFamily: "'Fredoka', sans-serif",
            background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {unit.city} — {unit.title}
        </h1>
        <button
          onClick={handleSaveAndExit}
          className="bg-midnight-700 hover:bg-midnight-600 text-gray-300 hover:text-white rounded-lg transition text-sm whitespace-nowrap min-h-0 border border-midnight-500"
          style={{ padding: '0.35rem 1rem' }}
        >
          Save & Exit
        </button>
      </header>

      {/* Game content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
            <div key="guided" className="flex-1 flex flex-col items-center overflow-auto" style={{ padding: '0.5in' }}>
              <div className="w-full max-w-2xl mb-4">
                <ProgressBar
                  current={session.guidedQuestionsCompleted}
                  max={GUIDED_COUNT}
                  label="Guided Practice"
                />
              </div>
              <GuidedQuestion
                question={currentQuestion}
                contactName={unit.contactName}
                onComplete={handleGuidedComplete}
              />
            </div>
          )}

          {session.currentPhase === 'independent' && currentQuestion && (
            <div key="independent" className="flex-1 flex flex-col items-center overflow-auto" style={{ padding: '0.5in' }}>
              <div className="w-full max-w-2xl mb-4">
                <ScoreDisplay points={points} maxPoints={maxPoints} lastChange={lastChange} />
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
    </div>
  );
}

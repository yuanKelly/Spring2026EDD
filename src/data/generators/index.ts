import type { QuestionGenerator } from '../../types';
import { generateMultiplicationDivision } from './multiplicationDivision';
import { generateMultistepOperations } from './multistepOperations';
import { generateInterpretingRemainders } from './interpretingRemainders';
import { generateFractions } from './fractions';
import { generateMeasurementUnits } from './measurementUnits';
import { generateFinalReview } from './finalReview';

export const questionGenerators: Record<string, QuestionGenerator> = {
  'unit-1': generateMultiplicationDivision,
  'unit-2': generateMultistepOperations,
  'unit-3': generateInterpretingRemainders,
  'unit-4': generateFractions,
  'unit-5': generateMeasurementUnits,
  'unit-6': generateFinalReview,
};

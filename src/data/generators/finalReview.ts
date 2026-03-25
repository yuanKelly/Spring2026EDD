import type { GeneratedQuestion } from '../../types';
import { generateMultiplicationDivision } from './multiplicationDivision';
import { generateMultistepOperations } from './multistepOperations';
import { generateInterpretingRemainders } from './interpretingRemainders';
import { generateFractions } from './fractions';
import { generateMeasurementUnits } from './measurementUnits';

const generators = [
  generateMultiplicationDivision,
  generateMultistepOperations,
  generateInterpretingRemainders,
  generateFractions,
  generateMeasurementUnits,
];

export function generateFinalReview(guided: boolean): GeneratedQuestion {
  const generator = generators[Math.floor(Math.random() * generators.length)];
  return generator(guided);
}

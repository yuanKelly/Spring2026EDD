import type { ProblemSolvingTip } from '../types';

export const tips: ProblemSolvingTip[] = [
  {
    id: 'cubes',
    title: 'CUBES Strategy',
    description: 'A step-by-step method to break down any word problem.',
    steps: [
      'C - Circle the important numbers',
      'U - Underline the question being asked',
      'B - Box the key words (total, each, left, etc.)',
      'E - Evaluate: decide which operation to use',
      'S - Solve and check your answer',
    ],
    unitId: 'unit-1',
  },
  {
    id: 'draw-it-out',
    title: 'Draw It Out',
    description: 'Sketch a picture or diagram to visualize the problem.',
    steps: [
      'Read the problem carefully',
      'Draw a simple picture of what is happening',
      'Label your drawing with numbers from the problem',
      'Use your drawing to figure out the steps',
      'Solve each step one at a time',
    ],
    unitId: 'unit-2',
  },
  {
    id: 'work-backwards',
    title: 'Work Backwards',
    description: 'Start from what you know and work backwards to find the answer.',
    steps: [
      'Read the problem and find out what you already know',
      'Think about what the answer should look like',
      'Start from the end and reverse the steps',
      'Check: does your answer make sense with the original problem?',
      'Write your final answer with a label',
    ],
    unitId: 'unit-3',
  },
  {
    id: 'friendly-numbers',
    title: 'Use Friendly Numbers',
    description: 'Round numbers to easier values to estimate before you solve.',
    steps: [
      'Look at the fractions in the problem',
      'Round each fraction to the nearest benchmark (0, 1/2, or 1)',
      'Estimate the answer using the benchmarks',
      'Solve the exact problem',
      'Compare your answer to your estimate — is it close?',
    ],
    unitId: 'unit-4',
  },
  {
    id: 'units-check',
    title: 'Units Check',
    description: 'Always label your units and make sure the answer is in the right unit.',
    steps: [
      'Read the problem and circle all the units (inches, pounds, etc.)',
      'Check: are all the units the same? If not, convert first!',
      'Solve the problem step by step',
      'Label your answer with the correct unit',
      'Ask yourself: does this unit make sense for the question?',
    ],
    unitId: 'unit-5',
  },
];

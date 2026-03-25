import type { GeneratedQuestion } from '../../types';

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// All fraction problems are engineered so the final answer is a clean integer.

const templates = [
  // Addition of fractions with same denominator → integer result
  () => {
    const denom = pick([2, 3, 4, 5, 6]);
    const wholeAnswer = randInt(1, 6);
    // We need two fractions that add to wholeAnswer
    // a/denom + b/denom = wholeAnswer → a + b = wholeAnswer * denom
    const total = wholeAnswer * denom;
    const a = randInt(1, total - 1);
    const b = total - a;
    return {
      problemText: `A chef used ${a}/${denom} of a bag of flour in the morning and ${b}/${denom} of a bag in the afternoon. How many whole bags of flour did the chef use in total?`,
      answer: wholeAnswer,
      hint: `Add the fractions: ${a}/${denom} + ${b}/${denom}. Since the denominators are the same, just add the numerators.`,
      solution: `${a}/${denom} + ${b}/${denom} = ${total}/${denom} = ${wholeAnswer} whole bags.`,
      njslsStandard: '4.NF.B.3',
    } as GeneratedQuestion;
  },
  // Subtraction of fractions → integer
  () => {
    const denom = pick([2, 3, 4, 5]);
    const startWhole = randInt(3, 8);
    const subtractWhole = randInt(1, startWhole - 1);
    const answer = startWhole - subtractWhole;
    const startNum = startWhole * denom;
    const subNum = subtractWhole * denom;
    return {
      problemText: `A water tank has ${startNum}/${denom} gallons. ${subNum}/${denom} gallons were used. How many whole gallons are left?`,
      answer,
      hint: `Subtract the numerators since the denominators are the same.`,
      solution: `${startNum}/${denom} - ${subNum}/${denom} = ${startNum - subNum}/${denom} = ${answer} whole gallons.`,
      njslsStandard: '4.NF.B.3',
    } as GeneratedQuestion;
  },
  // Multiply fraction by whole number → integer
  () => {
    const denom = pick([2, 3, 4, 5, 6]);
    const answer = randInt(2, 10);
    const wholeNum = denom;
    // answer = wholeNum × (answer/denom) ... wait, we want wholeNum × numerator/denom = answer
    // so numerator = answer * denom / wholeNum = answer (since wholeNum = denom)
    const numerator = answer;
    return {
      problemText: `Each student needs ${numerator}/${denom} of a meter of ribbon. If there are ${wholeNum} students, how many whole meters of ribbon are needed?`,
      answer,
      hint: `Multiply the fraction by the number of students: ${wholeNum} × ${numerator}/${denom}.`,
      solution: `${wholeNum} × ${numerator}/${denom} = ${wholeNum * numerator}/${denom} = ${answer} meters.`,
      njslsStandard: '4.NF.B.4',
    } as GeneratedQuestion;
  },
  // Multiply fraction by whole number (different approach)
  () => {
    const denom = pick([2, 4, 5, 10]);
    const answer = randInt(2, 8);
    const multiplier = randInt(2, 5) * denom;
    const numerator = (answer * denom) / multiplier;
    // Ensure numerator is integer
    if (numerator !== Math.floor(numerator)) {
      // Fallback
      const safeDenom = 2;
      const safeMultiplier = randInt(2, 6) * safeDenom;
      const safeAnswer = randInt(2, 8);
      const safeNumerator = (safeAnswer * safeDenom) / safeMultiplier;
      return {
        problemText: `A recipe uses ${safeNumerator}/${safeDenom} cup of sugar. If you make ${safeMultiplier} batches, how many whole cups of sugar do you need?`,
        answer: safeAnswer,
        hint: `Multiply: ${safeMultiplier} × ${safeNumerator}/${safeDenom}.`,
        solution: `${safeMultiplier} × ${safeNumerator}/${safeDenom} = ${safeMultiplier * safeNumerator}/${safeDenom} = ${safeAnswer} cups.`,
        njslsStandard: '4.NF.B.4',
      } as GeneratedQuestion;
    }
    return {
      problemText: `A recipe uses ${numerator}/${denom} cup of sugar. If you make ${multiplier} batches, how many whole cups of sugar do you need?`,
      answer,
      hint: `Multiply: ${multiplier} × ${numerator}/${denom}.`,
      solution: `${multiplier} × ${numerator}/${denom} = ${multiplier * numerator}/${denom} = ${answer} cups.`,
      njslsStandard: '4.NF.B.4',
    } as GeneratedQuestion;
  },
  // Adding mixed numbers → integer
  () => {
    const denom = pick([2, 3, 4]);
    const whole1 = randInt(1, 5);
    const whole2 = randInt(1, 5);
    const frac1 = randInt(1, denom - 1);
    const frac2 = denom - frac1;
    const answer = whole1 + whole2 + 1; // fractions add to 1 whole
    return {
      problemText: `Lisa ran ${whole1} and ${frac1}/${denom} miles on Monday. She ran ${whole2} and ${frac2}/${denom} miles on Tuesday. How many total miles did she run?`,
      answer,
      hint: `Add the whole numbers together, then add the fractions. ${frac1}/${denom} + ${frac2}/${denom} makes another whole!`,
      solution: `Whole numbers: ${whole1} + ${whole2} = ${whole1 + whole2}. Fractions: ${frac1}/${denom} + ${frac2}/${denom} = ${denom}/${denom} = 1. Total: ${whole1 + whole2} + 1 = ${answer} miles.`,
      njslsStandard: '5.NF.A.2',
    } as GeneratedQuestion;
  },
  // Simple fraction of a whole number
  () => {
    const denom = pick([2, 3, 4, 5]);
    const numerator = 1;
    const wholeNum = denom * randInt(2, 8);
    const answer = wholeNum / denom;
    return {
      problemText: `There are ${wholeNum} cookies. ${numerator}/${denom} of the cookies are chocolate chip. How many chocolate chip cookies are there?`,
      answer,
      hint: `Find ${numerator}/${denom} of ${wholeNum}. Divide ${wholeNum} by ${denom}.`,
      solution: `${wholeNum} ÷ ${denom} = ${answer} chocolate chip cookies.`,
      njslsStandard: '4.NF.B.4',
    } as GeneratedQuestion;
  },
  () => {
    const denom = pick([2, 3, 4, 5, 6]);
    const numerator = randInt(1, denom - 1);
    const wholeNum = (denom * randInt(2, 6));
    const answer = (wholeNum * numerator) / denom;
    if (answer !== Math.floor(answer)) {
      // Fallback to simple case
      const d = 4;
      const n = 3;
      const w = d * randInt(1, 5);
      return {
        problemText: `A tank holds ${w} liters. It is ${n}/${d} full. How many liters of water are in the tank?`,
        answer: (w * n) / d,
        hint: `Find ${n}/${d} of ${w}. Multiply ${w} by ${n}, then divide by ${d}.`,
        solution: `${w} × ${n}/${d} = ${(w * n) / d} liters.`,
        njslsStandard: '5.NF.A.2',
      } as GeneratedQuestion;
    }
    return {
      problemText: `A tank holds ${wholeNum} liters. It is ${numerator}/${denom} full. How many liters of water are in the tank?`,
      answer,
      hint: `Find ${numerator}/${denom} of ${wholeNum}. Multiply ${wholeNum} by ${numerator}, then divide by ${denom}.`,
      solution: `${wholeNum} × ${numerator}/${denom} = ${answer} liters.`,
      njslsStandard: '5.NF.A.2',
    } as GeneratedQuestion;
  },
  () => {
    const denom = pick([2, 3, 4]);
    const total = denom * randInt(3, 8);
    const groups = denom;
    const answer = total / groups;
    return {
      problemText: `${total} oranges are split into ${groups} equal groups. How many oranges are in each group?`,
      answer,
      hint: `Divide the total oranges by the number of groups.`,
      solution: `${total} ÷ ${groups} = ${answer} oranges per group.`,
      njslsStandard: '4.NF.B.3',
    } as GeneratedQuestion;
  },
];

export function generateFractions(guided: boolean): GeneratedQuestion {
  const question = pick(templates)();

  if (guided) {
    return {
      ...question,
      steps: [
        {
          instruction: 'Look at the fractions in this problem. What is the denominator (bottom number)?',
          expectedAnswer: parseInt(question.problemText.match(/\/(\d+)/)?.[1] || '0'),
          feedbackCorrect: 'Correct! You identified the denominator.',
          feedbackIncorrect: `Look for the number on the bottom of the fraction.`,
        },
        {
          instruction: `Now solve the problem. What is the final answer?`,
          expectedAnswer: question.answer,
          feedbackCorrect: `Excellent! The answer is ${question.answer}!`,
          feedbackIncorrect: `${question.solution}`,
        },
      ],
    };
  }
  return question;
}

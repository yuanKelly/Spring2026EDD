import type { GeneratedQuestion } from '../../types';

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Templates where answer = quotient (ignore remainder)
const quotientTemplates = [
  () => {
    const quotient = randInt(3, 12);
    const divisor = randInt(3, 8);
    const remainder = randInt(1, divisor - 1);
    const dividend = quotient * divisor + remainder;
    return {
      problemText: `A teacher has ${dividend} pencils. She gives ${divisor} pencils to each student. How many students get a full set of pencils?`,
      answer: quotient,
      hint: `Divide ${dividend} by ${divisor}. The answer is the whole number part (ignore the remainder).`,
      solution: `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}. ${quotient} students get a full set. The extra ${remainder} pencils are not enough for another full set.`,
      njslsStandard: '4.OA.A.3',
    } as GeneratedQuestion;
  },
  () => {
    const quotient = randInt(4, 10);
    const seats = randInt(4, 8);
    const remainder = randInt(1, seats - 1);
    const total = quotient * seats + remainder;
    return {
      problemText: `There are ${total} people waiting for a ride. Each car holds ${seats} people. How many cars will be completely full?`,
      answer: quotient,
      hint: `Divide and use only the whole number part.`,
      solution: `${total} ÷ ${seats} = ${quotient} remainder ${remainder}. ${quotient} cars will be completely full.`,
      njslsStandard: '4.OA.A.3',
    } as GeneratedQuestion;
  },
  () => {
    const quotient = randInt(3, 8);
    const perRow = randInt(5, 10);
    const remainder = randInt(1, perRow - 1);
    const total = quotient * perRow + remainder;
    return {
      problemText: `A gardener plants ${total} seeds in rows of ${perRow}. How many complete rows can be planted?`,
      answer: quotient,
      hint: `Divide the total seeds by seeds per row. Use the whole number.`,
      solution: `${total} ÷ ${perRow} = ${quotient} remainder ${remainder}. ${quotient} complete rows, with ${remainder} seeds left over.`,
      njslsStandard: '5.NBT.B.6',
    } as GeneratedQuestion;
  },
];

// Templates where answer = quotient + 1 (round up because of remainder)
const roundUpTemplates = [
  () => {
    const quotient = randInt(3, 10);
    const perBus = randInt(4, 8);
    const remainder = randInt(1, perBus - 1);
    const total = quotient * perBus + remainder;
    const answer = quotient + 1;
    return {
      problemText: `There are ${total} students going on a field trip. Each bus holds ${perBus} students. How many buses are needed so everyone can go?`,
      answer,
      hint: `Divide and think: if there are leftover students, they still need a bus!`,
      solution: `${total} ÷ ${perBus} = ${quotient} remainder ${remainder}. We need ${answer} buses because the extra ${remainder} students still need a bus.`,
      njslsStandard: '4.OA.A.3',
    } as GeneratedQuestion;
  },
  () => {
    const quotient = randInt(3, 8);
    const perBox = randInt(4, 10);
    const remainder = randInt(1, perBox - 1);
    const total = quotient * perBox + remainder;
    const answer = quotient + 1;
    return {
      problemText: `A baker made ${total} cookies. Each box holds ${perBox} cookies. How many boxes does the baker need to pack ALL the cookies?`,
      answer,
      hint: `Even if the last box is not full, you still need it!`,
      solution: `${total} ÷ ${perBox} = ${quotient} remainder ${remainder}. The baker needs ${answer} boxes to hold all ${total} cookies.`,
      njslsStandard: '4.OA.A.3',
    } as GeneratedQuestion;
  },
  () => {
    const quotient = randInt(2, 7);
    const perTrip = randInt(3, 8);
    const remainder = randInt(1, perTrip - 1);
    const total = quotient * perTrip + remainder;
    const answer = quotient + 1;
    return {
      problemText: `A mover has ${total} boxes to carry. He can carry ${perTrip} boxes per trip. How many trips does he need to carry all the boxes?`,
      answer,
      hint: `If there are boxes left after the last full trip, he needs one more trip.`,
      solution: `${total} ÷ ${perTrip} = ${quotient} remainder ${remainder}. He needs ${answer} trips total.`,
      njslsStandard: '5.NBT.B.6',
    } as GeneratedQuestion;
  },
];

// Templates where answer = remainder
const remainderTemplates = [
  () => {
    const quotient = randInt(3, 8);
    const divisor = randInt(3, 7);
    const remainder = randInt(1, divisor - 1);
    const total = quotient * divisor + remainder;
    return {
      problemText: `${total} marbles are shared equally among ${divisor} friends. How many marbles are left over?`,
      answer: remainder,
      hint: `Divide and find the remainder — that is how many are left over.`,
      solution: `${total} ÷ ${divisor} = ${quotient} remainder ${remainder}. There are ${remainder} marbles left over.`,
      njslsStandard: '4.OA.A.3',
    } as GeneratedQuestion;
  },
  () => {
    const quotient = randInt(4, 10);
    const perRow = randInt(4, 9);
    const remainder = randInt(1, perRow - 1);
    const total = quotient * perRow + remainder;
    return {
      problemText: `A farmer has ${total} eggs. He puts ${perRow} eggs in each carton. How many eggs do not fit in a carton?`,
      answer: remainder,
      hint: `The remainder tells you how many eggs are left without a carton.`,
      solution: `${total} ÷ ${perRow} = ${quotient} remainder ${remainder}. ${remainder} eggs do not fit.`,
      njslsStandard: '4.OA.A.3',
    } as GeneratedQuestion;
  },
  () => {
    const quotient = randInt(2, 6);
    const perTeam = randInt(3, 7);
    const remainder = randInt(1, perTeam - 1);
    const total = quotient * perTeam + remainder;
    return {
      problemText: `${total} students need to form teams of ${perTeam}. After making as many teams as possible, how many students are without a team?`,
      answer: remainder,
      hint: `Divide to find how many full teams, then the remainder is students left out.`,
      solution: `${total} ÷ ${perTeam} = ${quotient} remainder ${remainder}. ${remainder} students are without a team.`,
      njslsStandard: '5.NBT.B.6',
    } as GeneratedQuestion;
  },
];

export function generateInterpretingRemainders(guided: boolean): GeneratedQuestion {
  const allTemplates = [...quotientTemplates, ...roundUpTemplates, ...remainderTemplates];
  const question = pick(allTemplates)();

  if (guided) {
    const nums = question.problemText.match(/\d+/g)!.map(Number);
    const dividend = nums[0];
    const divisor = nums[1];
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    return {
      ...question,
      steps: [
        {
          instruction: `What is the total number being divided?`,
          expectedAnswer: dividend,
          feedbackCorrect: `Right! We start with ${dividend}.`,
          feedbackIncorrect: `The total is ${dividend}.`,
        },
        {
          instruction: `What are we dividing by?`,
          expectedAnswer: divisor,
          feedbackCorrect: `Correct! We divide by ${divisor}.`,
          feedbackIncorrect: `We are dividing by ${divisor}.`,
        },
        {
          instruction: `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}. Now think about what the question is asking. What is the final answer?`,
          expectedAnswer: question.answer,
          feedbackCorrect: `Excellent! You correctly interpreted the remainder!`,
          feedbackIncorrect: `The answer is ${question.answer}. ${question.solution}`,
        },
      ],
    };
  }
  return question;
}

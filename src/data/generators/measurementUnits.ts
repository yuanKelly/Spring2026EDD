import type { GeneratedQuestion } from '../../types';

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const templates = [
  // feet to inches (1 ft = 12 in)
  () => {
    const feet = randInt(2, 10);
    const answer = feet * 12;
    return {
      problemText: `A board is ${feet} feet long. How many inches long is the board? (1 foot = 12 inches)`,
      answer,
      hint: `Multiply the number of feet by 12 to convert to inches.`,
      solution: `${feet} feet × 12 inches per foot = ${answer} inches.`,
      njslsStandard: '4.MD.A.1',
    } as GeneratedQuestion;
  },
  // inches to feet
  () => {
    const answer = randInt(2, 8);
    const inches = answer * 12;
    return {
      problemText: `A rope is ${inches} inches long. How many feet is that? (12 inches = 1 foot)`,
      answer,
      hint: `Divide the inches by 12 to convert to feet.`,
      solution: `${inches} inches ÷ 12 = ${answer} feet.`,
      njslsStandard: '4.MD.A.1',
    } as GeneratedQuestion;
  },
  // meters to centimeters (1 m = 100 cm)
  () => {
    const meters = randInt(2, 15);
    const answer = meters * 100;
    return {
      problemText: `A swimming pool is ${meters} meters long. How many centimeters is that? (1 meter = 100 centimeters)`,
      answer,
      hint: `Multiply meters by 100 to get centimeters.`,
      solution: `${meters} meters × 100 = ${answer} centimeters.`,
      njslsStandard: '5.MD.A.1',
    } as GeneratedQuestion;
  },
  // centimeters to meters
  () => {
    const answer = randInt(2, 12);
    const cm = answer * 100;
    return {
      problemText: `A hallway is ${cm} centimeters long. How many meters is that? (100 centimeters = 1 meter)`,
      answer,
      hint: `Divide centimeters by 100 to get meters.`,
      solution: `${cm} cm ÷ 100 = ${answer} meters.`,
      njslsStandard: '5.MD.A.1',
    } as GeneratedQuestion;
  },
  // pounds to ounces (1 lb = 16 oz)
  () => {
    const pounds = randInt(2, 8);
    const answer = pounds * 16;
    return {
      problemText: `A bag of dog food weighs ${pounds} pounds. How many ounces is that? (1 pound = 16 ounces)`,
      answer,
      hint: `Multiply pounds by 16 to get ounces.`,
      solution: `${pounds} pounds × 16 = ${answer} ounces.`,
      njslsStandard: '4.MD.A.1',
    } as GeneratedQuestion;
  },
  // ounces to pounds
  () => {
    const answer = randInt(2, 6);
    const oz = answer * 16;
    return {
      problemText: `A baby weighs ${oz} ounces. How many pounds is that? (16 ounces = 1 pound)`,
      answer,
      hint: `Divide ounces by 16 to get pounds.`,
      solution: `${oz} ounces ÷ 16 = ${answer} pounds.`,
      njslsStandard: '4.MD.A.1',
    } as GeneratedQuestion;
  },
  // yards to feet (1 yard = 3 feet)
  () => {
    const yards = randInt(3, 15);
    const answer = yards * 3;
    return {
      problemText: `A football field is ${yards} yards long. How many feet is that? (1 yard = 3 feet)`,
      answer,
      hint: `Multiply yards by 3 to get feet.`,
      solution: `${yards} yards × 3 = ${answer} feet.`,
      njslsStandard: '4.MD.A.1',
    } as GeneratedQuestion;
  },
  // Multistep: convert and add
  () => {
    const feet1 = randInt(2, 6);
    const feet2 = randInt(2, 6);
    const answer = (feet1 + feet2) * 12;
    return {
      problemText: `Jake has two pieces of wood. One is ${feet1} feet and the other is ${feet2} feet. If he puts them end to end, how many inches long is the combined piece? (1 foot = 12 inches)`,
      answer,
      hint: `First add the feet together, then convert to inches.`,
      solution: `${feet1} + ${feet2} = ${feet1 + feet2} feet. ${feet1 + feet2} × 12 = ${answer} inches.`,
      njslsStandard: '4.MD.A.2',
    } as GeneratedQuestion;
  },
  // Multistep: convert and subtract
  () => {
    const totalPounds = randInt(5, 12);
    const usedPounds = randInt(1, totalPounds - 1);
    const answer = (totalPounds - usedPounds) * 16;
    return {
      problemText: `A baker has ${totalPounds} pounds of flour and uses ${usedPounds} pounds. How many ounces of flour are left? (1 pound = 16 ounces)`,
      answer,
      hint: `First find how many pounds are left, then convert to ounces.`,
      solution: `${totalPounds} - ${usedPounds} = ${totalPounds - usedPounds} pounds left. ${totalPounds - usedPounds} × 16 = ${answer} ounces.`,
      njslsStandard: '4.MD.A.2',
    } as GeneratedQuestion;
  },
  // Kilometers to meters
  () => {
    const km = randInt(2, 10);
    const answer = km * 1000;
    return {
      problemText: `A hiking trail is ${km} kilometers long. How many meters is that? (1 kilometer = 1000 meters)`,
      answer,
      hint: `Multiply kilometers by 1000 to get meters.`,
      solution: `${km} km × 1000 = ${answer} meters.`,
      njslsStandard: '5.MD.A.1',
    } as GeneratedQuestion;
  },
  // Gallons to quarts (1 gal = 4 qt)
  () => {
    const gallons = randInt(2, 10);
    const answer = gallons * 4;
    return {
      problemText: `A fish tank holds ${gallons} gallons of water. How many quarts is that? (1 gallon = 4 quarts)`,
      answer,
      hint: `Multiply gallons by 4 to get quarts.`,
      solution: `${gallons} gallons × 4 = ${answer} quarts.`,
      njslsStandard: '4.MD.A.1',
    } as GeneratedQuestion;
  },
];

export function generateMeasurementUnits(guided: boolean): GeneratedQuestion {
  const question = pick(templates)();

  if (guided) {
    return {
      ...question,
      steps: [
        {
          instruction: 'What is the conversion factor given in the problem? (e.g., if 1 foot = 12 inches, the factor is 12)',
          expectedAnswer: parseInt(question.solution.match(/[×÷] (\d+)/)?.[1] || '0'),
          feedbackCorrect: 'Correct! You found the conversion factor.',
          feedbackIncorrect: `Look at the conversion hint in parentheses at the end of the problem.`,
        },
        {
          instruction: `Now use the conversion factor to find the answer.`,
          expectedAnswer: question.answer,
          feedbackCorrect: `Great work! The answer is ${question.answer}!`,
          feedbackIncorrect: `${question.solution}`,
        },
      ],
    };
  }
  return question;
}

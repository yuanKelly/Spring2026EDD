import type { GeneratedQuestion } from '../../types';

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Template {
  generate: () => GeneratedQuestion;
}

const multiplicationTemplates: Template[] = [
  {
    generate: () => {
      const a = randInt(3, 12);
      const b = randInt(2, 9);
      const answer = a * b;
      return {
        problemText: `A baker in Paris made ${a} trays of croissants. Each tray has ${b} croissants. How many croissants did the baker make in total?`,
        answer,
        hint: `Try multiplying the number of trays by the number of croissants on each tray.`,
        solution: `${a} trays × ${b} croissants per tray = ${answer} croissants in total.`,
        njslsStandard: '4.OA.A.1',
      };
    },
  },
  {
    generate: () => {
      const groups = randInt(4, 10);
      const perGroup = randInt(3, 8);
      const answer = groups * perGroup;
      return {
        problemText: `A tour guide is leading ${groups} groups of tourists through a museum. Each group has ${perGroup} people. How many tourists are there in all?`,
        answer,
        hint: `Multiply the number of groups by the number of people in each group.`,
        solution: `${groups} groups × ${perGroup} people per group = ${answer} tourists in all.`,
        njslsStandard: '4.OA.A.1',
      };
    },
  },
  {
    generate: () => {
      const rows = randInt(3, 9);
      const cols = randInt(4, 8);
      const answer = rows * cols;
      return {
        problemText: `A French garden has ${rows} rows of flowers. Each row has ${cols} flowers. How many flowers are in the garden?`,
        answer,
        hint: `Think of this as an array — rows times columns.`,
        solution: `${rows} rows × ${cols} flowers per row = ${answer} flowers in the garden.`,
        njslsStandard: '4.OA.A.2',
      };
    },
  },
  {
    generate: () => {
      const packs = randInt(3, 8);
      const perPack = randInt(4, 12);
      const answer = packs * perPack;
      return {
        problemText: `A student bought ${packs} packs of colored pencils. Each pack has ${perPack} pencils. How many colored pencils does the student have?`,
        answer,
        hint: `Multiply the number of packs by the number of pencils in each pack.`,
        solution: `${packs} packs × ${perPack} pencils per pack = ${answer} colored pencils total.`,
        njslsStandard: '4.OA.A.1',
      };
    },
  },
  {
    generate: () => {
      const shelves = randInt(3, 7);
      const booksPerShelf = randInt(5, 12);
      const answer = shelves * booksPerShelf;
      return {
        problemText: `A library in Paris has ${shelves} shelves. Each shelf holds ${booksPerShelf} books. How many books are on all the shelves?`,
        answer,
        hint: `Multiply the number of shelves by the books on each shelf.`,
        solution: `${shelves} shelves × ${booksPerShelf} books per shelf = ${answer} books total.`,
        njslsStandard: '4.OA.A.1',
      };
    },
  },
];

const divisionTemplates: Template[] = [
  {
    generate: () => {
      const answer = randInt(3, 12);
      const divisor = randInt(2, 9);
      const dividend = answer * divisor;
      return {
        problemText: `A café has ${dividend} macarons to share equally among ${divisor} tables. How many macarons does each table get?`,
        answer,
        hint: `Divide the total number of macarons by the number of tables.`,
        solution: `${dividend} macarons ÷ ${divisor} tables = ${answer} macarons per table.`,
        njslsStandard: '4.OA.A.2',
      };
    },
  },
  {
    generate: () => {
      const answer = randInt(4, 10);
      const perBag = randInt(3, 8);
      const total = answer * perBag;
      return {
        problemText: `A shop owner has ${total} souvenirs. She puts ${perBag} souvenirs in each bag. How many bags does she need?`,
        answer,
        hint: `Divide the total souvenirs by the number that fit in each bag.`,
        solution: `${total} souvenirs ÷ ${perBag} per bag = ${answer} bags needed.`,
        njslsStandard: '4.OA.A.2',
      };
    },
  },
  {
    generate: () => {
      const answer = randInt(3, 9);
      const students = randInt(3, 7);
      const total = answer * students;
      return {
        problemText: `${total} stickers are shared equally among ${students} students. How many stickers does each student get?`,
        answer,
        hint: `Divide the total stickers by the number of students.`,
        solution: `${total} stickers ÷ ${students} students = ${answer} stickers each.`,
        njslsStandard: '4.OA.A.2',
      };
    },
  },
  {
    generate: () => {
      const answer = randInt(5, 12);
      const pages = randInt(2, 6);
      const total = answer * pages;
      return {
        problemText: `A photo album has ${total} photos arranged equally on ${pages} pages. How many photos are on each page?`,
        answer,
        hint: `Divide the total photos by the number of pages.`,
        solution: `${total} photos ÷ ${pages} pages = ${answer} photos per page.`,
        njslsStandard: '4.OA.A.3',
      };
    },
  },
  {
    generate: () => {
      const answer = randInt(4, 8);
      const boxes = randInt(3, 6);
      const total = answer * boxes;
      return {
        problemText: `A delivery truck has ${total} packages split equally into ${boxes} boxes. How many packages are in each box?`,
        answer,
        hint: `Divide the total packages by the number of boxes.`,
        solution: `${total} packages ÷ ${boxes} boxes = ${answer} packages per box.`,
        njslsStandard: '4.OA.A.2',
      };
    },
  },
];

function addGuidedSteps(q: GeneratedQuestion, isMultiplication: boolean): GeneratedQuestion {
  if (isMultiplication) {
    const nums = q.problemText.match(/\d+/g)!.map(Number);
    return {
      ...q,
      steps: [
        {
          instruction: 'First, identify the two numbers you need to multiply. What is the first number?',
          expectedAnswer: nums[0],
          feedbackCorrect: `Great job! ${nums[0]} is correct.`,
          feedbackIncorrect: `Look for the first number in the problem. It is ${nums[0]}.`,
        },
        {
          instruction: `Now, what is the second number you need to multiply by?`,
          expectedAnswer: nums[1],
          feedbackCorrect: `Excellent! ${nums[1]} is right.`,
          feedbackIncorrect: `Check the problem again. The second number is ${nums[1]}.`,
        },
        {
          instruction: `Now multiply: ${nums[0]} × ${nums[1]} = ?`,
          expectedAnswer: q.answer,
          feedbackCorrect: `Amazing! ${nums[0]} × ${nums[1]} = ${q.answer}. You got it!`,
          feedbackIncorrect: `${nums[0]} × ${nums[1]} = ${q.answer}. Keep practicing!`,
        },
      ],
    };
  } else {
    const nums = q.problemText.match(/\d+/g)!.map(Number);
    return {
      ...q,
      steps: [
        {
          instruction: 'What is the total number that needs to be divided?',
          expectedAnswer: nums[0],
          feedbackCorrect: `Correct! The total is ${nums[0]}.`,
          feedbackIncorrect: `Look for the biggest number in the problem. It is ${nums[0]}.`,
        },
        {
          instruction: `How many groups or parts are we dividing into?`,
          expectedAnswer: nums[1],
          feedbackCorrect: `Right! We are dividing into ${nums[1]} groups.`,
          feedbackIncorrect: `Check the problem again. We are dividing into ${nums[1]} groups.`,
        },
        {
          instruction: `Now divide: ${nums[0]} ÷ ${nums[1]} = ?`,
          expectedAnswer: q.answer,
          feedbackCorrect: `Perfect! ${nums[0]} ÷ ${nums[1]} = ${q.answer}!`,
          feedbackIncorrect: `${nums[0]} ÷ ${nums[1]} = ${q.answer}. You will get it next time!`,
        },
      ],
    };
  }
}

export function generateMultiplicationDivision(guided: boolean): GeneratedQuestion {
  const isMultiplication = Math.random() > 0.5;
  const templates = isMultiplication ? multiplicationTemplates : divisionTemplates;
  const question = pick(templates).generate();

  if (guided) {
    return addGuidedSteps(question, isMultiplication);
  }
  return question;
}

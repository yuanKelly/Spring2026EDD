import type { GeneratedQuestion } from '../../types';

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const templates = [
  () => {
    const pricePerTicket = randInt(3, 10);
    const tickets = randInt(2, 6);
    const snack = randInt(2, 8);
    const answer = pricePerTicket * tickets + snack;
    return {
      problemText: `A family bought ${tickets} movie tickets. Each ticket costs $${pricePerTicket}. They also bought snacks for $${snack}. How much did they spend in total?`,
      answer,
      hint: `First multiply the number of tickets by the price, then add the snack cost.`,
      solution: `${tickets} × $${pricePerTicket} = $${pricePerTicket * tickets} for tickets. $${pricePerTicket * tickets} + $${snack} for snacks = $${answer} total.`,
      njslsStandard: '4.OA.A.3',
    } as GeneratedQuestion;
  },
  () => {
    const earned = randInt(20, 50);
    const spent1 = randInt(5, 10);
    const spent2 = randInt(3, 8);
    const answer = earned - spent1 - spent2;
    return {
      problemText: `Marco earned $${earned} doing chores. He spent $${spent1} on a book and $${spent2} on lunch. How much money does Marco have left?`,
      answer,
      hint: `Subtract each expense from the total earned.`,
      solution: `$${earned} - $${spent1} - $${spent2} = $${answer} remaining.`,
      njslsStandard: '5.OA.A.1',
    } as GeneratedQuestion;
  },
  () => {
    const boxes = randInt(3, 6);
    const perBox = randInt(4, 8);
    const eaten = randInt(2, 5);
    const answer = boxes * perBox - eaten;
    return {
      problemText: `A store received ${boxes} boxes of apples. Each box has ${perBox} apples. After selling ${eaten} apples, how many apples are left?`,
      answer,
      hint: `First find the total number of apples, then subtract the ones that were sold.`,
      solution: `${boxes} × ${perBox} = ${boxes * perBox} apples total. ${boxes * perBox} - ${eaten} = ${answer} apples left.`,
      njslsStandard: '4.OA.A.3',
    } as GeneratedQuestion;
  },
  () => {
    const classSize = randInt(20, 35);
    const teams = randInt(2, 5);
    const answer2 = Math.floor(classSize / teams);
    const classAdj = answer2 * teams;
    const extraStudents = randInt(2, 6);
    const answer = classAdj + extraStudents;
    return {
      problemText: `A school has ${classAdj} students split equally into ${teams} teams. Then ${extraStudents} new students joined. How many students are there now?`,
      answer,
      hint: `The students are already in teams. Just add the new students to the total.`,
      solution: `${classAdj} students + ${extraStudents} new students = ${answer} students total.`,
      njslsStandard: '5.OA.A.1',
    } as GeneratedQuestion;
  },
  () => {
    const bags = randInt(3, 7);
    const perBag = randInt(5, 10);
    const given = randInt(2, 4);
    const friends = randInt(2, 5);
    const total = bags * perBag;
    const afterGiving = total - given * friends;
    return {
      problemText: `Sam has ${bags} bags with ${perBag} marbles in each bag. He gives ${given} marbles to each of his ${friends} friends. How many marbles does Sam have left?`,
      answer: afterGiving,
      hint: `First find the total marbles. Then find how many he gave away (${given} × ${friends}), and subtract.`,
      solution: `Total: ${bags} × ${perBag} = ${total}. Gave away: ${given} × ${friends} = ${given * friends}. Left: ${total} - ${given * friends} = ${afterGiving}.`,
      njslsStandard: '5.OA.A.2',
    } as GeneratedQuestion;
  },
  () => {
    const price = randInt(4, 12);
    const qty = randInt(3, 6);
    const discount = randInt(2, 5);
    const answer = price * qty - discount;
    return {
      problemText: `A toy costs $${price}. Julia buys ${qty} toys and uses a $${discount} coupon. How much does she pay?`,
      answer,
      hint: `Multiply the price by the quantity, then subtract the coupon.`,
      solution: `${qty} × $${price} = $${price * qty}. After coupon: $${price * qty} - $${discount} = $${answer}.`,
      njslsStandard: '4.OA.A.3',
    } as GeneratedQuestion;
  },
  () => {
    const perDay = randInt(5, 15);
    const days = randInt(3, 7);
    const bonus = randInt(5, 20);
    const answer = perDay * days + bonus;
    return {
      problemText: `A worker earns $${perDay} per day. After working ${days} days, she receives a $${bonus} bonus. How much did she earn in total?`,
      answer,
      hint: `Multiply the daily pay by the number of days, then add the bonus.`,
      solution: `${days} × $${perDay} = $${perDay * days}. Plus bonus: $${perDay * days} + $${bonus} = $${answer}.`,
      njslsStandard: '5.OA.A.1',
    } as GeneratedQuestion;
  },
  () => {
    const start = randInt(50, 100);
    const packs = randInt(3, 5);
    const perPack = randInt(4, 8);
    const answer = start - packs * perPack;
    return {
      problemText: `A warehouse had ${start} cans of paint. Workers used ${packs} sets of ${perPack} cans each. How many cans are left?`,
      answer,
      hint: `Find how many cans were used (sets × cans per set), then subtract from the starting amount.`,
      solution: `Used: ${packs} × ${perPack} = ${packs * perPack}. Remaining: ${start} - ${packs * perPack} = ${answer}.`,
      njslsStandard: '4.OA.A.3',
    } as GeneratedQuestion;
  },
  () => {
    const pages = randInt(3, 6);
    const stickersPerPage = randInt(4, 8);
    const lost = randInt(2, 5);
    const found = randInt(1, 4);
    const total = pages * stickersPerPage;
    const answer = total - lost + found;
    return {
      problemText: `Mia has ${pages} pages of stickers with ${stickersPerPage} stickers on each page. She lost ${lost} stickers but found ${found} more. How many stickers does she have now?`,
      answer,
      hint: `Find the total first, then subtract the lost ones, and add the found ones.`,
      solution: `Total: ${pages} × ${stickersPerPage} = ${total}. After lost: ${total} - ${lost} = ${total - lost}. After found: ${total - lost} + ${found} = ${answer}.`,
      njslsStandard: '5.OA.A.2',
    } as GeneratedQuestion;
  },
  () => {
    const rate = randInt(2, 5);
    const hours = randInt(3, 8);
    const extra = randInt(3, 10);
    const answer = rate * hours + extra;
    return {
      problemText: `A machine makes ${rate} widgets per hour. It runs for ${hours} hours. A worker then adds ${extra} widgets by hand. How many widgets are there total?`,
      answer,
      hint: `Multiply the rate by hours, then add the extra widgets.`,
      solution: `${rate} × ${hours} = ${rate * hours} from the machine. ${rate * hours} + ${extra} = ${answer} total.`,
      njslsStandard: '5.OA.A.1',
    } as GeneratedQuestion;
  },
];

export function generateMultistepOperations(guided: boolean): GeneratedQuestion {
  const question = pick(templates)();

  if (guided) {
    const nums = question.problemText.match(/\d+/g)!.map(Number);
    return {
      ...question,
      steps: [
        {
          instruction: 'Read the problem. What is the first operation you need to do? Find the result of the first step.',
          expectedAnswer: nums[0] * nums[1] || nums[0] + nums[1],
          feedbackCorrect: 'Great job on the first step!',
          feedbackIncorrect: `Check the problem again. Try calculating with the first two numbers.`,
        },
        {
          instruction: `Now use that result and perform the second operation to find the final answer.`,
          expectedAnswer: question.answer,
          feedbackCorrect: `Excellent! The answer is ${question.answer}!`,
          feedbackIncorrect: `The final answer is ${question.answer}. ${question.solution}`,
        },
      ],
    };
  }
  return question;
}

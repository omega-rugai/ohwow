const yargs = require('yargs');

// Function to solve the right triangle
function triangle(a = null, b = null, c = null, A = null, B = null) {
  if (c) {
    // Hypotenuse given
    if (a) {
      b = Math.sqrt(c * c - a * a);
      A = Math.asin(a / c) * (180 / Math.PI);
      B = 90 - A;
    } else if (b) {
      a = Math.sqrt(c * c - b * b);
      B = Math.asin(b / c) * (180 / Math.PI);
      A = 90 - B;
    } else {
      throw new Error('You must provide at least one side other than the hypotenuse.');
    }
  } else {
    // No hypotenuse given
    if (a && b) {
      c = Math.sqrt(a * a + b * b);
      A = Math.asin(a / c) * (180 / Math.PI);
      B = Math.asin(b / c) * (180 / Math.PI);
    } else if (a && A) {
      c = a / Math.sin(A * (Math.PI / 180));
      b = Math.sqrt(c * c - a * a);
      B = 90 - A;
    } else if (b && B) {
      c = b / Math.sin(B * (Math.PI / 180));
      a = Math.sqrt(c * c - b * b);
      A = 90 - B;
    } else {
      throw new Error('Insufficient parameters provided.');
    }
  }

  return {
    a: a.toFixed(2),
    b: b.toFixed(2),
    c: c.toFixed(2),
    A: A.toFixed(2),
    B: B.toFixed(2),
  };
}

// Parse command line arguments
const argv = yargs
  .option('a', { type: 'number', description: 'Side a' })
  .option('b', { type: 'number', description: 'Side b' })
  .option('c', { type: 'number', description: 'Hypotenuse c' })
  .option('A', { type: 'number', description: 'Angle A in degrees' })
  .option('B', { type: 'number', description: 'Angle B in degrees' })
  .demandOption([], 'Please provide at least two arguments')
  .argv;

try {
  const result = triangle(argv.a, argv.b, argv.c, argv.A, argv.B);
  console.log(result);
} catch (error) {
  console.error(error.message);
}

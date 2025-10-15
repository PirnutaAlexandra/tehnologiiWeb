const fib = (n) => {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return a;
};

if (process.argv.length <= 2) {
  console.log('not enough parameters');
} else {
  const n = parseInt(process.argv[2], 10);
  console.log(fib(n));
}

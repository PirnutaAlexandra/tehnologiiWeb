class Stream {
  #value;
  #nextValue;
  static #count = 0;

  constructor(seed, nextValue) {
    this.#value = seed;              
    this.#nextValue = nextValue;
    Stream.#count++;                 
  }

  get value() {
    return this.#value;
  }

  next() {                          
    this.#value = this.#nextValue(this.#value);
    return this.#value;
  }

  static get count() {
    return Stream.#count;
  }
}

class ConstantStream extends Stream {
  constructor(value) {
    super(value, v => v);
  }
}

class NextIntegerStream extends Stream {
  constructor() {
    super(0, v => v + 1);
  }
}

const constant = new ConstantStream(1);
const nextInteger = new NextIntegerStream();

for (let i = 0; i < 10; i++) {
  console.log(`constant[${i}] = ${constant.next()}`);
  console.log(`nextInteger[${i}] = ${nextInteger.next()}`);
}

console.log(Stream.count);

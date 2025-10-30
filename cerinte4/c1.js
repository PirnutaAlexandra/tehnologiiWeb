 class StreamCrescator{

    #value;

      constructor(seed) {
    if (seed % 2 === 0)
      this.#value = seed;
    else
      this.#value = seed + 1;
  }

    next() {
    const valoareCurenta = this.#value; 
    this.#value += 2;                  
    return valoareCurenta;              
  }
   
  }

  const sir=new StreamCrescator(5);
  for (let i=0; i<40; i++)
    console.log(`${i}->${sir.next()}`)
 

const increaseSalary = (array, number) => {
  if (!Array.isArray(array)) {
    throw new Error("Primul parametru trebuie să fie un array");
  }

  if (typeof number !== "number") {
    throw new Error("Al doilea parametru trebuie să fie un număr");
  }
  const increased = array.map(salary => salary + (salary * number / 100));

  return increased;
};

try {
  console.log(increaseSalary([1200, 10000, 5900], 10));
} catch (err) {
  console.warn(err.message);
}

try {
  console.log(increaseSalary("text", 10));
} catch (err) {
  console.warn(err.message);
}

try {
  console.log(increaseSalary([1200, 10000, 5900], "text"));
} catch (err) {
  console.warn(err.message);
}

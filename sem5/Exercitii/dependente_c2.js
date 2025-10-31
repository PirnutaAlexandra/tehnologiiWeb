import { mkdirSync, writeFileSync } from "fs";
import { rimrafSync } from "rimraf";

mkdirSync("exemplu");
console.log("Directorul 'exemplu' a fost creat.");

writeFileSync("exemplu/test.txt", "Acesta este un fișier de test.");
console.log("Fișierul 'test.txt' a fost creat în folderul 'exemplu'.");

rimrafSync("exemplu");
console.log("Directorul 'exemplu' a fost șters.");

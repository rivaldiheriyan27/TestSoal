let num1 = 0, num2 = 1, nextTerm;
const n = 20;


for (let i = 3; i <= n; i++) {
    nextTerm = num1 + num2;
    console.log(nextTerm);
    num1 = num2;
    num2 = nextTerm;
}

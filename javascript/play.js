const name = 'Max';
let age = 29;
const hashobby = true;

age = 30;

function summarizeUser(useName, userAge, userHasHobby){
    return 'Name is ' + useName + ', age is ' + userAge + ' and the user has hobbies: ' + userHasHobby
};

// Another way to define a function
const summarizeUser2 = (useName, userAge, userHasHobby) => {
    return 'Name is ' + useName + ', age is ' + userAge + ' and the user has hobbies: ' + userHasHobby
};

const add = (a, b) => {
    return a + b;
};

const addOne = a => a + 1;
const addRandom = () => 1 + 1;

console.log(add(1,2))
console.log(summarizeUser(name, age, hashobby));
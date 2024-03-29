// var, function, console.log and template literal 
var name = 'Max';
var age = 29; 
var hasHobbies = true;

console.log(name);
console.log(age);
console.log(hasHobbies);
console.log(`My name is ${name}, my age is ${age}`);

function summarizeUsers(userName, userAge, userHasHobbies){
    return (
        'Name is ' + userName + 
        ', age is ' + userAge + 
        ', and the user has hobbies: ' + userHasHobbies
    );
}

console.log(summarizeUsers(name, age, hasHobbies));

// let VS const
// Arrow functions
function printMe1(text){
    console.log(text)
}

const printMe2 = function (text){
    console.log(text)
}

const printMe3 = (text) => {
    console.log(text)
}

const printMe4 = text => text;

printMe1('Print me No.1');
printMe2('Print me No.2');
printMe3('Print me No.3');
console.log(printMe4('Print me No.4'));
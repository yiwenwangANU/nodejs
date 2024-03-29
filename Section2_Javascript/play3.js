// Object Destructing and Array destructing
const person = {
    name: 'Max',
    age: 29,
    greet1: () => {
        console.log('Hi, my name is '+ this.name); // this refer to global scope
    },
    greet2() {
        console.log('Hi, my name is ' + this.name);
    }
};

console.log(person.name); // Parse too much data

const printName = ({ name, age }) => { // Parse parts of the object with {}
    console.log(name);
    console.log(age);
}
printName(person);

const {name, age} = person;
console.log(name, age);

const hobbies = ['Sports', 'Cookings'];
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);
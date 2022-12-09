const person = {
    name: 'Max',
    age: 29,
    greet() {
        console.log('Hi, I am ' + this.name)
    }
};

const printName = personData => {
    console.log(personData.name);
}

const printName2 = ({name}) => {
    console.log(name);
}
const {name, age} = person
console.log(name, age)

printName(person);
printName2(person)

const hobbies = ['sports', 'cooking'];
const [hobby1, hobby2] = hobbies;
console.log(hobby1)
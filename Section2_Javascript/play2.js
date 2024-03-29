// Object, properties and methods
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

console.log(person);
person.greet1();
person.greet2();

//Array and Array methods
const array1 = ['Sports', 'Cooking', 1, 2, true, person];
array1.push(3);
//console.log(array1)
const array2 = array1.map(hobby => 'Hobby: ' + hobby);

for (let element of array1){
    console.log(element);
}


for (let element of array2){
    console.log(element);
}

// Spread and Rest
const copiedArray1 = array1.slice();
const copiedArray2 = [...array1];
console.log(copiedArray2);

const toArray = (...args) => {
    return args;
}

console.log(toArray(1, 2, 3));
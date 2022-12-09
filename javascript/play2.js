const person = {
    name: 'Max',
    age: 29,
    greet() {
        console.log('Hi, I am ' + this.name)
    }
};
console.log(person)
person.greet();


const hobbies = ['Sports', 'Cooking', 1, true];
for (let hobby of hobbies) {
    console.log(hobby);
}
hobbies.push('programming')
console.log(hobbies)
console.log(hobbies.map(hobby => 'Hobby: ' + hobby))
const copiedArray = hobbies.slice()        // copy the array
const copiedArray2 = [...hobbies]

const toArray = (arg1, arg2, arg3) => {
    return [arg1, arg2, arg3];
};
const toArray2 = (...arg) => {
    return arg;
};
console.log(toArray2(1, 2, 3));


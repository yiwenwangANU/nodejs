// Async Code
setTimeout(() => { // After 1ms run the callback function
    console.log('Async Code')
}, 1);

// Sync code
console.log('Sync Code');

// Callback function to parse a function into the arguments of another function
const myDisplayer = text => {
    console.log(text);
}

const myCalculator = (num1, num2, callback) => {
    let sum = num1 + num2;
    callback(sum);
}

myCalculator(1, 2, myDisplayer)

// Async code with callback
// After 2000ms timer1 is done, after another 3000ms timer2 is done
/* 
const wait = (callback) => {
    setTimeout(() => {
    console.log('Timer1 is Done!');
    callback();
}, 2000);}

const waitTime = () => {
    setTimeout(() => {
        console.log('Timer2 is Done!');
    }, 3000)
}

wait(waitTime) // wait -> timeout 2000ms -> log timer1 is done -> 
               //callback(waitTime) -> timeout 3000ms -> log timer2 is done
*/
//Another way to do this

setTimeout(() => {
    wait(() => {
        console.log('Timer2 is Done')
    });
    console.log('Timer1 is Done');
}, 2000)

const wait = (callback) => {
    setTimeout(() => {
        callback();
    }, 3000)
}
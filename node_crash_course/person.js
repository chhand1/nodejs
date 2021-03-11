class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greeting() {
        console.log(`Hello there, my name is ${this.name} and I am ${this.age} year\'s old....`);
    }
}

module.exports = Person;
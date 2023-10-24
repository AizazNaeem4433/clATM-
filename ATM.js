#!/usr/bin/env node
import inquirer from "inquirer";
import { faker } from '@faker-js/faker';
// user data
const creatuser = () => {
    let users = [];
    for (let i = 0; i < 15; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(10000000 * Math.random() * 90000000),
            balance: 1000000 * i
        };
        users.push(user);
    }
    return users;
};
// ATM machine 
const ATMMAchine = async (users) => {
    const res = await inquirer.prompt({
        type: 'input',
        message: 'write your pin',
        name: "pin"
    });
    //console.log("welcome accunt holder");
    const user = users.find(val => val.pin == res.pin);
    if (user) {
        console.log(`welcome ${user.name}`);
        atmfunc(user);
        return;
    }
    console.log("invalid user pin");
};
//atm function
const atmfunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: 'select Your desire option',
        choices: ['fast cash', 'withdraw', 'your balance', 'exit',]
    });
    console.log(ans);
    // ATM functions 
    if (ans.select == "withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            message: 'enter amount',
            name: "rupee"
        });
        if (amount.rupee > user.balance || amount.rupee > 50000) {
            console.log("Insufficient balance");
        }
        else {
            console.log(`Withdraw amount: ${amount.rupee}`);
            console.log(`Balance: ${user.balance - amount.rupee}`);
        }
    }
    else if (ans.select === "your balance") {
        console.log(`Balance: ${user.balance}`);
    }
    else if (ans.select === "exit") {
        console.log("Thanks for using ATM.");
    }
    if (ans.select == "fast cash") {
        const amount = await inquirer.prompt({
            type: "list",
            name: 'select',
            message: 'Your withdrawl amount is ',
            choices: ['50000', '10000', '20000', '50000']
        });
    }
};
const users = creatuser();
ATMMAchine(users);

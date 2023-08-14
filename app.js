import chalk from "chalk";
import chalkAnimation from "chalk-animation";
// import readline from "readline"
import inquirer from "inquirer"

const resolveAnimations= (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

// event object
class Event {
    constructor(date, startTime, endTime, title, description, location) {
        this.#date = date;
        this.#startTime = startTime;
        this.#endTime = endTime;
        this.#title = title;
        this.#description = description;
        this.#location = location;
    }
    #date = "";
    #startTime = "";
    #endTime = "";
    #title = "";
    #description = "";
    #location = "";
    // getters TODO
    get date() {
        return this.#date;
    }
    get startTime() {
        return this.#startTime;
    }
    get endTime() {
        return this.#endTime;
    }
    get title() {
        return this.#title;
    }
    get description() {
        return this.#description;
    }
    get location() {
        return this.#location;
    }
    
    // setters TODO
     set date(d) {
         this.#date = d;
     }
    set startTime(st) {
        this.#startTime = st;
    }
    set endTime(et) {
        this.#endTime = et;
    }
    set title(t) {
        this.#title = t;
    }
    set description(des) {
        this.#description = des;
    }
    set location(loc) {
        this.#location = loc;
    }
    
}

// reminder object
class Reminder {
    constructor(date, time, title, description) {
        this.date = date;
        this.time = time;
        this.title = title;
        this.description = description;
    }
    #date = "";
    #time = "";
    #title = "";
    #description = "";
    get date() {
        return this.#date;
    }
    get time() {
        return this.#time;
    }
    get title() {
        return this.#title;
    }
    get description() {
        return this.#description;
    }
    // setters
    set date(d) {
        this.#date = d;
    }
    set time(time) {
        this.#time = time;
    }
    set title(titl) {
        this.#title = titl;
    }
    set description(des) {
        this.#description = des;
    }
}

// events object
class Events {
    constructor() {
        this.eventsList = [ ];
    }
    #eventsList = [ ];
    set eventsList(list) {
        this.#eventsList = list;
    }
    get eventsList() {
        return this.#eventsList;
    }
    add(e) {
        this.#eventsList.push(e);
    }
    remove(title) {
        // TODO
    }
    displayEvents(d) {
        let shown = false;
        let currEvent
        let tempDate;
        for (let i = 0; i < this.#eventsList.length; i++) {
            console.log("inside forloop");
            currEvent = this.#eventsList[i];
            console.log(`${currEvent.date}`);
            tempDate = currEvent.date;
            console.log(`${tempDate}`);
            console.log(`${tempDate == d}`);
            if (compare(tempDate, d)) {
                console.log("Inside if condition");
                console.log(`\t\t${currEvent.title}
                ${currEvent.date}
                ${currEvent.startTime}
                ${currEvent.endTime}
                ${currEvent.location}
                ${currEvent.description}
                `);
                shown = true;
            }
        }
        if (!shown) {
            console.log("No events that date.");
        }
    }
}

// reminders object FIXME: update to classs
class Reminders {
    constructor() {
        this.#reminderList = [ ];
    }
    #reminderList = [ ];
    set reminderList(list) {
        this.#reminderList = list;
    }
    get reminderList() {
        return this.#reminderList;
    }
    add(reminder) {
        this.#reminderList.push(reminder);
    };
    remove(title) {
        // TODO
    };
    displayReminder(date) {
        let shown = false;
        let tempDate;
        // TODO: case of emptly reminderLIst
        for (let i = 0; i < this.#reminderList.length; i++) {
            tempDate = this.reminderList[i].date;
            if (compare(tempDate, date)) {
                console.log(`\t\t${this.reminderList[i].title}
                ${this.reminderList[i].date}
                ${this.reminderList[i].time}
                ${this.reminderList[i].description}
                `);
                shown = true;
            }
        }
        if (!shown) {
            console.log("No reminders that date.");
        }
    }
}
const myEvents = new Events();
const myReminders = new Reminders();
// resolve animations after a certain amount of time


// compare function
async function compare(str1, str2) {
    const a = str1;
    const b = str2;
    if (a.localeCompare(b) === 0) {
        return true;
    }
    else {
        return false;
    }
}
// viewChoices() function
async function viewChoices() {    
    // console.log("inside viewChoices()");
    let choice;
    console.log(`What would you like to view:\n\n` +
            `${chalk.bgBlue("1. view events")}\n` + 
            `${chalk.bgBlue("2. view reminders")}\n` +
            `${chalk.bgRed("0. exit")}`);
    const response = await inquirer.prompt({
        name: "choice", 
        type: "input", 
        message: "Option [1 or 2]: "
    });
    const option = response.choice;
    // console.log(choice);
    
    if (option == 1) {
        // events
        let date;
        console.log(`${chalk.bgGreen("What date would you like to see the events for?")}`);
        const eventDate = await inquirer.prompt({
            name: "date", 
            type: "input", 
            message: "Date [MM-DD-YYYY}: "
        });
        date = eventDate.name;
        myEvents.displayEvents(date);
        await startApp();
    }
    else if (option == 2) { // reminders
        let d;
        console.log(`${chalk.bgGreen("What date would you like to see the reminders for?")}`);
        const reminderDate = await inquirer.prompt({
            name: "date", 
            type: "input", 
            message: "Date [MM-DD-YYYY}: "
        });
        d = reminderDate.name;
        myReminders.displayReminder(d);
        await startApp();
    }
    else if (option == 0) {
        console.log("Exiting...");
    }
    else { 
        console.log("Not a valid option.");
        await startApp();
    }
}

// addChoices() function

async function addChoices() {
    let choice;
    console.log(`What would you like to add?\n` + // TODO: finish chalk bgColor. 
                `${chalk.bgYellow("1. event")}\n` + 
                `${chalk.bgYellow("2. reminder")}\n` + 
                `${chalk.bgRed("0. exit")}`);
    const response = await inquirer.prompt({
        name: "option", 
        type: "input", 
        message: "Option [1 or 2]: "
    });
    choice = response.option;
    if (choice == 1) {
        let d, st, et, title, des, loc;
        console.log(`${chalk.bgGreen("Please enter details about the event:")}`);
        const r1 = await inquirer.prompt({
            name: "date", 
            type: "input", 
            message: "Date [MM-DD-YYYY]: "
        })
        d = new String(r1.date);
        const r2 = await inquirer.prompt({
            name: "startTime", 
            type: "input", 
            message: "Start time [12-hour format- HH:MMAM/PM]: "
        })
        st = r2.startTime;
        const r3 = await inquirer.prompt({
            name: "endTime", 
            type: "input", 
            message: "End time [12-hour format- HH:MMAM/PM]: "
        })
        et = r3.endTime;
        const r4 = await inquirer.prompt({
            name: "title", 
            type: "input", 
            message: "Title: "
        })
        title = r4.title;
        const r5 = await inquirer.prompt({
            name: "description", 
            type: "input", 
            message: "Description: "
        })
        des = r5.description;
        const r6 = await inquirer.prompt({
            name: "location", 
            type: "input", 
            message: "Location: "
        })
        loc = r6.location;
        const e = new Event(d, st, et, title, des, loc);
        myEvents.add(e);
        console.log("Event added successfully");
        await startApp();
        
    }
    else if (choice == 2) {
        let dat, tim, titl, desc;
        console.log(`${chalk.bgGreen("Please enter details about the reminder: ")}`);
        const r7 = await inquirer.prompt({
            name: "date", 
            type: "input", 
            message: "Date [MM-DD-YYYY]: "
        })
        dat = r7.date;
        const r8 = await inquirer.prompt({
            name: "time", 
            type: "input", 
            message: "Time [12-hour format- HH:MMAM/PM]: "
        })
        tim = r8.time;
        const r9 = await inquirer.prompt({
            name: "title", 
            type: "input", 
            message: "Title: "
        })
        titl = r9.title;
        const r10 = await inquirer.prompt({
            name: "description", 
            type: "input", 
            message: "Description: "
        })
        desc = r10.description;
        const rem = new Reminder(dat, tim, titl, desc);
        myReminders.add(rem);
        console.log("Reminder added successfully");
        await startApp();
    }
    else if(choice == 0) {
        console.log("Exiting...");
    }
    else {
        console.log("Invalid option.");
        startApp();
    }
}
// startApp() funciton
async function startApp() {
    let choice;
    const welcome = chalkAnimation.rainbow("Welcome to the day scheduler app.\n");
    await resolveAnimations();
    welcome.stop();
    console.log(`What would you like to do:\n\n` +
            `${chalk.bgBlue("1. view events/reminders")}\n` + 
            `${chalk.bgYellow("2. add an event/reminder")}\n` +
            `${chalk.bgRed("0. exit")}`);
    const response = await inquirer.prompt({
        name: "choice", 
        type: "input", 
        message: "Option [1 or 2]: "
    });
    choice = response.choice;
    // console.log(choice);
    
    if (choice == 1) {
        await viewChoices();
    }
    else if (choice == 2) {
        await addChoices();
    }
    else if (choice == 0) {
        console.log("Exiting...");
    }
    else {
        console.log("invalid input. Try again.");
        startApp();
    }
}
// debugging:
class TestClass {
    #squirrel = "gray";
    get squirrel() {
        return this.#squirrel;
    }
    set squirrel(s) {
        this.#squirrel = s;
    }
}
// main funciton

async function main() {
    await startApp();
    // const testSquirrel = new TestClass();
    // testSquirrel.squirrel= "red";
    // console.log(testSquirrel.squirrel);
}
main();
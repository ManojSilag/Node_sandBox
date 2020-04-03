// console.log(process.pid);
// console.log(process.versions.node);

// // console.log(process.argv);

// const [ , , firstName, lastName ] = process.argv;
//  console.log(firstName, lastName);
 


const grab = flag => {
    let indexAfterFlag = process.argv.indexOf(flag) + 1;
    // console.log('dev: indexAfterFlag', indexAfterFlag)
    return process.argv[indexAfterFlag];
};

const greeting = grab("--greeting");
const user = grab('--user');

console.log(greeting);
console.log(user);

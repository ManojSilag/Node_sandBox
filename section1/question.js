// process.stdout.write('Hello    ');
// process.stdout.write('World \n \n ');

const questions = [
  "What is your name?",
  "What would be you?",
  "Your language?"
];

const ask = (i = 0) => {
  process.stdout.write(`\n\n ${questions[i]}`);
  process.stdout.write(` > `);
};

ask();

const answers = [];
process.stdin.on('data', data => {
    answers.push(data.toString().trim())
    // console.log(answers.length, questions.length);
    if(answers.length < questions.length){
        ask(answers.length);
    }else{
        process.exit();
    }
});

process.on('exit', () =>{
    const [name, as, lg] = answers;
    console.log(name, as, lg);
    
})
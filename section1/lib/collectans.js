const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const question = ["what is name?", "what is fname?", "what city?"];

module.exports = (question, done = f =>f) => {
  const answers = [];

  const [first] = question;

  const questionAnswered = (answer) => {
    answers.push(answer);
    if (answers.length < question.length) {
      rl.question(question[answers.length], questionAnswered);
    } else {
      done(answers);
    }
  };

  rl.question(first, questionAnswered);
};

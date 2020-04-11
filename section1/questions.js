const collectAnswers = require("./lib/collectans")
const question = ["what is name?", "what is fname?", "what city?"];

collectAnswers(question,answers => {
    console.log(answers);
    process.exit();
    
})
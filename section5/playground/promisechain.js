require("../src/db/mongoose");
const User = require("../src/models/user");

//Promise Chain
// User.findByIdAndUpdate("5ea52eaa50ece21c7a91132e", { age: 1 })
//   .then((res) => {
//     console.log(res);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((res1) => {
//     console.log(res1);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


//Asyn Await
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age });
  const count = await User.countDocuments({ age: age });
  return count;
};

updateAgeAndCount("5ea52eaa50ece21c7a91132e", 2)
  .then((res1) => {
    console.log(res1);
  })
  .catch((err) => {
    console.log(err);
  });

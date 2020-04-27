require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete('5ea52c9a7fb9c71b83bef923')
//   .then((res) => {
//     console.log(res);
//     return Task.countDocuments({ completed: false});
//   })
//   .then((res1) => {
//     console.log(res1);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const findeTaskAndDelete = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

findeTaskAndDelete("5ea52f2850ece21c7a91132f")
  .then((res1) => {
    console.log(res1);
  })
  .catch((err) => {
    console.log(err);
  });

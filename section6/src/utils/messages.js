const generateMessage = (text) => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};

const generateLocationMessage = (text) => {
  return {
    url: text,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage,
};

module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  next();
};

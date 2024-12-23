const app = require('./src/app');
const { port } = require('./src/configs/app-config')

const finalPort = process.env.PORT || port;

const server = app.listen(finalPort, () => {
  console.log(`Server running on port ${finalPort}`);
});
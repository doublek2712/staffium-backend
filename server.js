const app = require('./src/app');
const { port } = require('./src/configs/app-config')

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
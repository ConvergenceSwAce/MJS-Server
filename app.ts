import express, { Express } from 'express';

const app: Express = express();
const port = 5001;

app.listen(port, () => {
  console.log(`- Server is running at https://localhost:${port}`);
});

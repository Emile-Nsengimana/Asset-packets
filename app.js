import express from 'express';
import route from './src/route/router';

const app = express();
app.use(express.json());
app.use(route);

const port = 4000 || process.env.PORT;
app.listen(port, console.log(`server started on port ${port}`));

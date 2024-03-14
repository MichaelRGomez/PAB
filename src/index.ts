//3rd party libraries
import 'dotenv/config'
import express, { Request, Response} from 'express';

//other imports
import './utils/database/mongo';

const app = express();

//adding cross-site origin requests to the application

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})
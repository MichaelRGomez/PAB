//3rd party libraries
import 'dotenv/config'
import express, { Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

//other imports
import './utils/database/mongo';
import adminRouter from './admin-module/routes';
import publicRouter from './art-module/routes';

const app = express();

//adding cross-site origin requests to the application
//TODO: change the origin to a process.env.FRONT_END_DOMAIN for best practice
app.use(cors({origin: 'https://localhost/5173'}));

//Middleware additions
app.use(bodyParser.json()); //allows us to do req.body.* for request handlers
app.use(cookieParser()); //allows us to add cookies to the request
app.use(bodyParser.urlencoded({extended: true})); //makes it easier to process http requests

//Top level endpoints
app.use('/powers', adminRouter) //TODO: add authentication router here
app.use('/', publicRouter) //TODO: add all the other routers here

//setting up the static folder
app.use('/static', express.static('src/public'));


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})
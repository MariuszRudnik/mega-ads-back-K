import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import './utils/db';
import {pool} from "./utils/db";

const app = express();
app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(json());

// Routes ...
app.use('/', async ( req ,res) =>{
    console.log(pool)

    res.send('dd')
})
app.use(handleError);



app.listen(3001, '0.0.0.0', ()=>{
    console.log('Listening on port http://localhost:3001')
})
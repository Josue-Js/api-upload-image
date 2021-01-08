import express from 'express';
import path from 'path';
import mongoose  from 'mongoose';

import routes from './routes.js';


const app = express();


mongoose.connect(
   'mongodb://localhost:27017/api',
   {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   }
)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    '/files',
     express.static(path.join('./', 'uploads'))
);
app.use(routes)



app.listen(3000)
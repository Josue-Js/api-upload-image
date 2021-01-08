import { Router } from 'express';
import multer from 'multer';

import Post from './model/Post.js';

import multerConfig from './config/multer.js';


const routes = Router()




routes.get('/posts', async (req, res) => {
    
    const post = await Post.find();

    return res.send(post)

})


routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    
    const { originalname: name, size, key,  Location: url = ''} = req.file

    const post = await Post.create({
        name,
        size,
        key,
        url
    })

    res.status(200).json(post)
})



routes.delete('/posts/:id', async (req, res) => {
    
    const id = req.params.id
    const post = await Post.findOneAndDelete(id)

    return res.status(202).send();
})





export default routes
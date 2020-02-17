let Post = require('../models/posts').Post;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();

router.get('/', async(req,resp)=>{
    let posts = await Post.find();
    resp.send(posts);
})

router.post('/', async(req, resp)=>{
    let reqBody = req.body;

   let newPost = new Post({
    id: uniqid(),
    title: reqBody.title,
    date : new Date(),
    description : reqBody.description ,
    text: reqBody.text,
    country: reqBody.country,
    imageURL: reqBody.imageUrl
   })
   
   await newPost.save();
   resp.send('Created');
})

/*let post1 = new Post({
    id : 1,
    title: 'England',
    date: new Date(),
    description: 'String',
    text: 'String',
    country: 'String',
    imageURL: '/images/1.jpg'
});
post1.save();*/

router.delete('/:id', async(req, resp)=>{
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send('Deleted!');
})

module.exports = router;
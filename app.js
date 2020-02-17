let express = require('express');
let app = express();
let mongoose = require('mongoose');
//let multer = require('multer');
let postsRouter = require('./routes/posts')
let usersRouter = require('./routes/users');
let Post = require('./models/posts').Post;
let cookieParser = require('cookie-parser');
let auth = require('./controllers/auth');


app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/strudents', {useNewUrlParser: true});
app.use(express.json());
 

app.use(express.static('public'));
app.use(cookieParser());
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.get('/sight', async (req,resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render('sight', {
       
        imageURL: post.imageURL,
        title: post.title, 
        date: post.date,
        text: post.text
    })
})

app.get('/admin', (req,resp)=>{
    let token = req.cookies['auth_token']; 
    if(token && auth.checkToken(token)){
        resp.render('admin');
    }
    else{
        resp.redirect('/login');

    }
})

app.get('/login',(req,resp)=>{
    resp.render('login');
})
app.listen(3000, ()=> console.log('Listening to 3000....'));





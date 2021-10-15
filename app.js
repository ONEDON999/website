const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const homeStartingContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quia quo? Rerum esse voluptatum in quis, quas nihil? Sunt dolorum quam odit dolorem quibusdam optio pariatur inventore, ipsam eos iure!';

const aboutContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quia quo? Rerum esse voluptatum in quis, quas nihil? Sunt dolorum quam odit dolorem quibusdam optio pariatur inventore, ipsam eos iure!';

const contactContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quia quo? Rerum esse voluptatum in quis, quas nihil? Sunt dolorum quam odit dolorem quibusdam optio pariatur inventore, ipsam eos iure!';

const posts = [];

const app = express();

app.set('view engine','ejs');
  
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.render('home',{
        homeStartingContent: homeStartingContent, 
        posts:posts
    });
    
});


app.get('/about',(req,res)=>{
    res.render('about',{aboutContent:aboutContent});
});

app.get('/contact',(req,res)=>{
    res.render('contact',{contactContent:contactContent});
});


app.get('/compose',(req,res)=>{
    res.render('compose');
});

app.post('/compose',(req,res)=>{
    let item = req.body.postBody;
    let post={
        postTitle:req.body.postTitle,
        postBody:req.body.postBody
    }
 
    posts.push(post);
    
    res.redirect('/');

});


  
console.log(posts)

     

 app.get('/posts/:postName', (req,res)=>{
       let requestedTitle = _.lowerCase(req.params.postName);

       posts.forEach((post)=>{
           let storedTitle = _.lowerCase(post.postTitle);

           if(requestedTitle === storedTitle){
           res.render('post',{
            postTitle: post.postTitle,
            postBody: post.postBody
           }); 
        }
       });     
 });


app.listen(3000, ()=>{
    console.log("Server is listen to port 3000");
});
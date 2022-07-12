const express = require('express');
//const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/blog-angular'));
app.get('/*',(req,resp)=>{
    resp.sendFile(path.join(__dirname+'/dist/blog-angular/index.html'));
});

app.listen(process.env.PORT || 5000);

// app.use(express.static(__dirname+'/dist/ng-blog'));
// app.get('/',function(req,res){


// app.use(express.static('./dist/blogAngular'));
// app.get('/', (req, res) =>
//   res.sendFile('index.html', { roo: 'dist/blogAngular' }),
// );

// app.listen(process.PORT || 8080)

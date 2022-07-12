const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/blogAngular'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/blogAngular/index.html'));
});

app.listen(process.env.PORT || 8080);

// app.use(express.static(__dirname+'/dist/ng-blog'));
// app.get('/',function(req,res){


// app.use(express.static('./dist/blogAngular'));
// app.get('/', (req, res) =>
//   res.sendFile('index.html', { roo: 'dist/blogAngular' }),
// );

// app.listen(process.PORT || 8080)

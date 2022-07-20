const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/blog-angular'));
app.get('/*',(req,resp)=>{
    resp.sendFile(path.join(__dirname+'/dist/blog-angular/index.html'));
});

app.listen(process.env.PORT || 8080);

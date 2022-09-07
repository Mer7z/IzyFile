const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const ejs = require('ejs');

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, path.basename(file.originalname, path.extname(file.originalname))+ '-' + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({storage});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//Get index//
app.get('/', (req, res) =>{
  res.render('index')
});

app.post('/', upload.single('file'), (req, res)=>{
  const fileName = path.basename(req.file.path) 
  res.send(fileName)
});

//Get File//
app.get('/files/:fileName', (req, res)=>{
  let param = req.params.fileName
  let options = {
    root: path.join(__dirname + '/uploads')
  }
  res.sendFile(param, options, (err)=>{
    if(err){
      res.render('notfound', {name: param})
    }
  })
  
});

//Get Wrong Address//
app.get('/*', (req, res) =>{
  res.redirect('/')
});

const PORT = 3000;

app.listen(PORT, ()=>console.log('Server started on port ' + PORT));

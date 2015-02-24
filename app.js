var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    request = require('request'),
    path = require('path'),
    app = express();

var admin_username = 'admin'
var admin_password = 'password'

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname + '/public/signup'));
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.sendFile('index.html',{'root': __dirname + '/public/index'});
});

app.get('/signIn',function(req,res){
    res.sendFile('signin.html',{'root': __dirname + '/public/signin'});
});


app.get('/signUp',function(req,res){
    res.render('signup',{error:'','root':__dirname + '/public/signup'})
});

app.post('/register',function(req,resp){
    var _firstName = req.body.inputFirstName;
    var _lastName = req.body.inputLastName;
    var _username = req.body.inputUsername;
    var _password = req.body.inputPassword;
    var _phone = req.body.inputPhone;

    var options = {
      url: 'http://127.0.0.1:5000/user/',
      method: 'POST',
      auth: {
        user: admin_username,
        password: admin_password
      },
      formData: {
          firstname: _firstName,
          lastname: _lastName,
          username: _username,
          password: _password,
          phone: _phone
      }
    }

    request(options, function (err, res, body){
        if(err){
            return resp.render('signup',{error:err})
        }
        var result = JSON.parse(body)
        if(result._status=='ERR'){
            if(result._error.code=='400'){
              return resp.render('signup',{error:'Username Already Exists!'})  
            }
            return resp.render('signup',{error:result._issues.username})
        }
        else{
            console.log('All good');
            resp.redirect('/signIn');
        }
    })


});


app.listen(3001)

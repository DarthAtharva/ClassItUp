const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const nodemailer = require('nodemailer');


require('dotenv').config()

const User = require('./models/user.js');

const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);
const jsonwebtokenSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(cors({

    credentials: true,
    origin: process.env.FRONTEND_URL,

}));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT} PORT`));

mongoose.connect(process.env.MONGO_URL);

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASS, 
    }
});

app.get('/test', (req, res) =>{
    res.json('test ok');
});

app.get('/atharva', (req, res) =>{
    res.json('Hello There');
});

app.post('/register', async(req, res) => {

    const {name, email, password} = req.body;
    

    try{

        const userDocument = await User.create({
        
            name,
            email,
            password : bcrypt.hashSync(password, bcryptSalt),
    
        });

        res.json(userDocument);

    }catch (duplicateMailError){

        res.status(422).json(duplicateMailError);

    }

    
});

app.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const userDocument = await User.findOne({ email });

    if (userDocument){
    
        if(bcrypt.compareSync(password, userDocument.password)) {

            jsonwebtoken.sign({
                email: userDocument.email, 
                id: userDocument._id, 
             
            }, jsonwebtokenSecret, {}, (error, token)=>{

                if (error) {
                    res.status(500).json('Error signing token');
                } else {
                    
                    res.cookie('token', token, { httpOnly: true, secure: true }).json(userDocument);
                }

            });

        }else{

            res.status(401).json('Password not matched');

        }

    } else {

        res.status(404).json('Email not registered');

    }
});

app.get('/profile', (req, res) => {

    const {token} = req.cookies;

    if(token){

        jsonwebtoken.verify(token, jsonwebtokenSecret, {}, async (error, userData) => {

            if(error) throw error;
        
            const {name, email, _id, role} = await User.findById(userData.id);
            res.json( {name, email, _id, role});

        });

    }else{

        res.json(null);

    }

});


//route for getting userdata with role
app.get('/getAllUsers', (req, res) => {

    const {token} = req.cookies;

    if(token){

        jsonwebtoken.verify(token, jsonwebtokenSecret, {}, async (error, userData) => {

            if(error) throw error;
        
            const users = await User.find();
            res.json(users);

        });

    }else{

        res.json(null);

    }

});


app.get('/getUser/:id', (req, res) => {

    const {token} = req.cookies;
    const {id} = req.params;

    if(token){

        jsonwebtoken.verify(token, jsonwebtokenSecret, {}, async (error, userData) => {

            if(error) throw error;
        
            const users = await User.findById(id);
            res.json(users);

        });

    }else{

        res.json(null);

    }

});

//route for updating userdata by id for superadmin
app.put('/updateUser/:id',(req,res)=>{
    const {id} = req.params;
    const {token} = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const {

        name,
        email,
        role

    } = req.body;
    
    jsonwebtoken.verify(token, jsonwebtokenSecret, {}, async (error, userData) => {
        
        if(error) throw error;

        const userDoc = await User.findById(id);
    
        {

            userDoc.set({

                name, email, role

            });

            await userDoc.save();
            res.json('ok');

        }

    });
    
})

app.post('/logout', (req, res) => {

    res.clearCookie('token').json({ message: 'Logged out successfully' });

});

app.post('/upload-by-link', async (req, res) => {

    const { link } = req.body;

    console.log('Received link:', link); 

    if (!link) {
        return res.status(400).json({ error: 'Link is required' });
    }

    const newName = 'photo' + Date.now() + '.jpg';

    try {
        
        await imageDownloader.image({
            url: link,
            dest: __dirname + '/uploads/' + newName,
        });

        res.json(newName);

    } catch (error) {

        console.error('Error downloading image:', error);
        res.status(500).json({ error: 'Failed to fetch image' });

    }
});

const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 10), (req, res) => {

    const uploadedFiles = [];

    req.files.forEach(file => {
        const { path, originalname } = file;
        const ext = originalname.split('.').pop();
        const newPath = `${path}.${ext}`;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads', ''));
    });


    res.json(uploadedFiles);

});
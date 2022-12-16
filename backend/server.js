require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const ratRoutes = require('./routes/rats');

// express app
const app =  express();

app.use(express.json());

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/rats', ratRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Listening on port ' + process.env.PORT)
        });
    })




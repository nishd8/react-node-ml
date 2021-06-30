const { request, response } = require("express")
const csv = require('csv-parser')
const fs = require('fs')
const {spawn} = require('child_process');

const getPassengerIds = (request,response) =>{
    const results = [];

    fs.createReadStream('../python/titanic.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data.PassengerId))
    .on('end', () => {
        response.status(200).json(results)
    });
}

const getPrediction = (request,response) =>{
    var payload = request.body['args']
    var dataToSend;
    const python = spawn('python3', ['../python/prediction.py' , payload,'../python/model_joblib']);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        response.send(dataToSend)
    });
    python.stderr.on('data', function(data) {
        response.send('Erorr occured' + data.toString())
    });
}

module.exports = {
    getPassengerIds,
    getPrediction
}
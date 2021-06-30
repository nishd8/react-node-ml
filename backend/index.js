const express = require('express');
const api = require('./api')
const app = express();
const port = 5000;
var cors = require('cors')



app.use(express.json());
app.use(cors())

app.listen(port, () => {
  console.log(`Titanic Predictor API running on port : ${port}.`);
});

//app.get('/',api.apiDescription)
app.get('/v1/getPassengerIds',api.getPassengerIds)
app.post('/v1/getPred',api.getPrediction)
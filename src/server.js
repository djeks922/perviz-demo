const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: '*'
  }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/.netlify/functions/api', routes);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
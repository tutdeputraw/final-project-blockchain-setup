const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


const app = express();
app.use(bodyParser.json());
app.use('/api', routes)


const PORT = 4000;
app.listen(PORT, () => {
    console.log("app is running on port ", PORT);
});
const express = require('express');
const bodyParser = require('body-parser');
const helper = require('./app/helper')


const { registerUser } = require('./app/registerUser');
const { registerAdmin } = require('./app/registerAdmin');
const { query } = require('./app/query');
const { invoke } = require('./app/invoke');


const app = express();
app.use(bodyParser.json());


app.post('/api/enroll-admin', async (req, res) => {
    const organizationName = req.body.organizationName;

    console.debug('End point : /api/enroll-admin');
    console.debug('Org name  : ' + organizationName);

    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const response = await registerAdmin(organizationName);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json({ success: false, message: response });
    }
});


app.post('/api/enroll-user', async (req, res) => {
    const username = req.body.username;
    const organizationName = req.body.organizationName;

    console.debug('End point : /api/enroll-user');
    console.debug('User name : ' + username);
    console.debug('Org name  : ' + organizationName);

    if (!username) {
        res.json(helper.getErrorMessage('\'username\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const response = await registerUser(username, organizationName);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json({ success: false, message: response });
    }
});


app.post('/api/signin', async (req, res) => { /** return api token */ });


app.get('/api/query', async (req, res) => {
    const username = req.body.username;
    const contractName = req.body.contractName;
    const functionName = req.body.functionName;
    const organizationName = req.body.organizationName;

    console.debug('End point : /api/query');
    console.debug('User name : ' + username);
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + contractName);
    console.debug('Organization name  : ' + organizationName);

    if (!username) {
        res.json(helper.getErrorMessage('\'username\''));
        return;
    }
    if (!contractName) {
        res.json(helper.getErrorMessage('\'contractName\''));
        return;
    }
    if (!functionName) {
        res.json(helper.getErrorMessage('\'functionName\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const response = await query(organizationName, username, contractName, functionName);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
});


app.post('/api/invoke', async (req, res) => {
    const organizationName = req.body.organizationName;
    const username = req.body.username;
    const contractName = req.body.contractName;
    const functionName = req.body.functionName;
    const functionArgs = req.body.functionArgs;

    console.debug('End point : /api/invoke');
    console.debug('User name : ' + username);
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + contractName);
    console.debug('Function args  : ' + functionArgs);
    console.debug('Organization name  : ' + organizationName);

    if (!username) {
        res.json(helper.getErrorMessage('\'username\''));
        return;
    }
    if (!contractName) {
        res.json(helper.getErrorMessage('\'contractName\''));
        return;
    }
    if (!functionName) {
        res.json(helper.getErrorMessage('\'functionName\''));
        return;
    }
    if (!functionArgs) {
        res.json(helper.getErrorMessage('\'functionArgs\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const response = await invoke(organizationName, username, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json({ success: false, message: response });
    }
});


const PORT = 4000;
app.listen(PORT, () => {
    console.log("app is running on port ", PORT);
});

const ReceiverService = require('./infraestructure/rabbitmqReceiverService');
const express = require('express');
const authRoutes = require('./infraestructure/routes/authRoute');
const homeRoutes = require('./infraestructure/routes/homeRoute');
const tagsRoutes = require('./infraestructure/routes/tagsRoute');
const path = require('path');

const app = express();
const port = 3000;


require('./infraestructure/configuration/mongooseConfiguration')();
require('./infraestructure/configuration/expressConfiguration')(app);
require('./infraestructure/configuration/passportConfiguration')();
app.set('views', path.join(__dirname, '/templates'));

const receiver = new ReceiverService();
receiver.on((message) => {
    console.log(message);

});

app.use(authRoutes);
app.use(homeRoutes);
app.use(tagsRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

process.on('uncaughtException', (err, origin) => {
    console.log('Error', err);
})

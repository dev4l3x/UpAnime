
const receiverService = require('./infraestructure/services/rabbitmqReceiverService');
const getUserRepo = require('./infraestructure/repositories/userRepository');

const express = require('express');
const authRoutes = require('./api/routes/authRoute');
const homeRoutes = require('./api/routes/homeRoute');
const tagsRoutes = require('./api/routes/tagsRoute');
const config = require('./infraestructure/configuration-manager');
const path = require('path');

const app = express();
const port = config.getConfig('EXPRESS_PORT') ?? 3000;


require('./api/configuration/mongooseConfiguration')();
require('./api/configuration/expressConfiguration')(app);
require('./api/configuration/passportConfiguration')();

app.set('views', path.join(__dirname, '/templates'));

const createNotifier = require('./core/application_services/notifyAnimesToUsers');
const getFormatter = require('./core/application_services/htmlFormatterService');

const notifier = createNotifier({userRepository: getUserRepo(), formatter: getFormatter()});

app.use(authRoutes);
app.use(homeRoutes);
app.use(tagsRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

receiverService.on((message) => {
    console.log(message);
    notifier.notify(JSON.parse(message)).then(result => {
        console.log(result);
    });
});

// process.on('uncaughtException', (err, origin) => {
//     console.log('Error', err);
// })

const Scheduler = require('redis-scheduler');
const LOGGER = require('./logger');

const scheduler = new Scheduler({ host: 'redis', port: 6379 });

function scheduleExpiryCallback(key, expiry, cb) {
    scheduler.cancel({ key }, () => {
        console.log('canceled');
        scheduler.schedule({
            key,
            expire: expiry,
            // eslint-disable-next-line no-shadow
            handler: cb,
        }, (err) => {
            if (err) {
                LOGGER.error(`Error publishing ${key}`, err);
            }
        });
    });
}

module.exports = { scheduleExpiryCallback };

const path = require('path');

module.exports = {
    apps: [
        {
            env: {
                NODE_ENV: 'development',
                ignore_watch: ['public', 'node_modules', '.git'],
                node_args: ['--inspect=7001 --trace-deprecation'],
                watch: path.resolve(__dirname, ''),
            },
            name: 'HT',
            script: './bin/www',
        },
    ],
};

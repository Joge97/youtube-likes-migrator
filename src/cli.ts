#!/usr/bin/env node

import * as commander from 'commander';

import {YoutubeAPI} from './youtube-api';

const pkg = require('../package.json');


commander.version(pkg.version);

commander
    .arguments('<path>')
    .action(async path => {
        const keys = require(path);
        const youtubeAPI = new YoutubeAPI();

        try {
            await youtubeAPI.init(keys.web.client_id, keys.web.client_secret, keys.web.redirect_uris[0]);
            // TODO migrate likes
            // 1. get channels from old account
            // 2. get likes playlist from old account
            // 3. like 50 (this is the limit) videos each day with the new account
            console.log(`Successfully migrated likes`);
            process.exit(0);
        } catch(error) {
            console.log(`Error while migrating likes: ${error}`);
            process.exit(1);
        }
    });

commander.parse(process.argv);

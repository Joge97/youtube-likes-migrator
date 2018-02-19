import {OAuth2Client} from 'google-auth-library';
import * as http from 'http';
import opn = require('opn');
import * as querystring from 'querystring';
import * as url from 'url';


export class Auth {
    public static getOAuth2Client(clientId: string,
                                  clientSecret: string,
                                  redirectUri: string,
                                  scope: string): Promise<OAuth2Client> {
        return new Promise((resolve, reject) => {
            const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);
            const parsedRedirectUri = url.parse(redirectUri);
            const port = parseInt(parsedRedirectUri.port || '80', 10);
            const pathname = parsedRedirectUri.pathname || '/callback';
            const server = http.createServer(async (req, res) => {
                if(req.url.indexOf(pathname) > -1) {
                    res.end('Authentication successful! Please return to the console.');
                    server.close();
                    const code: string = querystring.parse(url.parse(req.url).query).code as string;
                    const response = await oAuth2Client.getToken(code);
                    oAuth2Client.setCredentials(response.tokens);
                    resolve(oAuth2Client);
                }
            }).listen(port, async () => {
                try {
                    await opn(oAuth2Client.generateAuthUrl({access_type: 'offline', scope}));
                } catch(error) {
                    reject(error);
                }
            });
        });
    }
}

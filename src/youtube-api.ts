import {google} from 'googleapis';

import {Auth} from './auth';


export class YoutubeAPI {
    private apiEndpoint: any;

    public async init(clientId: string,
                      clientSecret: string,
                      redirectUri: string,
                      scope: string = 'https://www.googleapis.com/auth/youtube'): Promise<void> {
        this.apiEndpoint = google.youtube({
            version: 'v3',
            auth: await Auth.getOAuth2Client(clientId, clientSecret, redirectUri, scope)
        });
    }

    public getCurrentUserPlaylists(): Promise<any[]> {
        return this.apiEndpoint.playlists.list({
            part: 'snippet,contentDetails',
            mine: true
        });
    }
}

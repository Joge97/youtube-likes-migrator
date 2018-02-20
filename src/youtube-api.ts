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

    public getCurrentUserChannels(): Promise<any[]> {
        return this.apiEndpoint.channels.list({
            part: 'contentDetail',
            mine: true
        });
    }

    public getCurrentUserPlaylists(): Promise<any[]> {
        return this.apiEndpoint.playlists.list({
            part: 'snippet,contentDetails',
            mine: true
        });
    }

    public getCurrentUserPlaylistItems(playlistId: string): Promise<any[]> {
        return this.apiEndpoint.playlistItems.list({
            part: 'snippet',
            playlistId
        });
    }

    public likeVideo(id: string): Promise<any> {
        return this.apiEndpoint.videos.rate({
            rating: 'like',
            id
        });
    }

    public dislikeVideo(id: string): Promise<any> {
        return this.apiEndpoint.videos.rate({
            rating: 'dislike',
            id
        });
    }

    public unrateVideo(id: string): Promise<any> {
        return this.apiEndpoint.videos.rate({
            rating: 'none',
            id
        });
    }
}

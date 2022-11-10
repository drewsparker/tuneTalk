const SpotifyWebApi = require('spotify-web-api-node');
const Express = require('express');
const Url = require('url');

const app = Express();
const port = 3000;

const credentials = {
  clientId: '7b62c8f08caf4c51a635f19b50f8f6db',
  clientSecret: '57f1d85905924ae8af50cbf0c4de4ec7',
  redirectUri: 'http://127.0.0.1:3000/callback',
};

var spotifyApi = new SpotifyWebApi(credentials);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/login', (req, res) => {
  res.redirect(Url.format({
    pathname: 'https://accounts.spotify.com/authorize',
    query: {
      'client_id': credentials.clientId,
      'response_type': 'code',
      'redirect_uri': 'http://127.0.0.1:3000/callback',
      'scope': 'user-read-private user-read-email'
    }
  }));
});

app.get('/callback', (req, res) => {
  const code = req.query.code;

  spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      const accessToken = data.body['access_token'];
      const refreshToken = data.body['refresh_token'];

      console.log('The access token is ' + accessToken);
      console.log('The refresh token is ' + refreshToken);

      storeTokens(accessToken, refreshToken);

      res.redirect('/user-details');
    });
});

// example page printing user details
app.get('/user-details', (req, res) => {
  getUserDetails().then((data) => {
    res.send(JSON.stringify(data));
    // TODO: store user info if needed
  });
});

function storeTokens(accessToken, refreshToken) {
  spotifyApi.setAccessToken(accessToken);

  // TODO: store tokens in cookies - keep for 1 hour only

  res.cookie('Spotify-access-token', accessToken, {maxAge: 3600000});

}

// any setup tasks
function init() {
  // TODO: get stored token from cookie, if available call spotifyApi.setAccessToken
}

// returns Promise with user data - access via `.then`
function getUserDetails() {
  return spotifyApi.getMe();
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

init();
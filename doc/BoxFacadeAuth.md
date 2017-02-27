# Authentication

Box Facade [base paths](BoxFacadeBasePaths.md)

While [Box uses](https://docs.box.com/reference#oauth-2-overview) `https://api.box.com` for authentification and `https://account.box.com` for login, Box Facade use single domain (see domains above).

## Authorize

`GET /api/oauth2/authorize`

Query parameters:

| Parameret | Description | Required |
| --- | --- | --- |
| redirect_uri | This is the URL that we will redirect to after the user has allowed or denied your request to access their account. | yes |
| client_id | API key that was provided for registered application. | yes |
| response_type | This must be set to `code` for this flow. | yes |
| state | Opaque value used by the client to maintain state between the request and callback. The authorization server includes this value when redirecting the user-agent back to the client. The parameter can be used for preventing cross-site request forgery | no |

**NOTE** that Box's `scope` parameter is not used, the scope is set to `Egnyte.filesystem`.

Example request:

`https://<BASE_PATH>/box/api/oauth2/authorize?redirect_uri=https://example.org&client_id=<CLIENT_ID>&response_type=code&state=<STATE_STRING>`

## Token

`POST /oauth2/token`

Body parameters (urlencoded):

| Parameret | Description | Required |
| --- | --- | --- |
| code | Authorization code received from the `GET /box/api/oauth2` | yes |
| client_id | API key that was provided for registered application. | yes |
| client_secret | Client secret associated with you client id. | yes |
| grant_type | Should be `authorization_code` | yes |

Example response:

```json
{
  "access_token": "5cc3235cb8ebb58e4ca4274bf3bdbb5523d41efd",
  "expires_in": 3600,
  "refresh_token": "ef9b6727da40d6eb6f345c7392bb843169b64c23d2706dd7c9bfce15c291d001",
  "restricted_to": [],
  "token_type": "bearer",
  "base_url": "https://integrations-staging.qa-egnyte.com/box"
}
```

**NOTE** that unlike Box, there is additional `base_url` field in the response.

Response status codes:

* 200 - success
* 400 - 'invalid_grant'
* 401 - 'invalid_client'

## Refresh token

After access token gets expired it is possible to use refresh token to generate new one.

`POST /oauth2/token`

Body parameters (urlencoded):

| Parameret | Description | Required |
| --- | --- | --- |
| refresh_token | refresh token obtained from exachanging code for token of from previous refresh | yes |
| client_id | API key that was provided for registered application. | yes |
| client_secret | Client secret associated with you client id. | yes |
| grant_type | Should be `refresh_token` | yes |

Example response:

```json
{
  "access_token": "dd11a2ee570e207e09b72f212b12f513f006e1f8",
  "expires_in": 3600,
  "refresh_token": "509d351e15ba6d7f11d23761a2297347220e537caffa286ede6fab40c8024965",
  "restricted_to": [],
  "token_type": "bearer",
  "base_url": "https://integrations-staging.qa-egnyte.com/box"
}
```

**NOTE** that unlike Box, there is additional `base_url` field in the response.

Response status codes:

* 200 - success
* 400 - 'invalid_grant'
* 400 - "Refresh token does not match"
* 400 - "Client secret does not match"

## Revoke

This request will revoke access token.

`POST /oauth2/revoke`

Body parameters (urlencoded):

| Parameret | Description | Required |
| --- | --- | --- |
| token | access token or refresh token obtained from exachanging authorization code for token of from previous refresh | yes |
| client_id | API key that was provided for registered application. | yes |
| client_secret | Client secret associated with you client id. | yes |

Response status codes:

* 200 - success
* 400 - 'invalid_token'

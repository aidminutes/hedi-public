# HEDI auth module

handles oauth2 login flow via next-auth

token refresh is not yet implemented by the lib, keep an eye open, might change in future

## requirements
* `.env.local` contains some constants and secrets:
  * cms oauth id and secret
  * next-auth jwt secret signing the token which is used to pass around the user session (could be encrypted if we want)
* `next-auth/react Provider` react context has to be available to subcomponents

# drupal settings
__oauth2 server__ module is required

due to its dependency on `entity reference` module, which has been moved to drupal core, a recent version of drush is required in order to get it enabled (tested with ^10.3)

* drupal oauth2 permissions: Use OAuth2 Server: __anonymous user__ and __authenticated user__ 
* add server:
  * `Use OpenID Connect`
  * Enabled grant types: `Authorization code`, `Refresh token`, `User credentials`
  * __uncheck__ Advanced settings `Require exact redirect uri`
* add client:
  * __Client ID__ is the one used in next-auth's env settings
  * __Client secret__ ...
  * __Redirect URIs__ for now:
    * `http://localhost:3000/api/auth/callback/hediauth`
    * `http://localhost:3000/`
  * `Automatically authorize this client`

## available exports
there are no direct exports, since one needs to separate between serverside and clientside

one index exporting them all breaks next

### server
* __withAuth:__ sets up NextAuth api handler (in `/api/auth[...nextauth].ts`)
* __getUserAuthHeader:__ returns the required oauth login header, if available
* __getUserAuth:__ returns userinfo and tokens
* __getServiceAuth:__ log in as service user, doesn't store credentials into session, server side only use
* __getAuthHeader:__ returnes an http auth header (csrf + auth bearer) given an IAuth structure

### client
* __getUser:__ hook to retrieve username and email

### demo
* `sandbox/auth` in browser
* `/api/sandbox/authDemo` serverside api example
* `sandbox/apiAuth` demo service api only login
* `/api/sandbox/apiAuthDemo` demo service api only login


## TODOs
* login flow error handling
* proper login component
* find a way to provide the login mask as modal or subcomponent instead of an indiviual page
* make login translatable
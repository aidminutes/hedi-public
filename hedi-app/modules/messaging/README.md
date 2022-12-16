# HEDI Messaging module

implements matrix chat
connecting to the synapse server

## Architecture

messaging can only be provided for users with an active login.
the usage is also restricted to certain roles and conditions.
furthermore matrix could be unsupported on very old browsers.
therefore the conditional loading is desirable.

client app base implements a **MessagingContext** implementing properties and features
interleaved with other parts of the app (notification, calling,...) and eventually the matrix client

messaging core components use another **MatrixClientContext** which asserts a loaded client and a valid user session

## SSO issue

OAuth2 Server module (drupal) and Synapse (matrix server) both implement OAuth2+OpenID Single Sign On mechanisms.
Still the SSO login flow is implemented with handwritten single requests,
matrix server configurations are tweaked
and drupal module is patched in order to run as required.

### Reasons

#### 1. OAuth2 Server module

is not OpenID 1.0 spec compliant, missing to provide an encryption token

- due to this flaw, synapse server cannot communicate via standard OpenID
- all endpoints have to be configured manually
- since synapse cannot request the scope 'openid', oauth2 won't give access to the 'userinfo' endpoint  
  which is solved by requesting a dummy scope 'openid_hedi' which gets substituted back to 'openid' on oauth before permission check

#### 2. SSO flow server-side

standard SSO flow involves browser redirects but hedi can handle this opaquely on server-side only, since the user is authenticated there.

- nextjs server-side is stateless due to its architecture to serve all endpoints as lamdas
- SSO callback from synapse to drupal requires drupal to have a logged in user or it will present a login page
- SSO callback location does not accept OAuth2 access_token unlike the graphql/rest apis
- a sign in has to be triggered before SSO, grabbing the session cookie serverside
- node(js)-fetch does not handle set-cookie directives -> drupal and synapse cookies have to be set manually on the correct request

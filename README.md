# mastodon-response-check
Mastodon response check using puppeter

## how to run

### first time only 

```
npm install
```

### else

set environment value below

* login_url
mastodon login url. ( example: https://mastodon.example.com/auth/sign_in )

* USERNAME
* PASSWORD

mastodon username and password.

### commandline example

```
USERNAME=<mail addr>; PASSWORD=<your password>; LOGIN_URL=http://mastodon.example.com/auth/sign_in node index.js
```

Response time (ms) output to stdout.
All other messages are output to stderr.
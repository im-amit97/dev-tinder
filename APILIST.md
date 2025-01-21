# Dev Tinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
    interested, ignored
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userConncetion
- GET user/connection
- GET user/requests
- GET user/feed

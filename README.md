# Dev Tinder BE #

## Express
    - app.use('/path', (req, res, next) => {})
    - app.get()

## Routers & Middlewares
    - custom middlewares
    - route handlers

## Mongoose
    - mongoose.connect(clusterUrl)
    - Create Schema
    - Create Model
    - Call the modal instace
    - modal.save() to DB
    - validations on schema (required, trim, maxLength, min, custom validate function, etc)
    - API level validation before db calls (Data Sanitization)
    - Used mongoose.methods.methodName = function () {} for utils

## Validation & Encryption
    - installed validators package (validate email, urls, passwords)
    - bcrypt for encryption of password

## Authentication (JWT)
    Cookie : install cookie-parser to parse/read the cookies (provided by express)
    jsonwebtoken: sign and verify the token with secret.

## Express Router
    express.Router();
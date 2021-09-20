# API-ADMIN-ESHOP

This is part of eshop system. This project is the backend api for admin cms.

## HOW TO RUN

- Clone the project
- Run `npm install`
- Run `npm i nodemon` if you dont have nodemon installed in your system
- Run `npm run dev`

## APIS

All the api will follow the following path `${rootUrl/api/v1}` ie. http://localhost

### User API

All user api will follow the following endpoint `${rootUrl/api/v1/user}`

| #   | API                   | METHOD | DESCRIPTION                                                                 |
| --- | --------------------- | ------ | --------------------------------------------------------------------------- |
| 1   | `/`                   | POST   | Expect the user info object and create user in DB and return status message |
| 1   | `/email-verification` | POST   | Expect the user info object and check if the link valid                     |

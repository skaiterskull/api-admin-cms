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
| 2   | `/email-verification` | POST   | Expect the user info object and check if the link valid                     |
| 3   | `/login`              | POST   | Expect an user info {email, password} and proceed to private route          |

### Category API

All user api will follow the following endpoint `${rootUrl/api/v1/category}`

| #   | API       | METHOD | DESCRIPTION                                                                                        |
| --- | --------- | ------ | -------------------------------------------------------------------------------------------------- |
| 1   | `/`       | POST   | Expects the category info object and creates category in DB and return stat message                |
| 2   | `/`       | GET    | Fetching all the data from category table                                                          |
| 2   | `/`       | PATCH  | Expect the category info object {\_id, name, parentCat} and based on that will update the database |
| 2   | `/params` | DELETE | Require the category info object {\_id} and pass it as params for deleting the data                |

### Token API

All token api will follow the following endpoint `${rootUrl/api/v1/token}`

| #   | API | METHOD | DESCRIPTION                                                                          |
| --- | --- | ------ | ------------------------------------------------------------------------------------ |
| 1   | `/` | GET    | Expect the Authorization data as headers from frontend for authorization of the user |

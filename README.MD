# API-ADMIN-ESHOP

This is part of eshop system. This project is the backend api for admin cms.

## HOW TO RUN

- Clone the project
- Run `npm install`
- Run `npm i nodemon` if you dont have nodemon installed in your system
- Run `npm run dev`

## APIS

All the api will follow the following path `${rootUrl/api/v1}` ie. http://localhost

All the private apis endpoint only be accessible if authorization header is included.

### User API

All user api will follow the following endpoint `${rootUrl/api/v1/user}`.

| #   | API                   | METHOD | DESCRIPTION                                                                 | isPrivate |
| --- | --------------------- | ------ | --------------------------------------------------------------------------- | --------- |
| 1   | `/`                   | POST   | Expect the user info object and create user in DB and return status message | Yes       |
| 2   | `/email-verification` | POST   | Expect the user info object and check if the link valid                     | No        |
| 3   | `/login`              | POST   | Expect an user info {email, password} and proceed to private route          | No        |
| 4   | `/`                   | PUT    | Expect an user info object and then update it on database                   | Yes       |
| 5   | `/`                   | PATCH  | Expect an current password and new password to update the password          | Yes       |
| 6   | `/reset-password`     | PATCH  | Expect otp, new password, and email to reset password                       | No        |

### Category API

All user api will follow the following endpoint `${rootUrl/api/v1/category}`

| #   | API       | METHOD | DESCRIPTION                                                                                        | isPrivate |
| --- | --------- | ------ | -------------------------------------------------------------------------------------------------- | --------- |
| 1   | `/`       | POST   | Expects the category info object and creates category in DB and return stat message                | Yes       |
| 2   | `/`       | GET    | Fetching all the data from category table                                                          | Yes       |
| 2   | `/`       | PATCH  | Expect the category info object {\_id, name, parentCat} and based on that will update the database | Yes       |
| 2   | `/params` | DELETE | Require the category info object {\_id} and pass it as params for deleting the data                | Yes       |

### Token API

All token api will follow the following endpoint `${rootUrl/api/v1/token}`

| #   | API | METHOD | DESCRIPTION                                                                          | isPrivate |
| --- | --- | ------ | ------------------------------------------------------------------------------------ | --------- |
| 1   | `/` | GET    | Expect the Authorization data as headers from frontend for authorization of the user | No        |
| 2   | `/` | POST   | Expect an email and OTP will be sent to the email                                    | No        |

### Product API

All token api will follow the following endpoint `${rootUrl/api/v1/product}`

| #   | API       | METHOD | DESCRIPTION                                                                     |
| --- | --------- | ------ | ------------------------------------------------------------------------------- |
| 1   | `/:slug?` | GET    | Fetch data, if slug provided will fetch data by slug, otherwise fetch all datas |
| 2   | `/`       | POST   | Expect an object and save in database                                           |
| 2   | `/params` | DELETE | Expect an id as params and delete the product by id                             |

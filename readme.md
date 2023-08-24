# NodeRedis

### Starts Redis Server

`docker run --name new-redis -d redis`

### Install dependencies

`npm install`

### Run the app

`npm start`

##### You can test the app using Postman or Insomnia

### Routes

`GET /api/v1/user --> Get all users`

`GET /api/v1/user/:id --> Get user by id`

`POST /api/v1/user --> Create user`

##### Example user body

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "jhon@doe.com"
}
```

`DELETE /api/v1/user/:id --> Delete user by id`

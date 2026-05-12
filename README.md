# Express CRUD API

This is a simple Express.js CRUD API project with JWT authentication and password hashing using bcrypt. You can test the API using Postman.

## Features

- User registration (password hashed with bcrypt)
- User login (JWT token generation)
- Protected routes with Bearer Token authentication
- Dummy user list endpoint (no database required for testing)

## Project Structure

```
Backend/
	controller/
		userController.js
	model/
		User.js (optional, for DB integration)
	router/
		userRouter.js
	server.js
	package.json
```

## Getting Started

### 1. Install dependencies

```bash
cd Backend
npm install
```

### 2. Run the server

```bash
npm run dev
# or
node server.js
```

### 3. Test with Postman

- **Register User:**
  - Method: POST
  - URL: `http://localhost:4000/api/users/`
  - Body (JSON):
    ```json
    {
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "password": "123456"
    }
    ```
- **Login User:**
  - (Add your login endpoint if implemented)
- **Get Users (Protected):**
  - Method: GET
  - URL: `http://localhost:4000/api/users/getusers`
  - Headers: `Authorization: Bearer <your_token>`

## Endpoints

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | /api/users/            | Register new user     |
| GET    | /api/users/getusers    | Get all users (dummy) |
| GET    | /api/users/getuser/:id | Get single user by ID |
| PUT    | /api/users/update/:id  | Update user by ID     |
| DELETE | /api/users/delete/:id  | Delete user by ID     |

### 6. Get Single User

- Method: GET
- URL: `http://localhost:4000/api/users/getuser/1`

### 4. Update User

- Method: PUT
- URL: `http://localhost:4000/api/users/update/1`
- Body (JSON):
  ```json
  {
    "firstName": "Updated",
    "lastName": "User"
  }
  ```

### 5. Delete User

- Method: DELETE
- URL: `http://localhost:4000/api/users/delete/1`

## Authentication

- JWT tokens are used for protected routes.
- Use the token received after login as a Bearer Token in the `Authorization` header.

---

# express_crud_api

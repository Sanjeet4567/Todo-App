#  Todo Application

This todo application helps the user to create and manage their daily tasks in a effective way.

## Tech Stack

This application is built over MERN (MongoDB, Express.js, React.js, Node.js) stack.Tailwind css is used to impart responsive designs for varied sized devices.The project also includes user authentication using bcrypt to jwt token.

## Check the live website here

#### URL :  https://todoapp-three-lilac.vercel.app

## Project Structure

- **Backend:**
  - Built with Node.js, Express.js, and MongoDB.
  - User authentication with JWT tokens.
  - API routes for CRUD operations:
    - `GET /`: Default welcome route
    - `POST /auth/signup`: Sign Up user
    - `POST /auth/login`: Login user
    - `GET /apis/todos`: Get all todos
    - `POST /apis//create`: Create a new todo
    - `POST /apis/todo/:id`: Update a todo
    - `DELETE /api/todo/:id`: Delete a todo

- **Frontend:**
  - Developed using React.js and Tailwind CSS.
  - Responsive NavBar built from scratch.
  - Responsive design for various screen sizes.
  

## How to Run Locally

1. Clone this repository.
2. Navigate to the `Backend` folder and run `npm install` to install backend dependencies.
3. Set up your MongoDB connection in `.env` (create a `.env` file based on `.env.example`).
4. Run the backend server using `npm start`.
5. Navigate to the `Frontend` folder and run `npm install` to install frontend dependencies.
6. Run the frontend using `npm run dev`.

Feel free to explore the code and connect with me if you have any questions! Happy programming! 😊

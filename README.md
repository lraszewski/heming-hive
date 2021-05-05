# heming-hive

Tutoring web application

## Description

This web application is designed to accent a tutoring business. It provides an online platform for tutors to post video lessons, which can then be accessed by paying students. Additionally, the website serves as a front page for potential clients to access information regarding a tutor's services. It is built using Node JS.

## Set Up

1. Ensure Node JS is installed and updated. This can be done here: <https://nodejs.org/en/>.
2. Create a MongoDB to store user data, easily done using this service: <https://www.mongodb.com/cloud/atlas>.
3. Pull down the source code.
4. Navigate to the `src` directory, and create a `.env` file with the following properties:

	```.env
	CONNECTION_STRING = (connection string)
	PORT = (port for the application)
	SESSION_SECRET = (secret string)
    ```

5. Open a terminal at the `src` directory.
6. Run `npm install`.
7. To start the application, run one of the following commands:
	- `npm start` for production environments.
	- `npm run dev` for development environments.

## Dependencies

- accesscontrol
- bcrypt
- body-parser
- dotenv
- ejs
- express
- express-flash
- express-session
- gridfs-stream
- method-override
- mongodb
- mongoose
- multer
- multer-gridfs-storage
- passport
- passport-local

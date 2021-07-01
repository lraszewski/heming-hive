# heming-hive

Tutoring web application

## Description

This web application is designed to accent a tutoring business. It provides an online platform for tutors to post video lessons, which can then be accessed by paying students. Additionally, the website serves as a front page for potential clients to access information regarding a tutor's services. It is built using Node JS.

## Set Up

1. Ensure Node JS is installed and updated. This can be done here: <https://nodejs.org/en/>.
2. Create a MongoDB to store user data, easily done using this service: <https://www.mongodb.com/cloud/atlas>.
3. Replace the source code.
4. Navigate to the `src` directory, and create a `.env` file with the following properties:

	```.env
	CONNECTION_STRING=
	PORT=
	SESSION_SECRET=
	```

5. Open a terminal at the `src` directory.
6. Run `npm install`.
7. To start the application, run one of the following commands:
	- `npm start` for production environments.
	- `npm run dev` for development environments.

## To Do

1. Navbar does not appear on mobile.
2. User edit page needs all fields for form to submit, should just update changed values.
3. Add a welcome video to the home page.
4. Add a drop down to sort by lesson subjects. Possibly a show more, show less button. 
5. Investigate alternatives to gfs.


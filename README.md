# Mobile Ordering Application using MERN stack

You can do the following tasks in this application:
- register and login as seller or buyer
- as a seller, you can add mobiles into the database
- as a buyer, you can
    - add items to cart
    - search the products with filters
    - remove the items from the cart

[Live Demo](https://mobile-ordering-application.vercel.app)

[Screen recording of the app](https://app.screencast.com/1iE2HnOK1ES9V)

(Backend is hosted on a free web service so it may take few seconds to respond)

## How to run the project locally

- To run the backend:
    - Add the .env with the following env variables
        - MONGO_URI
        - JWT_SECRET
    - Then run the following commands

```javascript
    cd ./server
    npm install
    npm run start
```

- To run the frontend:
    - Add the .env with the following env variables
        - BACKEND_URI
    - Then run the following commands

```javascript
    cd ./client
    npm install
    npm run dev
```
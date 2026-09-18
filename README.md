# SHUBHVIKA - Indian Ethnic Luxury

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

SHUBHVIKA is a modern, responsive e-commerce storefront tailored for handcrafted Indian ethnic wear, including silk sarees, lehengas, sherwanis, and festive couture.

## Tech Stack

- **Frontend Framework:** React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router v6
- **HTTP Client:** Axios (`@/lib/api`)
- **Notifications:** Sonner

## Available Scripts

In the project directory, you can run:

### `npm install`
Installs all required dependencies for the project.

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Project Structure

```text
src/
├── components/
│   ├── ProductCard.jsx      # Reusable UI card for products
│   └── ProductImage.jsx     # Image component with fallback 'S' monogram
├── lib/
│   └── api.js               # Axios instance & API configurations
├── pages/
│   └── Home.jsx             # Main landing page
├── App.js                   # Application router and layout
└── index.js                 # React entry point
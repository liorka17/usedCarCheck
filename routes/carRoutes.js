const express = require('express'); // מייבא את ספריית express
const router = express.Router(); // יוצר ראוטר – מאפשר להגדיר נתיבים בצורה מודולרית

const {
  getCarByPlate,
  redirectToPlateRoute,
  renderHomePage
} = require('../controllers/carController'); // מייבא את הפונקציות מה-controller של הרכב

// עמוד הבית – מציג את טופס החיפוש
router.get('/', renderHomePage);

// הפניה מחיפוש – מקבל את מספר הרישוי ומפנה לעמוד המתאים
router.get('/search', redirectToPlateRoute);

// תצוגת רכב לפי מספר – מציג את תוצאת החיפוש בפועל לפי מספר רישוי
router.get('/:plateNumber', getCarByPlate);

module.exports = router; // מייצא את הראוטר כדי שאפשר יהיה להשתמש בו ב-app.js או server.js

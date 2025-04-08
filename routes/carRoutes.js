const express = require('express');
const router = express.Router();
const {
  getCarByPlate,
  redirectToPlateRoute,
  renderHomePage
} = require('../controllers/carController');

// עמוד הבית
router.get('/', renderHomePage);

// הפניה מחיפוש
router.get('/search', redirectToPlateRoute);

// תצוגת רכב לפי מספר
router.get('/:plateNumber', getCarByPlate);

module.exports = router;

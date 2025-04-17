const { getCarFromApi } = require('../services/carApiService'); // מייבא את הפונקציה שמביאה רכב מ-API חיצוני
const { findCarByPlate, saveCarToDB } = require('../services/carService'); // מייבא פונקציות למציאת רכב ושמירתו במסד

// פעולה שמרנדרת את דף הבית
const renderHomePage = (req, res) => {
  res.render('index', {
    cssFile: 'index.css', // קובץ ה-CSS לעמוד
    title: 'Search Car by Plate Number' // כותרת העמוד
  });
};

// פעולה שמנתבת את הבקשה לכתובת עם מספר רישוי
const redirectToPlateRoute = (req, res) => {
  const plateNumber = req.query.plateNumber; // לוקח את מספר הרישוי מה-query string
  if (!plateNumber) return res.redirect('/'); // אם אין מספר – מחזיר לדף הבית
  return res.redirect(`/cars/${plateNumber}`); // אחרת – מעביר לכתובת עם המספר
};

// פעולה שמביאה רכב לפי מספר רישוי ומציגה את תוצאת החיפוש
const getCarByPlate = async (req, res) => {
  const plate = req.params.plateNumber;

  try {
    let car = await findCarByPlate(plate); // חיפוש במסד

    if (!car) {
      const apiCar = await getCarFromApi(plate); // ניסיון מה-API

      if (apiCar) {
        await saveCarToDB(apiCar); // שמירה למסד
        car = await findCarByPlate(plate); // שליפה חוזרת
      } else {
        // ❌ אם לא קיבלנו תוצאה – עצור והחזר דף שגיאה
        return res.render('result', {
          car: null,
          cssFile: 'result.css',
          title: 'Car Not Found'
        });
      }
    }

    // ✅ תצוגת הרכב
    res.render('result', {
      car,
      cssFile: 'result.css',
      title: `פרטי רכב ${car.mispar_rechev}`
    });

  } catch (err) {
    console.error('❌', err.message);
    res.status(500).render('result', {
      car: null,
      cssFile: 'result.css',
      title: 'System Error'
    });
  }
};

// מייצא את הפונקציות לשימוש בקובץ אחר (כמו בקובץ הנתיב/ראוטר)
module.exports = {
  renderHomePage,
  redirectToPlateRoute,
  getCarByPlate
};

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
  const plate = req.params.plateNumber; // לוקח את מספר הרישוי מהפרמטר ב-URL

  try {
    let car = await findCarByPlate(plate); // מנסה למצוא את הרכב במסד הנתונים

    if (!car) {
      const apiCar = await getCarFromApi(plate); // אם לא נמצא – מביא מה-API החיצוני
      if (apiCar) {
        await saveCarToDB(apiCar); // שומר למסד
        car = await findCarByPlate(plate); // שולף שוב אחרי ששמרנו
      }
    }

    res.render('result', {
      car, // שולח את האובייקט לתצוגה
      cssFile: 'result.css', // קובץ עיצוב לעמוד התוצאה
      title: car ? `פרטי רכב ${car.mispar_rechev}` : 'Car Not Found' // כותרת דינאמית לפי אם נמצא או לא
    });

  } catch (err) {
    console.error('❌', err.message); // מדפיס שגיאה אם הייתה
    res.status(500).render('result', {
      car: null, // אין רכב להציג
      cssFile: 'result.css',
      title: 'System Error' // כותרת שגיאה
    });
  }
};

// מייצא את הפונקציות לשימוש בקובץ אחר (כמו בקובץ הנתיב/ראוטר)
module.exports = {
  renderHomePage,
  redirectToPlateRoute,
  getCarByPlate
};

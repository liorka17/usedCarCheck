const express = require('express'); // מייבא את ספריית express – לבניית שרתים
const path = require('path'); // מייבא את path – לעבודה עם נתיבים
const carRoutes = require('./routes/carRoutes'); // מייבא את הראוטר שמטפל בנתיבים הקשורים לרכבים
require('dotenv').config(); // טוען את משתני הסביבה מקובץ .env

const app = express(); // יוצר מופע של אפליקציית express

app.set('view engine', 'ejs'); // מגדיר את מנוע התבניות ל-EJS
app.set('views', path.join(__dirname, 'views')); // מגדיר את התיקייה שבה יושבים קבצי ה־views

app.use(express.static(path.join(__dirname, 'public'))); // משרת קבצים סטטיים (כמו CSS, JS, תמונות) מתיקיית public
app.use(express.urlencoded({ extended: false })); // מאפשר לקרוא נתוני טופס שנשלחים ב-POST (urlencoded)
app.use(express.json()); // מאפשר לקרוא נתונים בפורמט JSON מבקשות

app.use('/cars', carRoutes); // כל הנתיבים שמתחילים ב-/cars עוברים ל־carRoutes
app.use('/', carRoutes); // גם הנתיבים הרגילים (כמו '/') עוברים לאותו ראוטר

module.exports = app; // מייצא את האפליקציה – לשימוש בקובץ server.js

require('dotenv').config(); // טוען את משתני הסביבה מקובץ .env

const path = require('path'); // מייבא את המודול 'path' שמאפשר עבודה עם נתיבי קבצים בצורה ניידת בין מערכות הפעלה

module.exports = {
  port: process.env.PORT || 5000, // מייצא את הפורט של השרת: אם קיים PORT בקובץ .env – ישתמש בו, אחרת ברירת מחדל 5000
  csvPath: path.resolve(__dirname, '..', process.env.CSV_PATH || 'data/cars.csv'), 
  // מייצא את הנתיב לקובץ ה-CSV: אם קיים CSV_PATH בקובץ .env – ישתמש בו, אחרת ייקח את 'data/cars.csv' מהתיקייה שמעל
};

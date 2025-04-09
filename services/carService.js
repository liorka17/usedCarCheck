const Car = require('../models/carModel'); // מייבא את מודל הרכב (Car) שמוגדר ב-Mongoose

// פונקציה שמחפשת רכב במסד לפי מספר רישוי
async function findCarByPlate(plateNumber) {
  return Car.findOne({ mispar_rechev: plateNumber }); // מחפש את הרכב לפי מספר רישוי
}

// פונקציה ששומרת רכב למסד הנתונים אם הוא עדיין לא קיים
async function saveCarToDB(data) {
  const exists = await Car.findOne({ mispar_rechev: data.mispar_rechev }); // בודק אם כבר קיים במסד
  if (!exists) {
    const newCar = new Car({
      mispar_rechev: data.mispar_rechev || '',         // מספר רישוי
      tozeret_nm: data.tozeret_nm || '',               // יצרן
      degem_nm: data.degem_nm || '',                   // דגם
      kinuy_mishari: data.kinuy_mishari || '',         // כינוי מסחרי
      sug_degem: data.sug_degem || '',                 // סוג דגם
      baalut: data.baalut || data.sug_baalut || '',    // בעלות (בודק גם sug_baalut כגיבוי)
      shnat_yitzur: data.shnat_yitzur || null,         // שנת ייצור
      tokef_dt: data.tokef_dt || '',                   // תוקף רישיון
      mivchan_acharon_dt: data.mivchan_acharon_dt || '', // מועד מבחן אחרון
      degem_manoa: data.degem_manoa || '',             // דגם מנוע
      tzeva_rechev: data.tzeva_rechev || '',           // צבע רכב
      zmig_kidmi: data.zmig_kidmi || '',               // צמיג קדמי
      zmig_ahori: data.zmig_ahori || '',               // צמיג אחורי
      sug_delek_nm: data.sug_delek_nm || '',           // סוג דלק
      moed_aliya_lakvish: data.moed_aliya_lakvish || '' // מועד עלייה לכביש
    });

    await newCar.save(); // שומר את הרכב במסד
    console.log(`✅ Car saved to DB: ${newCar.mispar_rechev}`); // מדפיס הצלחה
  } else {
    console.log(`ℹ️ Already exists in DB: ${data.mispar_rechev}`); // מדפיס אם הרכב כבר קיים
  }
}

module.exports = {
  findCarByPlate, // מייצא את הפונקציה למציאת רכב
  saveCarToDB     // מייצא את הפונקציה לשמירת רכב
};

const mongoose = require('mongoose'); // מייבא את mongoose – ספרייה לעבודה עם MongoDB

// מגדיר את הסכימה (Schema) של רכב – איך ייראה האובייקט במסד הנתונים
const carSchema = new mongoose.Schema({
  mispar_rechev: { type: String, required: true, unique: true }, // מספר רישוי – שדה חובה וייחודי
  tozeret_nm: String,              // שם היצרן
  degem_nm: String,                // שם הדגם
  kinuy_mishari: String,           // כינוי מסחרי
  sug_degem: String,               // סוג דגם
  baalut: String,                  // בעלות
  shnat_yitzur: Number,           // שנת ייצור
  tokef_dt: String,                // תוקף רישיון
  mivchan_acharon_dt: String,      // תאריך מבחן אחרון
  degem_manoa: String,             // דגם מנוע
  tzeva_rechev: String,            // צבע רכב
  zmig_kidmi: String,              // צמיג קדמי
  zmig_ahori: String,              // צמיג אחורי
  sug_delek_nm: String,            // סוג דלק
  moed_aliya_lakvish: String       // מועד עלייה לכביש
}, { collection: 'cars' }); // מציין ששם הקולקציה במסד הנתונים יהיה 'cars'

// מייצא את המודל בשם Car, כדי שאפשר יהיה להשתמש בו בקבצים אחרים
module.exports = mongoose.model('Car', carSchema);

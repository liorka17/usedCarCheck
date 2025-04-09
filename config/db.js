const mongoose = require('mongoose'); // מייבא את הספרייה mongoose לעבודה עם MongoDB
require('dotenv').config(); // טוען את משתני הסביבה מקובץ .env (כמו MONGO_URI)

const connectDB = async () => { // פונקציה אסינכרונית שמתחברת למסד הנתונים
  try {
    await mongoose.connect(process.env.MONGO_URI); // מנסה להתחבר ל-MongoDB באמצעות כתובת מתוך משתנה סביבה
    console.log('MongoDB connected'); // אם הצליח, מדפיס הודעת הצלחה
  } catch (error) {
    console.error('Mongo connection error:', error); // אם נכשל, מדפיס שגיאה
    process.exit(1); // מסיים את תהליך הריצה עם קוד שגיאה (1)
  }
};

module.exports = connectDB; // מייצא את הפונקציה כדי שאפשר יהיה להשתמש בה בקבצים אחרים

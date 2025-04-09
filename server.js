const app = require('./app'); // מייבא את האפליקציה הראשית (Express app) מהקובץ app.js
const connectDB = require('./config/db'); // מייבא את פונקציית ההתחברות למסד הנתונים MongoDB
const { port } = require('./config/config'); // מייבא את הפורט (או ברירת מחדל) מהקובץ config

// מתחבר למסד הנתונים ואז מפעיל את השרת
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); // מדפיס ל-console שהשרת רץ ונותן קישור
  });
});

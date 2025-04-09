const axios = require('axios'); // מייבא את axios לביצוע בקשות HTTP

const BASE_URL = 'https://data.gov.il/api/3/action/datastore_search'; // כתובת הבסיס ל-API של data.gov.il
const RESOURCE_ID = '053cea08-09bc-40ec-8f7a-156f0677aff3'; // מזהה המאגר של רכבים פרטיים ומסחריים באתר הממשלה

// פונקציה אסינכרונית שמביאה רכב מה-API לפי מספר רישוי
async function getCarFromApi(plate) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        resource_id: RESOURCE_ID, // מזהה המאגר
        filters: JSON.stringify({ mispar_rechev: plate }), // מסנן לפי מספר רישוי (JSON)
        limit: 1 // מגביל לתוצאה אחת
      }
    });

    // אם הבקשה הצליחה ויש תוצאה אחת
    if (response.data.success && response.data.result.records.length > 0) {
      console.log('✅ רכב מה-API:', response.data.result.records[0]); // מדפיס את הרכב שהתקבל מה-API
      return response.data.result.records[0]; // מחזיר את האובייקט של הרכב
    } else {
      console.warn('⚠️ car not found in the API'); // אם לא נמצא רכב תואם
      return null;
    }

  } catch (err) {
    console.error('❌ API Error:', err.response?.data || err.message); // מדפיס שגיאה אם הייתה תקלה בבקשה
    return null; // מחזיר null במקרה של שגיאה
  }
}

module.exports = { getCarFromApi }; // מייצא את הפונקציה לשימוש בקבצים אחרים

const axios = require('axios'); // מייבא את axios לביצוע בקשות HTTP

const BASE_URL = 'https://data.gov.il/api/3/action/datastore_search'; // כתובת הבסיס ל-API
const RESOURCE_ID = '053cea08-09bc-40ec-8f7a-156f0677aff3'; // מזהה המאגר של רכבים פרטיים ומסחריים

// פונקציה שמביאה רכב מה-API לפי מספר רישוי
async function getCarFromApi(plate) {
  // ✅ ולידציה לפני קריאה
  if (!plate || !/^\d{7,8}$/.test(plate)) {
    console.warn('⚠️ Invalid or empty plate number, skipping API call:', plate);
    return null;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        resource_id: RESOURCE_ID,
        filters: JSON.stringify({ mispar_rechev: plate }),
        limit: 1
      }
    });

    if (response.data.success && response.data.result.records.length > 0) {
      console.log('✅ רכב מה-API:', response.data.result.records[0]);
      return response.data.result.records[0];
    } else {
      console.warn('⚠️ Car not found in the API for plate:', plate);
      return null;
    }

  } catch (err) {
    console.error('❌ API Error:', err.response?.data || err.message);
    return null;
  }
}

module.exports = { getCarFromApi };

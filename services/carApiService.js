const axios = require('axios');

const BASE_URL = 'https://data.gov.il/api/3/action/datastore_search';
const RESOURCE_ID = '053cea08-09bc-40ec-8f7a-156f0677aff3'; // מזהה המאגר של רכבים פרטיים ומסחריים

async function getCarFromApi(plate) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        resource_id: RESOURCE_ID,
        filters: JSON.stringify({ mispar_rechev: plate }), // פילטר לפי מספר רישוי
        limit: 1
      }
    });

    // אם הכל הצליח והגיע רשומה אחת
    if (response.data.success && response.data.result.records.length > 0) {
      console.log('✅ רכב מה-API:', response.data.result.records[0]);
      return response.data.result.records[0];
    } else {
      console.warn('⚠️ car not found in the API');
      return null;
    }

  } catch (err) {
    console.error('❌ API Error:', err.response?.data || err.message);
    return null;
  }
}

module.exports = { getCarFromApi };

const { getCarFromApi } = require('../services/carApiService');
const { findCarByPlate, saveCarToDB } = require('../services/carService');

const renderHomePage = (req, res) => {
  res.render('index', {
    cssFile: 'index.css',
    title: 'Search Car by Plate Number'
  });
};

const redirectToPlateRoute = (req, res) => {
  const plateNumber = req.query.plateNumber;
  if (!plateNumber) return res.redirect('/');
  return res.redirect(`/cars/${plateNumber}`);
};

const getCarByPlate = async (req, res) => {
  const plate = req.params.plateNumber;

  try {
    let car = await findCarByPlate(plate);

    if (!car) {
      const apiCar = await getCarFromApi(plate);
      if (apiCar) {
        await saveCarToDB(apiCar);
        car = await findCarByPlate(plate); // שולף שוב לאחר השמירה
      }
    }

    res.render('result', {
      car,
      cssFile: 'result.css',
      title: car ? `פרטי רכב ${car.mispar_rechev}` : 'Car Not Found'
    });

  } catch (err) {
    console.error('❌', err.message);
    res.status(500).render('result', {
      car: null,
      cssFile: 'result.css',
      title: 'System Error'
    });
  }
};

module.exports = {
  renderHomePage,
  redirectToPlateRoute,
  getCarByPlate
};

const Car = require('../models/carModel');

async function findCarByPlate(plateNumber) {
  return Car.findOne({ mispar_rechev: plateNumber });
}

async function saveCarToDB(data) {
  const exists = await Car.findOne({ mispar_rechev: data.mispar_rechev });
  if (!exists) {
    const newCar = new Car({
      mispar_rechev: data.mispar_rechev || '',
      tozeret_nm: data.tozeret_nm || '',
      degem_nm: data.degem_nm || '',
      kinuy_mishari: data.kinuy_mishari || '',
      sug_degem: data.sug_degem || '',
      baalut: data.baalut || data.sug_baalut || '',
      shnat_yitzur: data.shnat_yitzur || null,
      tokef_dt: data.tokef_dt || '',
      mivchan_acharon_dt: data.mivchan_acharon_dt || '',
      degem_manoa: data.degem_manoa || '',
      tzeva_rechev: data.tzeva_rechev || '',
      zmig_kidmi: data.zmig_kidmi || '',
      zmig_ahori: data.zmig_ahori || '',
      sug_delek_nm: data.sug_delek_nm || '',
      moed_aliya_lakvish: data.moed_aliya_lakvish || ''
    });

    await newCar.save();
    console.log(`✅ Car saved to DB: ${newCar.mispar_rechev}`);
  } else {
    console.log(`ℹ️ Already exists in DB: ${data.mispar_rechev}`);
  }
}

module.exports = {
  findCarByPlate,
  saveCarToDB
};

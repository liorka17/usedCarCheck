const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  mispar_rechev: { type: String, required: true, unique: true },
  tozeret_nm: String,
  degem_nm: String,
  kinuy_mishari: String,
  sug_degem: String,
  baalut: String,
  shnat_yitzur: Number,
  tokef_dt: String,
  mivchan_acharon_dt: String,
  degem_manoa: String,
  tzeva_rechev: String,
  zmig_kidmi: String,
  zmig_ahori: String,
  sug_delek_nm: String,
  moed_aliya_lakvish: String
}, { collection: 'cars' });

module.exports = mongoose.model('Car', carSchema);

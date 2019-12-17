const mongoose = require('../database');

const TelephoneSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  number: {
    type: String,
  }
})

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  birtday: {
    type: String,
  },
  telephones: [{ type: TelephoneSchema }]
});

module.exports = mongoose.model('Person', PersonSchema, 'person');
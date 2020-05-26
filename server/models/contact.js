let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const Contacts = {
  name: String,
  tel: String,
  user_id: String
};

module.exports = mongoose.model('contact', Contacts, 'contacts');

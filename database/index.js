const mongoose = require('mongoose');
//const uri = 'mongodb://localhost:27017/wbrain_db';
const uri = 'mongodb+srv://carlos:1234567890@cluster0-a5drl.mongodb.net/test?retryWrites=true&w=majority'
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri);
mongoose.Promise = global.Promise;

module.exports = mongoose;
var mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var order = new Schema({
  fkUser:String,
  _id:Schema.Types.ObjectId,
});


order.virtual('orderComple', {
  ref: 'OrderDetail', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'fk_order', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  // Query options, see http://bit.ly/mongoose-query-options
});

order.set('toJSON',{virtual:true});
mongoose.model('Order',order);

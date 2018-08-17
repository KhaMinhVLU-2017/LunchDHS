const mongoose =require('mongoose');

var Schema = mongoose.Schema;

var menuSchema =  new Schema({
  title:String,
  _id :  Schema.Types.ObjectId,
});

menuSchema.virtual('FoodMenu', {
  ref: 'Food', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'fk_menu', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  // Query options, see http://bit.ly/mongoose-query-options
});


menuSchema.set('toJSON',{virtual:true});
mongoose.model('Menu',menuSchema);

import { Schema, SchemaTypes, model } from 'mongoose';

const menu11Schema = new Schema({
  date: {
    type: SchemaTypes.Date,
    required: true,
  },
  day: {
    type: SchemaTypes.String,
    required: true,
  },
  lunch: {
    type: SchemaTypes.Array,
  },
});

const Menu11 = model('Menu11', menu11Schema, 'menu_11');
export default Menu11;

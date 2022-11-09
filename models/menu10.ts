import { Schema, SchemaTypes, model } from 'mongoose';

const menu10Schema = new Schema({
  date: {
    type: SchemaTypes.Date,
    required: true,
    unique: true,
  },
  day: {
    type: SchemaTypes.String,
    required: true,
  },
  lunch: {
    type: SchemaTypes.Array,
  },
  dinner: {
    type: SchemaTypes.Array,
  },
});

const Menu10 = model('Menu10', menu10Schema, 'menu_10');
export default Menu10;

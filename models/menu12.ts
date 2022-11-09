import { Schema, SchemaTypes, model } from 'mongoose';

const menu12Schema = new Schema({
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

const Menu12 = model('Menu12', menu12Schema, 'menu_12');
export default Menu12;

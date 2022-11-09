import { Schema, SchemaTypes, model } from 'mongoose';

const menu0Schema = new Schema({
  date: {
    type: SchemaTypes.Date,
    required: true,
  },
  day: {
    type: SchemaTypes.String,
    required: true,
  },
  lunchA: {
    type: SchemaTypes.Array,
  },
  lunchB: {
    type: SchemaTypes.Array,
  },
  dinner: {
    type: SchemaTypes.Array,
  },
});

const Menu0 = model('Menu0', menu0Schema, 'menu_0');
export default Menu0;

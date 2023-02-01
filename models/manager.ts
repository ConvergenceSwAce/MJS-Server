import { Schema, SchemaTypes, model } from 'mongoose';

const managerSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  company: {
    type: SchemaTypes.String,
    required: true,
  },
  cafeteria: {
    type: SchemaTypes.Number,
    required: true,
  },
  phone: {
    type: SchemaTypes.String,
    required: true,
  },
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
  },
});

const Manager = model('Manager', managerSchema, 'manager');
export default Manager;

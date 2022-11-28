import { Schema, SchemaTypes, model } from 'mongoose';

const noticeSchema = new Schema({
  title: {
    type: SchemaTypes.String,
    required: true,
  },
  body: {
    type: SchemaTypes.String,
    required: true,
  },
});

const Notice = model('Notice', noticeSchema, 'notice');
export default Notice;

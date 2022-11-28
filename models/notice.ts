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

const Notices = model('Notices', noticeSchema, 'notices');
export default Notices;

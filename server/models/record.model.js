import mongoose from "mongoose";

export default function createTable({tableName}){ 
const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

mongoose.model(database, recordSchema);

}

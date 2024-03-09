import mongoose from "mongoose";


export const getRecords = async (req, res) => {
  const { database } = req.params;

  try {
    // Check if the model is registered, if not, create and register it
    if (!mongoose.connection.models[database]) {
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
    // console.log(mongoose.models)
    const records = await mongoose.model(database).find();

    res.status(200).json(records);
  } catch (error) {
    console.log("Error in getRecords controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addRecord = async (req, res) => {
  const { name, email, phone } = req.body;
  const { database } = req.params;

  try {
    // Check if the model is registered, if not, create and register it
    if (!mongoose.connection.models[database]) {
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
    // check if phone is already registered then return a message duplicate not allowed
    const existingRecord = await mongoose.model(database).findOne({ phone });

    if (existingRecord) {
      return res.status(400).json({ error: "Duplicates are not allowed." });
    }
    // Now, the model should be registered, and you can use it to create a new record
    const newRecord = new mongoose.model(database)({
      name,
      email,
      phone,
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    console.log("Error in addRecord controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sortRecords = async (req, res) => {
  const { database, field, order } = req.params;

  try {
    const records = await mongoose.model(database).find().sort({ [field]: order });
    res.status(200).json(records);
  } catch (error) {
    console.log("Error in sortRecords controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchRecords = async (req, res) => {
  const { database, query } = req.params;

  try {
    const records = await mongoose
      .model(database)
      .find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { phone: { $regex: query, $options: "i" } },
        ],
      });
    res.status(200).json(records);
  } catch (error) {
    console.log("Error in searchRecords controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteRecord = async (req, res) => {
  const { database, recordId } = req.params;

  try {
    // Check if the model is registered, if not, create and register it
    if (!mongoose.connection.models[database]) {
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

    // Now, the model should be registered, and you can use it to delete a record
    const deletedRecord = await mongoose.model(database).findByIdAndDelete(recordId);

    if (!deletedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully", deletedRecord });
  } catch (error) {
    console.log("Error in deleteRecord controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

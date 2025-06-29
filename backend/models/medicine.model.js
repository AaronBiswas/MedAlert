import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  medicine: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  time: {
    type: String, // "14:00" or "02:00 PM"
    required: true
  },
  taken: {
    type: [Date], // list of timestamps when user marked as taken
    default: []
  }
});

const Medicine = mongoose.model("Medicine", MedicineSchema);

export default Medicine;

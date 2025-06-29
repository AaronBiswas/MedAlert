import Medicine from "../models/medicine.model.js";

export const getReminders = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await Medicine.find({ user: userId });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: "DB fetch error" });
  }
};

export const markTaken = async (req, res) => {
  try {
    const id = req.params.id;
    const medicine = await Medicine.findById(id);
    if (!medicine)
      return res.status(404).json({ success: false, message: "Not found" });

    medicine.taken.push(new Date());
    await medicine.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

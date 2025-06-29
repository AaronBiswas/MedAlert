import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import Medicine from "../models/medicine.model.js";

export const uploadFile = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  if (!req.userId) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: user not found" });
  }

  const filePath = path.join(process.cwd(), "uploads", req.file.filename);
  const scriptPath = path.join(process.cwd(), "parse_csv.py");
  const py = spawn("python", [scriptPath, filePath]);

  let dataBuffer = "";

  py.stdout.on("data", (chunk) => {
    dataBuffer += chunk.toString();
  });

  py.stderr.on("data", (err) => {
    console.error("Python stderr:", err.toString());
  });

  py.on("close", async () => {
    try {
      const parsed = JSON.parse(dataBuffer);
      fs.unlinkSync(filePath);

      const userId = req.userId;

      // Expected fields: medicine, dosage, time, startDate, endDate
      const inserts = parsed.map((row) => ({
        user: userId,
        medicine: row.medicine,
        dosage: row.dosage,
        time: row.time,
        startDate: new Date(row.startDate),
        endDate: new Date(row.endDate),
      }));

      const saved = await Medicine.insertMany(inserts);

      return res.status(200).json({ success: true, data: saved });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Processing or DB error",
        error: err.message,
      });
    }
  });
};
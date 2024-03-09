import express from "express";
import protectRoute from "../middleware/protectRoute.js";

import {getRecords,addRecord,sortRecords,searchRecords, deleteRecord} from "../controllers/record.controller.js";

const router = express.Router();

// Authenticate user middleware
router.use(protectRoute);

// Get records
router.get("/:database", getRecords);

// Add record
router.post("/:database", addRecord);

// Sort records
router.get("/:database/sort/:field/:order", sortRecords);

// Search records
router.get("/:database/search/:query", searchRecords);

// Delete record
router.delete("/:database/:recordId", deleteRecord);

export default router;

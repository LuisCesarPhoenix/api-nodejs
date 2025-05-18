const express = require("express");

const { processOwnCloudFiles } = require("../controllers/fileProcessingControllerOwncloud");

const router = express.Router();

router.post("/process-owncloud", processOwnCloudFiles);

module.exports = router;

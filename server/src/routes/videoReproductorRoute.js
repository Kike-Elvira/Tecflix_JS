const express = require("express");
const router = express.Router();

router.get("/video/:nombreArchivo", (req, res) => {
  const { nombreArchivo } = req.params;
  res.sendFile(`/root/${nombreArchivo}`);
});


module.exports = router;

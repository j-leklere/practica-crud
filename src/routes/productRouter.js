const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/img/imagenes-platos"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Listado de productos
router.get("/list", productController.list);

// Detalle de producto
router.get("/detail/:id", productController.detail);

// Creación de producto
router.get("/create", productController.create);
router.post("/create", upload.single("image"), productController.store);

// Edición de producto
router.get("/edit/:id", productController.edit);
router.put("/edit/:id", productController.update);

// Eliminación de producto
// Usa la misma vista que la ruta de edición (PUT)
router.delete("/delete/:id", productController.destroy);

module.exports = router;

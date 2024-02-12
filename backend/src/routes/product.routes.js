import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/products").post(
  upload.fields([
    {
      name: "picture",
      maxCount: 1,
    },
  ]),
  addProduct
);
router.route("/products/:id").patch(
  upload.fields([
    {
      name: "picture",
      maxCount: 1,
    },
  ]),
  updateProduct
);

router.route("/products").get(getProducts);
router.route("/products").post(upload.single("picture"), addProduct);
router.route("/products/:id").get(getSingleProduct);
router.route("/products/:id").patch(upload.single("picture"), updateProduct);
router.route("/products/:id").delete(deleteProduct);

export default router;

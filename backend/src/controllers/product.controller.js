import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";

const getProducts = asyncHandler(async (req, res) => {});

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, gender, category, price } = req.body;
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  if (!description) {
    throw new ApiError(400, "Description is required");
  }
  if (!gender) {
    throw new ApiError(400, "Gender is required");
  }
  if (!category) {
    throw new ApiError(400, "Category is required");
  }
  if (!price) {
    throw new ApiError(400, "Price is required");
  }
  const pictureLocalPath = req.files?.picture[0]?.path;

  if (!pictureLocalPath) {
    throw new ApiError(404, "Picture file is required");
  }

  const picture = await uploadOnCloudinary(pictureLocalPath);

  if (!picture) {
    throw new ApiError(500, "Something went wrong while uploading the picture");
  }

  const product = await Product.create({
    name,
    picture,
    description,
    gender,
    category,
    price,
  });
  if (!product) {
    throw new ApiError(500, "Something went wrong while adding the product");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { product }, "Product added successfully"));
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product fetched successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, gender, category, price } = req.body;
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const pictureLocalPath = req.files?.picture[0]?.path;
  let picture;
  if (pictureLocalPath) {
    picture = await uploadOnCloudinary(pictureLocalPath);
    if (!picture) {
      throw new ApiError(
        500,
        "Something went wrong while uploading the picture"
      );
    }
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.picture = picture || product.picture;
  product.gender = gender || product.gender;
  product.category = category || product.category;
  product.price = price || product.price;

  const updatedProduct = await product.save();

  if (!updatedProduct) {
    throw new ApiError(500, "Something went wrong while updating the product");
  }

  return res
    .status(204)
    .json(
      new ApiResponse(
        204,
        { product: updatedProduct },
        "Product updated successfully"
      )
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  const response = await Product.deleteOne({ _id: productId });

  if (response.deletedCount === 0) {
    throw new ApiError(502, "Something went wrong while deleting product");
  }

  return res
    .status(202)
    .json(new ApiResponse(202, {}, "Product deleted successfully"));
});

export {
  getProducts,
  addProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

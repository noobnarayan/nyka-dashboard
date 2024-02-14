import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ArrowLongRightIcon,
  PencilSquareIcon,
  TrashIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Select from "./Select";
import InputField from "./InputField";
import { productService } from "../services/productService";

function Dashboardcontent() {
  const initialFilters = {
    gender: "",
    category: "",
    price: "",
  };
  const initialNewProduct = {
    name: "",
    description: "",
    gender: "",
    category: "",
    price: "",
    picture: null,
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(initialNewProduct);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts({
        ...filters,
        search: searchQuery,
        sort: filters.price,
      });
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [filters, searchQuery]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setNewProduct({
      ...newProduct,
      image: imageFile,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const addProduct = async (data) => {
    try {
      const res = await productService.addProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = () => {
    addProduct(newProduct);
    setNewProduct({
      image: "",
      name: "",
      description: "",
      gender: "",
      category: "",
      price: "",
    });
    setIsModalOpen(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleProductDelete = async (id) => {
    try {
      const res = await productService.deleteProduct(id);
      if (res.statusCode === 202) {
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-7">
      <div>
        <div className="flex justify-between">
          <div className="border px-2.5 py-px flex gap-3 w-1/2 bg-white items-center rounded-sm">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Search"
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="flex gap-3 items-center">
            <div className="p-3 bg-white rounded relative">
              <BellIcon className="h-6 w-6 text-gray-400" />
              <div className="absolute top-[-1px] right-[-1px] h-2 w-2 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="h-10 w-10 rounded overflow-hidden">
              <img
                src="https://photos.wellfound.com/users/16814996-medium_jpg?1705945505"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between my-8">
          <div>
            <Select
              id="gender"
              name="gender"
              defaultOption="Filter by Gender"
              options={["Male", "Female"]}
              value={filters.gender}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
            />
          </div>
          <div>
            <Select
              id="category"
              name="category"
              defaultOption="Filter by Category"
              options={["Makeup", "Skincare", "Haircare"]}
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            />
          </div>
          <div>
            <Select
              id="price"
              name="price"
              defaultOption="Sort by Price"
              options={["Ascending", "Descending"]}
              value={filters.price}
              onChange={(e) => handleFilterChange("price", e.target.value)}
            />
          </div>
          <div>
            <button
              className="py-2.5 px-5 bg-[#0E1866] font-medium text-white text-sm rounded-sm"
              onClick={handleModalOpen}
            >
              ADD PRODUCT
            </button>
          </div>
        </div>
        <div className="p-5 shadow-xl rounded">
          <div className="flex justify-between">
            <p className="text-lg text-[#1C2A53]">Latest Orders</p>
            <p className="flex gap-2 text-[#555F7E] text-sm items-center hover:cursor-pointer">
              More
              <ArrowLongRightIcon className="w-4 text-gray-500 font-medium" />
            </p>
          </div>
          <table className="w-full text-left rounded p-3 overflow-hidden my-8">
            <thead>
              <tr className="bg-gray-100 border-b-[1.5px] text-[#8E95A9] ">
                <th className="py-5 text-center">Products</th>
                <th className="py-5 text-center">Gender</th>
                <th className="py-5 text-center">Category</th>
                <th className="py-5 text-center">Price</th>
                <th className="py-5 text-center">Description</th>
                <th className="py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b-[1.5px] text-[#555F7E]">
                  <td className="text-center flex items-center pl-5 py-5">
                    <img
                      src={product.picture}
                      alt={product.name}
                      className="w-10 h-10 mr-2 rounded-full"
                    />
                    {product.name}
                  </td>
                  <td className="text-center py-5">{product.gender}</td>
                  <td className="text-center py-5">{product.category}</td>
                  <td className="text-center py-5">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="text-left py-5">{product.description}</td>
                  <td className="text-right py-5 flex gap-2 items-center justify-center">
                    <PencilSquareIcon className="h-5 w-5 hover:cursor-pointer" />
                    <TrashIcon
                      className="h-5 w-5 hover:cursor-pointer"
                      onClick={() => handleProductDelete(product._id)}
                    />
                    <EllipsisHorizontalIcon className="h-5 w-5 hover:cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4">Add Product</h2>
            <InputField
              label="Product Name"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="mb-4"
            />

            <InputField
              label="Product Description"
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className="mb-4"
            />
            <Select
              id="gender"
              name="gender"
              label="Gender"
              defaultOption="Select gender"
              options={["Male", "Female"]}
              value={newProduct.gender}
              onChange={handleInputChange}
              className="mb-4"
              isRequired={true}
            />
            <Select
              id="category"
              name="category"
              label="Category"
              defaultOption="Select category"
              options={["Makeup", "Skincare", "Haircare"]}
              value={newProduct.category}
              onChange={handleInputChange}
              className="mb-4"
              isRequired={true}
            />
            <InputField
              label="Price"
              id="price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Enter product price"
              className="mb-4"
            />

            {/* Image Upload */}
            <label htmlFor="productImage" className="block mb-2">
              Product Image
            </label>
            <input
              type="file"
              id="picture"
              name="picture"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
              required
            />

            {/* Add Product button */}
            <div className="flex justify-end">
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
                onClick={handleAddProduct}
              >
                Add
              </button>
              <button
                className="ml-2 py-2 px-4 bg-gray-300 text-gray-800 rounded-md"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboardcontent;

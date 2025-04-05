const productModel = require("../models/productModel/product.model");
const ItemSku = require("../models/itemsku/itemskuModel");

module.exports = {
  getProductsById: async (query) => {
    try {
      let originalData = await productModel.getProductsById(query.productId);
      let data = {
        "_id": originalData._id.toString(),
        "name": originalData.name,
        "images": originalData.images,
        "category": originalData.category,
        "description": originalData.description,
        "sizeType": {
          "regular": {
            "price": originalData.regular.price,
            "sizes": originalData.regular.sizes.map(size => ({
              "size": size.size,
              "colors": size.colors.map(color => ({
                "color": color.color,
                "count": color.count
              }))
            }))
          },
          "oversized": {
            "price": originalData.oversized.price,
            "sizes": originalData.oversized.sizes.map(size => ({
              "size": size.size,
              "colors": size.colors.map(color => ({
                "color": color.color,
                "count": color.count
              }))
            }))
          }
        }
      };
      return { status: 200, data: data, message: "Fetched product details successfully." };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  createProduct: async (body) => {
    try {
      let size = ["regular", "oversized"];
      let data = await productModel.createProduct(body);
      return { status: 201, data: data, message: "Product created successful" };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getProducts: async (query, pagination) => {
    try {
      let {
        data,
        pagination: paginationData,
        error,
      } = await productModel.getProducts(query, pagination);
      if (error) {
        throw new Error(error.message);
      }
      return {
        status: 200,
        pagination: paginationData,
        data: data,
        message: "Products have been fetched.",
      };
    } catch (error) {
      return {
        error: error,
        pagination,
      };
    }
  },
};

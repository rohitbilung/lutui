const mongoose = require("mongoose");
const Product = require("../productModel/product.schema");
const ItemSku = require("../itemsku/itemskuSchema");

module.exports = {
  getProducts: async (query, pagination) => {
    let page = Number(query.page),
      limit = Number(query.limit);
    let match = {}
    if(query.category!== ''){
      match['category'] = query.category
    }
    if(query.subCategory!== ''){
      match['subCategory'] = query.subCategory
    }
    try {
      let data = await Product.aggregate([
        { $match: match },
        {
          $project: {
            name: 1,
            images: 1,
            category: 1,
            createdAt: 1,
          },
        },
        { $sort: { createdAt: -1 } },
        { $skip: limit * (page - 1) },
        { $limit: limit },
      ]);

      const total_records = await Product.countDocuments(match);
      const total_pages = Math.ceil(total_records / limit);
      let next_page = null;
      const viewed_records = (page - 1) * limit;
      if (viewed_records + limit < total_records) {
        next_page = page + 1;
      }
      const page_records = data.length;

      pagination.total = total_records;
      pagination.page_records = page_records;
      pagination.page_no = page;
      pagination.total_pages = total_pages;
      pagination.next_page = next_page;

      if (page > 1) {
        let prev_page = page - 1;
        if (total_records < page) {
          prev_page = total_records;
        }
        pagination.prev_page = prev_page;
      }

      return { data, pagination };
    } catch (error) {
      return { error };
    }
  },

  getProductsById: async (productId) => {
    try {
      let res = await Product.findById(productId);
      return res;
    } catch (error) {
      return error;
    }
  },

  createProduct: async (body) => {
    // let data = {
    //     name: "Banda Bhunjdi",
    //     images:[
    //         'https://res.cloudinary.com/dpv8ohtic/image/upload/v1743541146/MSK_0185_ysxrhr.jpg',
    //         'https://res.cloudinary.com/dpv8ohtic/image/upload/v1743541145/MSK_0194_1_prljqt.jpg',
    //         'https://res.cloudinary.com/dpv8ohtic/image/upload/v1743541145/MSK_0227_kevhk7.jpg',
    //         'https://res.cloudinary.com/dpv8ohtic/image/upload/v1743541145/MSK_0093_tsdqap.jpg',
    //         'https://res.cloudinary.com/dpv8ohtic/image/upload/v1743541146/MSK_9963_usxhps.jpg',
    //         'https://res.cloudinary.com/dpv8ohtic/image/upload/v1743541145/MSK_0001_vutvgz.jpg'
    //     ],
    //     description:"Banda Bhunjdi, a cherished delicacy in and around  Chota-Nagpur region is a mouthwatering dish crafted from Pork Organ Meat. More than just food, it embodies cultural heritage, gracing grand feasts and festive gatherings.Served with rice or millet rotis, its spicy, aromatic gravy leaves a lasting impression. Despite changing food trends, Banda Bhunjdi remains a symbol of hospitality, unity, and tradition. Its enduring legacy continues to delight food lovers, preserving a deep-rooted culinary tradition that speaks of history, warmth, and the joy of shared meals.",
    //     category: "T-Shirts",
    //     regular: {
    //         price: 564.00,
    //         sizes: [
    //             {
    //                 size: "S",
    //                 colors: [
    //                     { color: "red", count: 0 },
    //                     { color: "black", count: 0 },
    //                     { color: "white", count: 0 }
    //                 ]
    //             },
    //             {
    //                 size: "M",
    //                 colors: [
    //                     { color: "red", count: 0 },
    //                     { color: "black", count: 0 },
    //                     { color: "white", count: 0 }
    //                 ]
    //             },
    //             {
    //                 size: "L",
    //                 colors: [
    //                     { color: "red", count: 0 },
    //                     { color: "black", count: 4 },
    //                     { color: "white", count: 0 }
    //                 ]
    //             },
    //             {
    //                 size: "XL",
    //                 colors: [
    //                     { color: "red", count: 0 },
    //                     { color: "black", count: 4 },
    //                     { color: "white", count: 0 }
    //                 ]
    //             },
    //             {
    //                 size: "XXL",
    //                 colors: [
    //                     { color: "red", count: 0 },
    //                     { color: "black", count: 4 },
    //                     { color: "white", count: 0 }
    //                 ]
    //             }
    //         ]
    //     },
    //     oversized: {
    //         price: 664.00,
    //         sizes: [
    //             {
    //                 size: "S",
    //                 colors: [
    //                     { color: "red", count: 0 },
    //                     { color: "black", count: 0 },
    //                     { color: "white", count: 0 }
    //                 ]
    //             },
    //             {
    //                 size: "M",
    //                 colors: [
    //                     { color: "red", count: 0 },
    //                     { color: "black", count: 0 },
    //                     { color: "white", count: 0 }
    //                 ]
    //             },
    //             {
    //                 size: "L",
    //                 colors: [
    //                     { color: "red", count: 0 },
    //                     { color: "black", count: 4 },
    //                     { color: "white", count: 0 }
    //                 ]
    //             },
    //             {
    //                 size: "XL",
    //                 colors: [
    //                     { color: "red", count: 0 },
    //                     { color: "black", count: 5 },
    //                     { color: "white", count: 0 }
    //                 ]
    //             },
    //             {
    //                 size: "XXL",
    //                 colors: [
    //                     { color: "red", count: 0 },
    //                     { color: "black", count: 0 },
    //                     { color: "white", count: 0 }
    //                 ]
    //             }
    //         ]
    //     }
    // }
    let data = body;
    try {
      let res = await Product.create(data);
      return res;
    } catch (error) {
      return error;
    }
  },

  updateQuantityOfProduct: async (data) => {

    const update = {
      $inc: {
        [`${data.type}.sizes.$[sizeElem].colors.$[colorElem].count`]: -data.quantity
      }
    };

    const arrayFilters = [
      { 'sizeElem.size': data.size },
      { 'colorElem.color': data.color }
    ];

    try {
      let res = await Product.updateOne(
        { _id: data.productId },
        update,
        { arrayFilters }
      );
      return res;
    } catch (error) {
      return error;
    }
  },

};

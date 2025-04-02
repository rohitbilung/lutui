const productService = require('../services/product.service')
const mongoose = require('mongoose')

module.exports = {
    createProduct : async (req,res)=> {
        let result = await productService.createProduct(req.body)
        if(result){
            res.status(result.status).send({
                success: true,
                data: result.data,
                message: result.message
            });
        }else{
            res.status(500).send({
                success: false,
                message: 'Server error',
                error: result.error,
            });
        }
    },

    getProductsById : async (req, res) => {
        // let result = await productService.getProductsById(req.query)
        let data = {
            "_id": "67ec48443afb435b8fb6af18",
            "name": "Roj Roj Guna Tiyan",
            "images": [
                "https://res.cloudinary.com/dpv8ohtic/image/upload/v1743537481/MSK_0143_cnj0ov.jpg",
                "https://res.cloudinary.com/dpv8ohtic/image/upload/v1743537722/MSK_0146_fbpo5f.jpg",
                "https://res.cloudinary.com/dpv8ohtic/image/upload/v1743537479/MSK_0198_rlsoxz.jpg",
                "https://res.cloudinary.com/dpv8ohtic/image/upload/v1743537722/MSK_0203_uhqda3.jpg",
                "https://res.cloudinary.com/dpv8ohtic/image/upload/v1743537297/MSK_0017_ip6jmg.jpg",
                "https://res.cloudinary.com/dpv8ohtic/image/upload/v1743537481/MSK_0154_ke8zuy.jpg",
                "https://res.cloudinary.com/dpv8ohtic/image/upload/v1743537480/MSK_9964_rv8ovl.jpg"
            ],
            "category": "T-Shirts",
            "description": "Powdered dry moringa leaves, commonly known as Munga Guna , is an Adivasi delicacy in and around Chota-Nagpur region, which is rich in nutrients and earthy flavors. The phrase “Roj Roj Guna Tiyan” originates from a popular Sadri folk song, typically sung during the vibrant Sailo Dance. In this melodious tune, a younger brother playfully complains to his elder brother, expressing his longing for variety in their meals. He humorously requests that his sister-in-law be persuaded to cook something other than Guna Tiyan every day, craving the indulgence of a hearty non-vegetarian dish.",
            "sizeType": {
                "regular": {
                    "price": 564,
                    "sizes": [
                        {
                            "size": "S",
                            "colors": [
                                {
                                    "color": "red",
                                    "count": 10
                                },
                                {
                                    "color": "black",
                                    "count": 15
                                },
                                {
                                    "color": "white",
                                    "count": 12
                                }
                            ]
                        },
                        {
                            "size": "M",
                            "colors": [
                                {
                                    "color": "red",
                                    "count": 8
                                },
                                {
                                    "color": "black",
                                    "count": 20
                                },
                                {
                                    "color": "white",
                                    "count": 15
                                }
                            ]
                        },
                        {
                            "size": "L",
                            "colors": [
                                {
                                    "color": "red",
                                    "count": 8
                                },
                                {
                                    "color": "black",
                                    "count": 20
                                },
                                {
                                    "color": "white",
                                    "count": 15
                                }
                            ]
                        },
                        {
                            "size": "XL",
                            "colors": [
                                {
                                    "color": "red",
                                    "count": 8
                                },
                                {
                                    "color": "black",
                                    "count": 20
                                },
                                {
                                    "color": "white",
                                    "count": 15
                                }
                            ]
                        },
                        {
                            "size": "XXL",
                            "colors": [
                                {
                                    "color": "red",
                                    "count": 8
                                },
                                {
                                    "color": "black",
                                    "count": 20
                                },
                                {
                                    "color": "white",
                                    "count": 15
                                }
                            ]
                        }
                    ]
                },
                "oversized": {
                    "price": 664,
                    "sizes": [
                        {
                            "size": "S",
                            "colors": [
                                {
                                    "color": "red",
                                    "count": 5
                                },
                                {
                                    "color": "black",
                                    "count": 8
                                },
                                {
                                    "color": "white",
                                    "count": 6
                                }
                            ]
                        },
                        {
                            "size": "M",
                            "colors": [
                                {
                                    "color": "red",
                                    "count": 8
                                },
                                {
                                    "color": "black",
                                    "count": 20
                                },
                                {
                                    "color": "white",
                                    "count": 15
                                }
                            ]
                        },
                        {
                            "size": "L",
                            "colors": [
                                {
                                    "color": "red",
                                    "count": 8
                                },
                                {
                                    "color": "black",
                                    "count": 20
                                },
                                {
                                    "color": "white",
                                    "count": 15
                                }
                            ]
                        },
                        {
                            "size": "XL",
                            "colors": [
                                {
                                    "color": "red",
                                    "count": 8
                                },
                                {
                                    "color": "black",
                                    "count": 20
                                },
                                {
                                    "color": "white",
                                    "count": 15
                                }
                            ]
                        },
                        {
                            "size": "XXL",
                            "colors": [
                                {
                                    "color": "red",
                                    "count": 8
                                },
                                {
                                    "color": "black",
                                    "count": 20
                                },
                                {
                                    "color": "white",
                                    "count": 15
                                }
                            ]
                        }
                    ]
                }
            }
        }
        if(true){
            res.status(200).send({
                success: true,
                data: data || "",
                message:  ""
            });
        }else{
            res.status(500).send({
                success: false,
                message: 'Something went wrong in the server.',
                error: result.error,
            });
        }
    },

    getProducts : async (req,res) => {
        let pagination = {
            total: 0,
            page_records: 0,
            page_no: 1,
            total_pages: 1,
            next_page: null,
            prev_page: null,
          };
        let result = await productService.getProducts(req.query, pagination)

        if(result){
            res.status(result.status).send({
                success: true,
                data: result.data || req.user,
                message: result.message || "",
                pagination: result.pagination || pagination
            });
        }else{
            res.status(500).send({
                success: false,
                message: 'Something went wrong in the server.',
                pagination,
                error: result.error,
            });
        }
    }
}
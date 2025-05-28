const express = require("express")
const Product = require("../models/ProductModel.js")
const { protect, admin } = require("../middleware/authMiddleware.js")

const router = express.Router()


// @route POST /api/products
// @desc Create a new Product
// access Private/admin

router.post("/", protect, admin, async (req, res) => {
    try {
        const { name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimension,
            weight,
            sku
        } = req.body

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimension,
            weight,
            sku,
            user: req.user._id
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
})

// @route PUT /api/products/:id
// @desc Update a Product
// access Private/admin

router.put("/:id", protect, admin, async (req, res) => {
    const { 
        name,
        description,
        price,
        discountPrice,
        countInStock,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        tags,
        dimension,
        weight,
        sku
    } = req.body
    try {
        // find Product
        const product = await Product.findById(req.params.id)

        if (product) {
                product.name = name || product.name,
                product.description = description || product.description,
                product.price = price || product.price,
                product.discountPrice = discountPrice || product.discountPrice,
                product.countInStock = countInStock || product.countInStock,
                product.category = category || product.category,
                product.brand = brand || product.brand,
                product.sizes = sizes || product.sizes,
                product.colors = colors || product.colors,
                product.collections = collections || product.collections,
                product.material = material || product.material,
                product.gender = gender || product.gender,
                product.images = images || product.images
                product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured,
                product.isPublished = isPublished !== undefined ? isPublished : product.isPublished,
                product.tags = tags || product.tags,
                product.dimension = dimension || product.dimension,
                product.weight = weight || product.weight,
                product.sku = sku || product.sku
            
                const updatedProduct = await product.save()
                res.json(updatedProduct)
        }else {
            res.status(404).json({message : "Product Not Found"})
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Server Error"})
    }
})

module.exports = router
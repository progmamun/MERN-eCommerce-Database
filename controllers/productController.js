import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all product 
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({})

  res.json(products)
})

// @desc Fetch single product by id
// @route GET /api/products:id
// @access Public
const getProductById = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @route delete /api/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    await product.remove()
    res.json({message: 'Product removed'})
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc create a product
// @route post/api/products
// @access private/admin
const createProduct = asyncHandler(async(req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/simple.jpg',
    brand: 'Simple brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createProduct = await product.save()
  res.status(201).json(createProduct)
})

// @desc update a product
// @route put /api/product/:id
// @access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {name, price, description, image, brand, category, countInStock} = req.body

  const product = await Product.findById(req.params.id)

  if(product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updateProduct = await product.save()
    res.json(updateProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }
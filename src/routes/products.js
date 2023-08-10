const express = require('express')
const Product = require("../database/Schemas/Product")
const { Router } = require("express")

const productsRouter = Router()

productsRouter.use((request, response, next) => {
    if (request.user) next()
    else response.send("You have to log in first").status(400)
})


// GET REQUEST
productsRouter.get('/', (request, response) => {
    response.send("All Products")
})

productsRouter.get('/all', async(request, response) => {
    const products = await Product.find();
    response.send(products)
})

productsRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const product = await Product.findById(id) 
        response.send(product).statusCode(200)
    } catch (error) {
        console.log(error);
    }
    
})


// POST REQUEST
productsRouter.post('/create', async (request, response) => {
    try {
        const product = await Product.create(request.body)
        response.send("Product Created")
    } catch (error) {
        console.log(error);
    }
})





module.exports = productsRouter

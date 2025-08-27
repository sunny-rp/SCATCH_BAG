const express = require("express")
const router = express.Router()
const upload = require("../config/multer-config")
const productModel = require("../models/product-model")

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body
    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    })

    res.redirect("/owners/admin")
  } catch (error) {
    console.error("Error creating product:", error)
    res.status(500).send("Error creating product")
  }
})

router.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const deletedProduct = await productModel.findByIdAndDelete(productId)

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.status(200).json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    res.status(500).json({ error: "Error deleting product" })
  }
})

module.exports = router

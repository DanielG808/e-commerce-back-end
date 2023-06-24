const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
// /api/categories
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// /api/categories/:id
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(400).json({ message: "No categories with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500), json(error);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  try {
    const deletedCategory = Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res.status(400).json({ message: "There's no category with this id!" });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

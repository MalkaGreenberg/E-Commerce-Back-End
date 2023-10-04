const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(Data => {
    if(!Data) {
      res.status(404).json({message: 'No categories found in the database'});
      return;
    }
    res.json(Data);
  })
  .catch(err => {
    console.log("something went wrong");
    res.status(500).json(err)
  });

});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id,{
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(data =>{
    if(!data){
      res.status(404).json({message: 'No categories with that Id found in the database'});
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log("something went wrong");
    res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body) 
  .then( data =>{
    res.json(data);
  })
  .catch(err => {
    console.log("something went wrong");
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where:{
         id: req.params.id
        },
    }
    )
    .then(updatedCategory => {
      res.json(updatedCategory);
    })
    .catch(err => {
      console.log("something went wrong");
      res.status(500).json(err)
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  
  Category.destroy(
    {
      where: { 
        id: req.params.id 
      },
    }
  ).then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch(err => {
    console.log("something went wrong");
    res.status(500).json(err)
  });
});


module.exports = router;

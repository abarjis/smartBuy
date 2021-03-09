const app = require('../server')
const supertest = require('supertest')

const Product = require('../models/Product')
const { setupDB } = require('../helpers/test-setup')
const request = supertest(app)


setupDB('smartbuy-test', true)


describe('products',() => {
  it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
  })

  it('Should save product to database', async done => {
  
    const res = await request.post('/api/v1/admin/product/new')
      .send({
        name : "test-name",
        price : "45.89",
        description : "test description",
        ratings : 4.5,
        category : "Electronics",
        seller : "test-seller",
        stock : 50,
        numOfReviews : 32,
        reviews: []
    })
  
    // Ensures response contains name and email
    //expect(res.name).toBeTruthy()
   // expect(res.description).toBeTruthy()
  
    // Searches the product in the database
    const product = await Product.findOne({ name: "test-name" })
    expect(product.name).toBeTruthy()
    expect(product.description).toBeTruthy()
  
    done()
  })

  it("Prevents creating products without required name", async () => {
    const response = await request.post(`/api/v1/admin/product/new`)
        .send({ 
        price : "45.89",
        description : "test description",
        ratings : 4.5,
        category : "Electronics",
        seller : "test-seller",
        stock : 50,
        numOfReviews : 32,
        reviews: []});
     //expect(response.statusCode).toBe(400);
     expect(product.name).toBeFalsy()
  })
  
    
  it("Should return all products /api/v1/products", async () => {
    const product = await Product.insertMany({
      name : "test-name",
      price : "45.89",
      description : "test description",
      ratings : 4.5,
      category : "Electronics",
      seller : "test-seller",
      stock : 50,
      numOfReviews : 32,
      reviews: [],
    })
  
    await request.get("/api/v1/products")
      .expect(200)
      .then((response) => {
        // Check the response type
        expect(response.body).toBeTruthy()
   
        // Check the response data
        expect(response.body.name).toBe(product.name)
        expect(response.body.description).toBe(product.description)
      })
  })
  
  it("Gets a single product", async function () {
    
    const product = await Product.insertMany({
      id: 2,
      name : "test-name2",
      price : "45.80",
      description : "test description2",
      ratings : 4.5,
      category : "Electronics",
      seller : "test-seller",
      stock : 50,
      numOfReviews : 32,
      reviews: [],
    })
    
    await request.get(`/api/v1/product/${product.id}`)
    .expect(200)
    .then((response) => {
    expect(response.body.product).toHaveProperty("id");
    expect(response.body.product.id).toBe(product.id);
    });
  })
})


describe("DELETE /admin/product/:id", async function () {
  test("Deletes a single a product", async function () {
    const product = await Product.insertMany({
      id: 2,
      name : "test-name2",
      price : "45.80",
      description : "test description2",
      ratings : 4.5,
      category : "Electronics",
      seller : "test-seller",
      stock : 50,
      numOfReviews : 32,
      reviews: [],
    })
    const response = await request.delete(`/admin/product/${product.id}`)
    expect(response.body).toEqual({message: "Product deleted"});
  });
});

    /*
  it("Responds with 404 if can't find product", async function () {
    const response = await request.get(`/api/v1/product/999`)
    expect(response.statusCode).toBe(404);
  });
*/

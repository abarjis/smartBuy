const request = require('supertest');
const app = require('../server')
const DB = require('../models/Product')
const { setupDB } = require('../test-setup')

setupDB('smartbuy-test', true)


it('Testing to see if Jest works', () => {
        expect(1).toBe(1)
      })
   


describe(" /products", () => {

  it('should show all the result resource', async () => {
    await DB.create({ name : "test-name",
    price : "45.89",
    description : "test description",
    ratings : 4.5,
    category : "Tesla",
    seller : "test-seller",
    stock : 50,
    numOfReviews : 32,
    reviews: [] });

    const response = await request(app).get('/api/v1/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    });


    it("It responds with the newly created product", async done => {
      const newProduct = await request(app)
        .post("/product/new")
        .send({ name : "test-name2",
            price : "45.89",
            description : "test description",
            ratings : 4.5,
            category : "Tesla",
            seller : "test-seller",
            stock : 50,
            numOfReviews : 32,
            reviews: [] });
  
      // make sure we add it correctly

      expect(newProduct.statusCode).toBe(201);
  
      // make sure we have 3 students now
      const response = await request(app).get("/products");
      expect(response.body).toBeTruthy();
      expect(response.body.name).toBe("test-name2");
      expect(response.statusCode).toBe(200);
      done()
    });

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
  });

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
  describe("PATCH /product/:id", () => {
    test("It responds with an updated student", async () => {
      const newStudent = await request(app)
        .post("/students")
        .send({
          name: "Another one"
        });
      const updatedStudent = await request(app)
        .patch(`/students/${newStudent.body.id}`)
        .send({ name: "updated" });
      expect(updatedStudent.body.name).toBe("updated");
      expect(updatedStudent.body).toHaveProperty("id");
      expect(updatedStudent.statusCode).toBe(200);
  
      // make sure we have 3 students
      const response = await request(app).get("/students");
      expect(response.body.length).toBe(3);
    });
    */

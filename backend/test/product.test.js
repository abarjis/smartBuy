const request = require('supertest');
const app = require('../server')
const DB = require('../models/Product')
const { setupDB } = require('../test-setup')

setupDB('smartbuy-test', true)

describe('products', () => {

    it('Testing to see if Jest works', () => {
        expect(1).toBe(1)
      })


    it('should show all the result resource', async () => {
        await DB.create({ name : "test-name",
        price : "45.89",
        description : "test description",
        ratings : 4.5,
        category : "Electronics",
        seller : "test-seller",
        stock : 50,
        numOfReviews : 32,
        reviews: [] });

        const response = await request(app).get('/api/v1/products');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
        });
    });
    


describe("POST /products", () => {
    it("It responds with the newly created student", async () => {
      const newProduct = await request(app)
        .post("/admin/product/new")
        .send({ name : "test-name2",
            price : "45.89",
            description : "test description",
            ratings : 4.5,
            category : "Electronics",
            seller : "test-seller",
            stock : 50,
            numOfReviews : 32,
            reviews: [] });
  
      // make sure we add it correctly
      expect(newProduct.body.name).toBe("test-name2");
      expect(newProduct.statusCode).toBe(200);
  
      // make sure we have 3 students now
      const response = await request(app).get("/products");
      expect(response.body).toBeTruthy();
    });
  });


  describe("PATCH /students/1", () => {
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
  });
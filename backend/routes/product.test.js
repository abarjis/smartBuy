const app = require('../server')
const supertest = require('supertest')

const Product = require('../models/Product')
const { setupDB } = require('../routes/test-setup')


setupDB('smartbuy-test', true)
/*
it('Should save product to database', async done => {
  
  const res = await request.post('api/v1/admin/product/new')
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
  expect(res.body.name).toBeTruthy()
  expect(res.body.description).toBeTruthy()

  // Searches the user in the database
  const product = await Product.findOne({ name: "test-name" })
  expect(product.name).toBeTruthy()
  expect(product.description).toBeTruthy()

  done()
})

*/

test("GET /api/v1/products", async () => {
	const product = await Product.create({
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

	await supertest(app)
		.get("api/v1/products")
		.expect(200)
		.then((response) => {
			// Check the response type and length
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toEqual(1)

			// Check the response data
			expect(response.body.name).toBe(product.name)
			expect(response.body.description).toBe(product.description)
		})
})
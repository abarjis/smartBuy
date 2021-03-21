const request = require('supertest');
const app = require('../server')
const User = require('../models/User')
const { setupDB } = require('../test-setup')



setupDB('smartbuy-test', true)
  
const users = [
    {
      name: "Zell",
      email: "testing1@gmail.com",
      password: '12345678'
    },
    {
      name: "Vincy",
      email: "testing2@gmail.com",
      password: '12345678'
    },
    {
      name: "Shion",
      email: "testing3@gmail.com",
      password: '12345678'
    }
  ];

  beforeEach(async () => {
    await User.create(users);
  });

describe('User', () => {

    it('Testing to see if Jest works', () => {
        expect(1).toBe(1)
      })

    it('Should save user to database', async done => {
        const res = await request(app).post('/api/v1/register')
          .send({
          name: 'Zell',
          email: 'testing@gmail.com',
          password: '12345678'
          })

      // Searches the user in the database
        const user = await User.findOne({ email: 'testing@gmail.com' })
          expect(user.name).toBeTruthy()
         expect(user.email).toBeTruthy()
  
    done()
  });

    it('Should log user in', async done => {
        const res = await request(app).post('/api/v1/login')
            .send({
        email: 'testing1@gmail.com',
        password: '12345678'
        })

  // Searches the user in the database
        const user = await User.findOne({ email: 'testing1@gmail.com' })
            expect(user.name).toBeTruthy()
            expect(user.email).toBeTruthy()

        done()
        });

  

    it('Should log user out', async done => {
        const res = await request(app).post('/api/v1/logout')

    
      // Searches the user in the database
        //    const user = await User.findOne({ email: 'testing1@gmail.com' })
            expect(res.status).toBe(404)
    
            done()
            });
            


})

describe('User fail login', () => {


    it('Should fail log user in', async done => {
        const res = await request(app).post('/api/v1/login').send({
        email: 'testing25@gmail.com',
        password: '1234567825'
        })

  // Searches the user in the database
        expect(res.status).toBe(401)

        done()
        });



    it('fails with invalid credentials', async done => {
        const user = {email:'notarealmail@mycompany.com', password: 'somepassword'};
        const res = await request(app).post(`/api/v1/login`, user)
        expect(res.status).toBe(401)

        done()
  });



})
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Todo = require('../models/todoModels');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Test suite for the /todo routes on our api', () => {
  // /todo
  test('It should create a new todo in the db', async () => {
    return request(app)  
    .post('/todo')
    .send({
      title: 'Test Todo',
      description: 'Testing the creation of a todo',
      completed: false,
    })
    .expect(200)
    .then(({body}) => {
      console.log("Received: ", body)
    });

    



    // expect(response.statusCode).toBe(201);
    // expect(response.body.todo.title).toEqual(todoData.title);
    // expect(response.body.todo.description).toEqual(todoData.description);
    // expect(response.body.todo.completed).toEqual(todoData.completed);
  });

  // Add more test cases for other controllers (GET, PUT, DELETE)...
});
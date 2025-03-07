/**
 * @jest-environment node
 */
const app = require('../index.js');
const request = require('supertest');
const mongoose = require('mongoose');

require('dotenv').config();


beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/games');
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoose.disconnect();

  if (app) {
    app.close();
    console.log('server closed');
  }
});

const testId = '67ca7c478f04c2f743f67c2c';
const testEmail = 'jestTestUserLogin@test.com';
const testUsername = 'jestTestUserLogin';
const testPassword = 'jestTestUser123';

describe('API Routes', () => {

  describe('Default Routes', () => {

    it('should return intermediate index.html page for non-existent route', async () => {
      const response = await request(app).get('/api/dfjdsfk')
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('Board Together');
    });
  });


  describe('Auth Routes', () => {
    // it('should allow a user to signup', async () => {
    //   const testUser = `jestTestUser${Math.floor(Math.random() * 1000)}`;
    //   const res = await request(app)
    //     .post('/api/signup')
    //     .send({
    //       email: `${testUser}@test.com`,
    //       username: testUser,
    //       password: testPassword
    //     });

    //     expect(res.statusCode).toBe(200);
    //     expect(res.text).toBe('User created');
    // });

    it('should allow a user to login', async () => {
      const res = await request(app)
        .post('/api/signup')
        .send({
          email: testEmail,
          username: testUsername,
          password: testPassword
        });

      const res2 = await request(app)
        .post('/api/login')
        .send({
          email: testEmail,
          password: testPassword
        });

      expect(res2.statusCode).toBe(200);
      expect(res2.text).toBe('Logged In');
    });

    // verifyLogin
    // logOut
  });

  describe('Game Routes', () => {

    describe('Yahtzee Routes', () => {
      it('should create a new Yahtzee game', async () => {
        const res = await request(app)
          .post('/api/yahtzee')
          .send({
            room_name: 'jestTestRoom',
            players: 2,
            email: testEmail
          });

        expect(res.statusCode).toBe(201);
        expect(res.body.room_name).toBe('jestTestRoom');
        expect(res.body.players.length).toBe(2);
        });
    });

    describe('Scrabble Routes', () => {
      it('should create a new Scrabble game', async () => {
        const res = await request(app)
          .post('/api/scrabble')
          .send({
            room_name: 'jestTestRoom',
            players: 2,
            email: testEmail
          });

        expect(res.statusCode).toBe(201);
        expect(res.body.room_name).toBe('jestTestRoom');
        expect(res.body.players.length).toBe(2);
      });
    });

    describe('Clue Routes', () => {
      it('should create a new Clue game', async () => {
        const res = await request(app)
          .post('/api/clue')
          .send({
            room_name: 'jestTestRoom',
            players: 2,
            email: testEmail
          });

        expect(res.statusCode).toBe(201);
        expect(res.body.room_name).toBe('jestTestRoom');
        expect(res.body.players.length).toBe(2);
      });
    });

  });


  describe('Profile Routes', () => {

    describe('Messages Routes', () => {
      it('should create a new message', async () => {
        const res = await request(app)
          .post('/api/messages')
          .send({
            gameId: 'jestTestGameId',
            email: testEmail,
            message: 'jestTestMessage'
          });

        expect(res.statusCode).toBe(201);
      });

    });

    describe('Profile Routes', () => {
      it('should get a user profile', async () => {
        const res = await request(app)
          .get(`/api/profile/${testEmail}`);

        expect(res.statusCode).toBe(200);
      });

      it('should get a user\'s friends', async () => {
        const res = await request(app)
          .get(`/api/profile/username/${testUsername}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      })

      it('should add a friend to a user profile', async () => {
        const res = await request(app)
          .post(`/api/profile/${testId}/addFriend`)
          .send({
            email: testEmail,
            addUsername: 'jestTestFriend'
          });

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Friend added');
      });

      it('should delete a friend from a user profile', async () => {
        const res = await request(app)
          .put('/api/profile/deleteFriend')
          .send({
            email: testEmail,
            friendName: 'jestTestFriend'
          });
          console.log(res.statusCode, res.text, res.body);

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Friend deleted');
      });

    });
  });


});

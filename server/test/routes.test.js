/**
 * @jest-environment node
 */
const app = require('../index.js');
const request = require('supertest');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { ClueSession } = require('../db/models/games/clue.js');

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
      const res = await request(app).get('/api/dfjdsfk')
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain('Board Together');
    });

    it('should return a welcome message from the root route', async () => {
      const res = await request(app).get('/api');

      expect(res.statusCode).toBe(200);
      expect(res.text).toContain('Welcome to Board Together API');
    });
  });



  describe('Auth Routes', () => {

    afterEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
    });

    it('should allow a user to signup', async () => {
      const testUser = `jestTestUser${Math.floor(Math.random() * 1000)}`;
      const res = await request(app)
        .post('/api/signup')
        .send({
          email: `${testUser}@test.com`,
          username: testUser,
          password: testPassword
        });

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('User created');
    });

    it('should trigger the catch block if signup fails', async () => {
      jest.doMock('../controller/auth.js', () => ({
        createUser: jest.fn().mockRejectedValue(new Error('Signup failed'))
      }));
      const { createUser } = require('../controller/auth.js');

      const res = await request(app)
        .post('/api/signup')
        .send({
          email: 'falseUser@test.com',
          username: 'falseUser',
          password: 'falsePassword'
        });

      expect(res.statusCode).toBe(500);
    });

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

    // it('should trigger the catch block if login fails', async () => {
    //   jest.doMock('../controller/auth.js', () => ({
    //     signInUser: jest.fn().mockRejectedValue(new Error('Login failed'))
    //   }));
    //   const { signInUser } = require('../controller/auth.js');

    //   const res = await request(app)
    //     .post('/api/login')
    //     .send({
    //       email: 'falseUser@test.com',
    //       password: 'falsePassword'
    //     });

    //   console.log(res.text, res.statusCode)
    //   expect(res.statusCode).toBe(500);
    // });
    // logOut
  });

  describe('Game Routes', () => {

    describe('Yahtzee Routes', () => {
      let testGameId;

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
        testGameId = res.body._id;
        });

      it('should fetch an existing Yahtzee game', async () => {
        const res = await request(app)
          .get(`/api/yahtzee/${testGameId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(testGameId);
      });

      it('should update an existing Yahtzee game', async () => {
        const res = await request(app)
          .put(`/api/yahtzee/${testGameId}`)
          .send({
            players: [{name: 'player1'}, {name: 'player2'}, {name: 'player3'}]
          });

        expect(res.statusCode).toBe(200);
        expect(res.body.players.length).toBe(3);
      });

      it('should return 500 if Yahtzee creation fails', async () => {
        const res = await request(app)
          .post('/api/yahtzee')
          .send({
            room_name: {},
            players: null,
            email: []
          });

        expect(res.statusCode).toBe(500);
      });
    });

    describe('Scrabble Routes', () => {
      let testGameId;

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
        testGameId = res.body._id;
      });

      it('should fetch an existing Scrabble game', async () => {
        const res = await request(app)
          .get(`/api/scrabble/${testGameId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(testGameId);
      });

      it('should update an existing Scrabble game', async () => {
        const res = await request(app)
          .put(`/api/scrabble/${testGameId}`)
          .send({
            players: [{name: 'player1'}, {name: 'player2'}, {name: 'player3'}]
          });

        expect(res.statusCode).toBe(200);
        expect(res.body.players.length).toBe(3);
      });

      it('should return 500 if Scrabble creation fails', async () => {
        const res = await request(app)
          .post('/api/scrabble')
          .send({
            room_name: {},
            players: null,
            email: []
          });

        expect(res.statusCode).toBe(500);
      });

    });

    describe('Clue Routes', () => {
      let testGameId;
      let playerId;

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
        testGameId = res.body._id;
        playerId = res.body.players[0].player_id;
      });

      it('should get all messages for a game', async () => {
        const res = await request(app)
          .get(`/api/messages/${testGameId}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });

      it('should fetch an existing Clue game', async () => {
        const res = await request(app)
          .get(`/api/clue/${testGameId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(testGameId);
      });

      it('should update an existing Clue game', async () => {
        const res = await request(app)
          .put(`/api/clue/${testGameId}`)
          .send({
            playerId: playerId,
            category: 'suspects',
            name: 'Miss Scarlet'
          });

        expect(res.statusCode).toBe(200);
        expect(res.body.players[0].suspects['miss_scarlet']).toBe(true);
      });

      it('should update a player\'s name in a Clue game', async () => {
        const res = await request(app)
          .put(`/api/clue/${testGameId}/${playerId}`)
          .send({
            playerName: 'updatedJestTestPlayer'
          });

        expect(res.statusCode).toBe(200);
        expect(res.body.players[0].player_id).toBe('updatedJestTestPlayer');
      });

      it('should return 404 if Clue game is not found', async () => {
        const res = await request(app)
          .get('/api/clue/nonExistentGameId');

        expect(res.statusCode).toBe(404);
        expect(res.text).toContain('Error');
      });

      it('should trigger the catch block if Clue game lookup fails', async () => {
        jest.spyOn(ClueSession, 'findOne').mockRejectedValue(null);

        const res = await request(app)
          .get(`/api/clue/${testGameId}`);

        expect(res.statusCode).toBe(404);
      });

      it('should return 500 if Clue creation fails', async () => {
        const res = await request(app)
          .post('/api/clue')
          .send({
            room_name: {},
            players: null,
            email: []
          });

        expect(res.statusCode).toBe(500);
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

      it('should return 500 if message creation fails', async () => {
        const res = await request(app)
          .post('/api/messages')
          .send({
            gameId: 'jestTestGameId',
            email: !testEmail,
            message: 'jestTestMessage'
          });

        expect(res.statusCode).toBe(500);
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

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Friend deleted');
      });

      it('should add a profile picture to a user profile', async () => {
        const imgPath = path.resolve(__dirname, 'testImage.jpg');
        const res = await request(app)
          .put(`/api/profile/${testId}/profilePicture`)
          .attach('imageBlob', fs.readFileSync(imgPath), 'testImage.jpg');

        expect(res.statusCode).toBe(200);
      });

      it('should delete a game from a user profile', async () => {
        const testGameId = 'jestTestGameId';
        await request(app)
          .post(`/api/gameHistory`)
          .send({
            winner: 'testWinner',
            players: ['testPlayer1', 'testPlayer2'],
            gameKey: testGameId,
            email: testEmail,
            game: 'testGame'
          });

        const res = await request(app)
          .delete(`/api/profile/${testEmail}/${testGameId}`);

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Game deleted');
      });

      it('should fetch a user\'s game history', async () => {
        const res = await request(app)
          .get(`/api/gameHistory/${testEmail}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });

    });
  });


});

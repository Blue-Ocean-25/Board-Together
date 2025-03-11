# Board-Together

## Overview 
An app that digitizes scoresheets for classic games like Clue, Yahtzee, and Scrabble, promoting social interaction by uniting people through universally enjoyed games.


![Screenshot 2025-03-08 142400](https://github.com/user-attachments/assets/daed4d1d-f195-405d-ad11-37c8e6754418)

## Contributors
- [Aaron Taylor](https://github.com/Flourish1201)
- [Alberto Lovell](https://github.com/albertolovell)
- [Andrew Myronchuk](https://github.com/andrewmyronchuk) 
- [Austin Mallison](https://github.com/silvercricket)
- [Bonnie Tran](https://github.com/tranbonnie) 
- [Byron Work](https://github.com/bwork22) 
- [Kevin Laracuente](https://github.com/kevvarlar) 
- [Lucas Monteiro](https://github.com/lucascostamonteiro)

## Project Architecture
### Frontend
- React
- React Router Dom
- React Query for state management
- Tailwind (using PostCSS) with Daisy UI plugin
- Axios
- Webpack (HtmlWebpackPlugin for structuring initial HTML)
- PostCSS loader and Babel loader in conjunction with Webpack
- Swal for alerts
- Date Fns 

### Backend
- ExpressJS
- NodeJS
- MongoDB
- Mongoose 
- Firebase Auth
- Nodemon
- Multer

### Testing
- Jest
- Axios Mock Adapter
- React Testing
- Mocha
- Chai
- Supertest

## Features List
- User authentication
   - Signup/Login
- Profile
   - Details
   - Profile image upload
- Games
   - Game selection (Clue, Scrabble or Yahtzee)
   - Number of players selection
   - Scoresheets for each game
   - Join a game
   - Game history
   - Resume game
   - 
- Friends
   - Search for a friend's username
   - Add to friends list
   - Delete from friends list
 

## BoardTogether Setup
1. Clone this repo: `git clone https://github.com/Blue-Ocean-25/Board-Together.git`
2. Install dependencies: `npm install`
3. Create `.env` file based on example
4. Run commands `npm start`


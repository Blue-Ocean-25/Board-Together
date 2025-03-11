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
  

# ------------------------------------------------------------------------------ #
Template
Catchy headline / cool graphic
Who are the contributors (names should link to their github or portfolio page)
Introduction
This project was a brief 1-week sprint where our team tried to complete an MVP for an external user (Jane Doe)

Add any additional content here pertaining to the timeline, any personal goals, etc.
What does the app do?
* What problem does it solve? Who uses it?
* Why was it built?
* User Inputs and Outputs
*
Tech stack ( you can include logos)
Technical Challenges and research that you anticipated
* Why, what was the plan to overcome those challenges?
* What did you learn?
Challenges that were unexpected
* Why was it a challenge
* What did you learn?
Video Demo / Screen shot walkthrough of the app
* What were the user stories /  what was MVP (mention Minimal Viable Product)
How does the app work?
* What happens behind the scenes when the user interacts with it?
* OR What are all the places the data travels?  What happens to that data?
* Optionally include a diagram
* How does the tech stack come together?
What research was required?
Workflow and Key lessons from your team - specifically those related to: Agile, CI/CD, testing, working with external stakeholders, ticketing, and user stories.
* Your git workflow, style guides, commit guides, etc
* What did you learn from the process
* What were key takeaways from stand ups, code reviews, etc
* Writing tests
* Link to your trello board, discuss completed tickets
Any non-MVP tickets (optional)
Code refactorings
Performance Optimizations
Additional features
etc
Notes from your Sprint Retro
What additional features do you plan to add, how do you plan to implement those features?
* Future refactoring?
* Additional dev ops considerations?
* UI/UX additions?

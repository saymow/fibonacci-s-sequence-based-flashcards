<h1 align="center">:fire: Flash card Application :fire:</h1>

![execution gif](https://github.com/saymow/Fibonnaci-s-sequence-based-Flashcards/blob/master/.github/React-App.gif)

<br>

## 📋  About:

<p>&nbsp;&nbsp;&nbsp;&nbsp;This was my final project at <a href="https://cs50.harvard.edu/x/2020/">CS50</a> course and my first solo "big" application, so i used many libraries in order to learn them. <strong>Its definitely not completly done</strong>, so i'm going to maintain it, below has a <strong>to-do</strong> topic.</p>

## :rocket: Main technologies used:

### Frontend

- [ReactJS](https://reactjs.org/)
- [Unform](https://github.com/Rocketseat/unform)
- [Yup](https://github.com/jquense/yup)
- [DraftJS](https://draftjs.org/)
- [Axios](https://github.com/axios/axios)
- [Boostrap](https://react-bootstrap.github.io/)
- [Material-ui](https://material-ui.com/)

### Backend

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Jwt](https://jwt.io/)

### Database

- [Mysql](https://www.mysql.com/)

<br>

## :triangular_ruler:	How it works?

<p>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://en.wikipedia.org/wiki/Flashcard">Flash cards</a> are based on spaced repetition as you probably know, but what kind of repetition? Well, that's the point that things gets interesting, before i started this project i've searched in many forums and i've found out that its is not that hard, kinda easy though. Many of them are based on a basic math formula, called <a href=""https://en.wikipedia.org/wiki/Geometric_progression#:~:text=In%20mathematics%2C%20a%20geometric%20progression,progression%20with%20common%20ratio%203.>geometric progression</a>:</p>

<br>

> ### A<sub>n</sub> = A<sub>1</sub> x R<sup>n-k</sub>

<br>

<p>Where R is a constant, it could be called the <strong>constant of learning</strong>. But its very hard to determine the correct value R should have. Therefore, in this project i've decided to use the <a href="https://www.mathsisfun.com/numbers/fibonacci-sequence.html">fibonacci sequence</a> to calculate the revision time for each card.</p>

<br>

### Fibonacci sequence

<br>

<p align="center">
  <img align="center" src="https://i.imgur.com/8SV3G1u.gif">
</p>

<br>
<br>


<table >
  <tr>
    <th>
      Fibonnacci's sequence
    </th>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>5</td>
    <td>8</td>
    <td>13</td>
    <td>21</td>
    <td>34</td>
    <td>55</td>
  </tr>
  <tr>
    <th>
     Revision round
    </th>
    <td><strong>LP</strong></td>
    <td>1°</td>
    <td>2°</td>
    <td>3°</td>
    <td>4°</td>
    <td>5°</td>
    <td>6°</td>
    <td>7°</td>
    <td>8°</td>
    <td>9°</td>
    <td>10°</td>
  </tr>
<table>

<p><strong>LP</strong>: learning phase</p>

<br>

<p>Every single card has its own "log", so let's suppose that the user has a card in the 6° revision round, its log would be [5, 8]. Thus, when the user review the card there'd be these options:<p>

<p><strong>Reset</strong>: Reset the card and set it back to learning phase. After the learning phase its log is set to [1, 1], restarting the process.</p>

<p><strong>Easy</strong>: This option set the next revision to (5 + 2 * 8) = 21 days, this way setting the log to [13, 21], which means that the user skip the 7° round and goes straight forward to the 8° round.</p>

<p><strong>Good</strong>: This option is the obvious one, the user just keep the fibonnacci frequence and the next revision time is set to (5 + 8) = 13 days. Therefore setting the log to [8,13].</p>

<p><strong>Hard</strong>: The last one, just keep the log the same it is, meaning that the user doesnt evolved this card.</p>

<br>

## :pencil:	To-do list

<ul>
  <li>
  Add an option to edit a card while reviewing it.
  </li>
  <li>
  Use a library to control the context, therefore won't be needed any reload on the page.
  </li>
  <li>
  Some changes on limit_new_cards and limit_old_cards.
  </li>
</ul>

<br>

## :clipboard: How to use?

```
# Clone this repositoy
$ git clone git@github.com:saymow/Fibonacci-s-sequence-based-Flashcard.git

# Change into its directory
$ cd Fibonacci-s-sequence-based-Flashcard

# Change into its backend and frontend 

$ cd backend
$ cd frontend

# Run this commands in each of them

# Install dependencies
$ npm install

# Run application.
$ npm start
```

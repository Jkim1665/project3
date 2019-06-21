import React from 'react';


class TriviaOne extends React.Component {

    state ={
        question: "CSS stands for Creating Style Sheets",
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
    }

    componentDidMount() {
        this.questionsOne();
    }

    //array of all the questions
    questionsOne = () => {
        const questions = [

            {q: "What was the name of the shrimping business Forrest Gump started?", a1: "Jumbo Shrimp", a2: "Gump Shrimp", a3: "Shrimping Forrest", a4: "Bubba Gump Shrimp", c: "Bubba Gump Shrimp", im: "forrest.jpg"},
            {q: "In the movie Despicable Me, what was the name of the youngest of the three girls that Gru adopted? ", a1: "Agnes", a2: "Margo", a3: "Edith", a4: "Elsa", c: "Agnes", im: "agnes.gif"},
            {q: "What is the real name of Carlton Banks from Fresh Prince of Bel Air?", a1: "Carlton Smith", a2: "Alfonso Ribeiro", a3: "Freddy Willis", a4: "Jeff Albert", c: "Alfonso Ribeiro", im: "carlton.gif"},
            {q: "In the movie Lion King, what did Scar say to Mufasa right before he killed him?", a1: "Long live the king", a2: "I am the new king", a3: "This kingdom is mine", a4: "He didn't say anything", c: "Long live the king", im: "scar.gif"},
            {q: "Every week, the TV Guide comes to Chandler and Joey's apartment on the show Friends. What name appears on the address label?", a1: "Chandler and Joey", a2: "Chandelier Bing", a3: "Chanandeler Bong", a4: "Miss Bing", c: "Chanandeler Bong", im: "chandler.gif"},
            {q: "In the show The Simpsons, what is Grandpa Simpson's first name?", a1: "Waylon", a2: "Herbert", a3: "Nathaniel", a4: "Abraham", c: "Abraham", im: "simpson.gif"},
            {q: "In Iron Man 3, Tony Stark introduces a suit that can fly in separate pieces. What is the name of this suit?", a1: "Mark 42", a2: "Mark 38", a3: "Mark 25", a4: "Mark 50", c: "Mark 42", im: "mark42.gif"},
            {q: "Michael, from The Office, wrote a screenplay called Threat Level Midnight. What is name of the secret agent Michael created for himself?", a1: "Michael Scarn", a2: "Agent Smith", a3: "Detective Scott", a4: "Mike Ike", c: "Michael Scarn", im: "office.gif"},
            {q: "Phil's-osophy is a collection of wise words that Phil Dunphy from Modern Family wrote. Finish this phrase from the book. \"If you love something, set it free. __________\"", a1: "Way, way free.", a2: "Unless it is a tiger.", a3: "Then, chase after it right away!", a4: "You fool.", c: "Unless it is a tiger.", im: "modern.gif"},
            {q: "In the movie Shawshank Redemption, Andy Dufresne escapes through a tunnel that he dug over a long period of time. Where was the tunnel hidden?", a1: "Under his bed", a2: "In the yard, behind the bench", a3: "Behind his pillow", a4: "Behind a poster", c: "Behind a poster", im: "shawshank.gif"},
            {q: "In the children's show Arthur, what is D.W.'s full name?", a1: "Dora Winifred", a2: "Deena Wilt", a3: "Donna Witney", a4: "Denise Wendy", c: "Dora Winifred", im: "dw.gif"},
            {q: "In the show The Simpsons, what is the name of the street the Simpsons live on?", a1: "Springfield", a2: "Sansom", a3: "Evergreen", a4: "Brick", c: "Evergreen", im: "simpsonhouse.gif"},
            {q: "In Avengers: Infinity War, which was the last stone that Thanos collected?", a1: "Reality Stone", a2: "Soul Stone", a3: "Time Stone", a4: "Mind Stone", c: "Mind Stone", im: "infinity.gif"},
            {q: "Turkish, Brick Top, Boris The Blade, and Franky Four Fingers are all characters from what movie?", a1: "Lock, Stock, and Two Smoking Barrels", a2: "Snatch", a3: "Ocean's Eleven", a4: "Rock N Rolla", c: "Snatch", im: "snatch.gif"},
    
        ];

        const arrNum = Math.floor(Math.random() * 10);


        this.setState({
            question: questions[arrNum].q,
            answerOne: questions[arrNum].a1,
            answerTwo: questions[arrNum].a2,
            answerThree: questions[arrNum].a3,
            answerFour: questions[arrNum].a4,
        })

        console.log(questions[arrNum].q);
    }
  



    render() {
        return (
            <>
                <div>
                    <h2>Question #1</h2>
                    <div>
                        <p>True or False</p>
                        <p>{this.state.question}</p>
                    </div>
                    <form>
                    <button type="button" onClick={this.questionsOne}>{this.state.answerOne}</button>
                    <button type="button" onClick={this.questionsOne}>{this.state.answerTwo}</button>
                    <button type="button" onClick={this.questionsOne}>{this.state.answerThree}</button>
                    <button type="button" onClick={this.questionsOne}>{this.state.answerFour}</button>
                    </form>
                </div>
            </>
        )
    }


}


export default TriviaOne;







/********************
// Declare variables
// Variables to keep count of correct, incorrect and missed answers
var guessedCorrect = 0;
var guessedIncorrect = 0;
var missedAnswers = 0;

//variable to keep track of which question is being shown
var questionIndex = 0;

//variables for timers
var stopTimer;
var timerSet;


//game object to contain all game questions and functions.
var game = {

    //array of all the questions
    questions: [

        {q: "What was the name of the shrimping business Forrest Gump started?", a1: "Jumbo Shrimp", a2: "Gump Shrimp", a3: "Shrimping Forrest", a4: "Bubba Gump Shrimp", c: "Bubba Gump Shrimp", im: "forrest.jpg"},
        {q: "In the movie Despicable Me, what was the name of the youngest of the three girls that Gru adopted? ", a1: "Agnes", a2: "Margo", a3: "Edith", a4: "Elsa", c: "Agnes", im: "agnes.gif"},
        {q: "What is the real name of Carlton Banks from Fresh Prince of Bel Air?", a1: "Carlton Smith", a2: "Alfonso Ribeiro", a3: "Freddy Willis", a4: "Jeff Albert", c: "Alfonso Ribeiro", im: "carlton.gif"},
        {q: "In the movie Lion King, what did Scar say to Mufasa right before he killed him?", a1: "Long live the king", a2: "I am the new king", a3: "This kingdom is mine", a4: "He didn't say anything", c: "Long live the king", im: "scar.gif"},
        {q: "Every week, the TV Guide comes to Chandler and Joey's apartment on the show Friends. What name appears on the address label?", a1: "Chandler and Joey", a2: "Chandelier Bing", a3: "Chanandeler Bong", a4: "Miss Bing", c: "Chanandeler Bong", im: "chandler.gif"},
        {q: "In the show The Simpsons, what is Grandpa Simpson's first name?", a1: "Waylon", a2: "Herbert", a3: "Nathaniel", a4: "Abraham", c: "Abraham", im: "simpson.gif"},
        {q: "In Iron Man 3, Tony Stark introduces a suit that can fly in separate pieces. What is the name of this suit?", a1: "Mark 42", a2: "Mark 38", a3: "Mark 25", a4: "Mark 50", c: "Mark 42", im: "mark42.gif"},
        {q: "Michael, from The Office, wrote a screenplay called Threat Level Midnight. What is name of the secret agent Michael created for himself?", a1: "Michael Scarn", a2: "Agent Smith", a3: "Detective Scott", a4: "Mike Ike", c: "Michael Scarn", im: "office.gif"},
        {q: "Phil's-osophy is a collection of wise words that Phil Dunphy from Modern Family wrote. Finish this phrase from the book. \"If you love something, set it free. __________\"", a1: "Way, way free.", a2: "Unless it is a tiger.", a3: "Then, chase after it right away!", a4: "You fool.", c: "Unless it is a tiger.", im: "modern.gif"},
        {q: "In the movie Shawshank Redemption, Andy Dufresne escapes through a tunnel that he dug over a long period of time. Where was the tunnel hidden?", a1: "Under his bed", a2: "In the yard, behind the bench", a3: "Behind his pillow", a4: "Behind a poster", c: "Behind a poster", im: "shawshank.gif"},
        {q: "In the children's show Arthur, what is D.W.'s full name?", a1: "Dora Winifred", a2: "Deena Wilt", a3: "Donna Witney", a4: "Denise Wendy", c: "Dora Winifred", im: "dw.gif"},
        {q: "In the show The Simpsons, what is the name of the street the Simpsons live on?", a1: "Springfield", a2: "Sansom", a3: "Evergreen", a4: "Brick", c: "Evergreen", im: "simpsonhouse.gif"},
        {q: "In Avengers: Infinity War, which was the last stone that Thanos collected?", a1: "Reality Stone", a2: "Soul Stone", a3: "Time Stone", a4: "Mind Stone", c: "Mind Stone", im: "infinity.gif"},
        {q: "Turkish, Brick Top, Boris The Blade, and Franky Four Fingers are all characters from what movie?", a1: "Lock, Stock, and Two Smoking Barrels", a2: "Snatch", a3: "Ocean's Eleven", a4: "Rock N Rolla", c: "Snatch", im: "snatch.gif"},

    ],

    //This shows all the questions one by one as the game progresses
    renderQuestion: function() {

        //start the timer
        this.timerFunction();

        //questions and answers displayed
        if (questionIndex < this.questions.length) {

            $(".question").html(this.questions[questionIndex].q);
            $(".answers").html("<div class='answerButton' data-name='" + this.questions[questionIndex].a1 + "'>" + this.questions[questionIndex].a1 + "</div>");
            $(".answers").append("<div class='answerButton' data-name='" + this.questions[questionIndex].a2 + "'>" + this.questions[questionIndex].a2 + "</div>");
            $(".answers").append("<div class='answerButton' data-name='" + this.questions[questionIndex].a3 + "'>" + this.questions[questionIndex].a3 + "</div>");
            $(".answers").append("<div class='answerButton' data-name='" + this.questions[questionIndex].a4 + "'>" + this.questions[questionIndex].a4 + "</div>");

        } else {

            //stop the timer
            clearInterval(timerSet);
            $(".question").html("<div>Here are the results of the trivia!</div>");
            $(".answers").html("<div>Correct Answers: " + guessedCorrect);
            $(".answers").append("<div>Incorrect Answers: " + guessedIncorrect);
            $(".answers").append("<div>Unanswered: " + missedAnswers);

            $(".answers").append("<br><div class='restartButton'>Restart Game</div>" )

        }

    },

    //Once an answer is clicked this function gets applied
    renderAnswer: function() {

        //stop the timer
        clearInterval(timerSet);

        //grabs the data name of the button pressed and assigns it to dataName
        var dataName = $(this).attr("data-name");

        //console to show which is being pressed
        console.log(dataName);

        //if the button clicked is same as correct answer, do this
        if (dataName === game.questions[questionIndex].c) {

            //increase Correct answers
            guessedCorrect++;

            console.log("correct: " + guessedCorrect);
            console.log("qindex: " + questionIndex);

            //show the user is correct
            $(".question").html("Correct!");
            $(".answers").html("<div>" + game.questions[questionIndex].c + "</div>");
            $(".answers").append("<br><div><img src='assets/images/" + game.questions[questionIndex].im + "'></div>");

        } else {

            //increase incorrect answers
            guessedIncorrect++;

            console.log("Incorrect: " + guessedIncorrect);
            console.log("qindex: " + questionIndex);

            //show the user is incorrect and show correct answer
            $(".question").html("Sorry, that was incorrect!");
            $(".answers").html("<div>The correct answer is: " + game.questions[questionIndex].c + "</div>");
            $(".answers").append("<br><div><img src='assets/images/" + game.questions[questionIndex].im + "'></div>");
        }

        //increase question index to next value
        questionIndex++;
        console.log("qindex: " + questionIndex);

        //window time out
        var windowTimeout = setTimeout(function() {
            game.renderQuestion();
          }, 4500);


    },

    answerView: function() {

        $(".question").html("The correct answer is");
        $(".answers").html("<div class='answerButton' data-name='" + this.questions[questionIndex].a1 + "'>" + this.questions[questionIndex].a1 + "</div>");
        $(".answers").append("<div class='answerButton' data-name='" + this.questions[questionIndex].a2 + "'>" + this.questions[questionIndex].a2 + "</div>");

    },

    timerFunction: function() {

            //timer set initially to 15 seconds
            var timeLeft = 15;

            //initially show timer at 15 seconds
            $(".timer").html("Time Remaining: " + timeLeft + " seconds");

            //timeLeft is set to intervals of 1 second
            timerSet = setInterval(myTimer, 1000);

            //timer function to decrease timeLeft by increments of 1 and update
            function myTimer(){
                timeLeft--;
                $(".timer").html("Time Remaining: " + timeLeft + " seconds");
                stopTimer();
            }

            //stop time function when timeLeft equals zero
            stopTimer = function() {
                if (timeLeft === 0) {
                    console.log(timeLeft);
                    //if time reaches zero, go to answer screen

                    //increase missed answers
                    missedAnswers++;
                    console.log("missed: " + missedAnswers);

                    //show the user is incorrect and show correct answer
                    $(".question").html("You ran out of time!");
                    $(".answers").html("<div>The correct answer is: " + game.questions[questionIndex].c + "</div>");
                    $(".answers").append("<br><div><img src='assets/images/" + game.questions[questionIndex].im + "'></div>");

                    questionIndex++;
                    console.log("qindex: " + questionIndex);

                    clearInterval(timerSet);

                    //window time out
                    var windowTimeout = setTimeout(function() {
                        game.renderQuestion();
                    }, 4500);

                }
            }
    },

    resetGame: function() {
        guessedCorrect = 0;
        guessedIncorrect = 0;
        missedAnswers = 0;

        questionIndex = 0;

        game.renderQuestion();
    }


}

******************************************/
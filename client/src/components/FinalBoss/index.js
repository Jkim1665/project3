import React from 'react';
import store from "../../config/store";
import { connect } from 'react-redux';

class TriviaOne extends React.Component {

    state ={
        shuffledQuestions: [],
        question: "",
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
        correctAnswer: "",
        questionNum: "",
        questionIndex: 0,
    }

    componentDidMount() {
        this.shuffleArray();
    }


    //function to increase coin count
    increaseCoins = () => {
   
        const newCoin = this.props.coin + 1;

        store.dispatch({
            type: 'ADD_COIN',
            payload: {
                coin: newCoin,
            }
        })

        this.questionsOne();
    }

    answeredQuestion = (answer) => {

        console.log(answer.target.value);
        if (answer.target.value === this.state.correctAnswer) {
            this.increaseCoins();
        } else {
            this.questionsOne();
        }

        const newQuestIndex = this.questionIndex + 1;

        this.setState({
            questionIndex: newQuestIndex,
        })
      

    }

    //Fisher-Yates Shuffle
    shuffle = (array) => {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
    }


    shuffleArray = () => {
        const questions = [

            {q: "The answer is answerOne ?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerOne", im: "forrest.jpg"},
            {q: "The answer is answerTwo?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerTwo", im: "agnes.gif"},
            {q: "The answer is answerThree?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerThree", im: "carlton.gif"},
            {q: "The answer is answerFour?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerFour", im: "scar.gif"},
            {q: "The answer is answerFive ?", a1: "answerOne", a2: "answerTwo", a3: "answerFive", a4: "answerFour", c: "answerFive", im: "forrest.jpg"},
            {q: "The answer is answerSix?", a1: "answerSix", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerSix", im: "agnes.gif"},
            {q: "The answer is answerSeven?", a1: "answerOne", a2: "answerSeven", a3: "answerThree", a4: "answerFour", c: "answerSeven", im: "carlton.gif"},
            {q: "The answer is answerEight?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerEight", c: "answerEight", im: "scar.gif"},

        ];

         //shuffle questions
        let newQuestions = this.shuffle(questions);

        console.log(newQuestions);
        console.log(this.state)
        this.setState({
            shuffledQuestions: newQuestions,
        });

        this.questionsOne();
    }


    //play game with shuffled array
    questionsOne = () => {

        let newQues = this.state.shuffledQuestions;
        let questIndex = this.state.questionIndex
console.log(newQues)
        if (questIndex < newQues.length) {

            this.setState({
                question: newQues[questIndex].q,
                answerOne: newQues[questIndex].a1,
                answerTwo: newQues[questIndex].a2,
                answerThree: newQues[questIndex].a3,
                answerFour: newQues[questIndex].a4,
                correctAnswer: newQues[questIndex].c,
                questionNum: "Question #" + questIndex,
            })

        } else {
            this.setState({
                question: "You have completed this question set. Close and try again.",
                questionNum: ""
            })
        }
      

    }
  



    render() {
        return (
            <>
                <div>
                    <h2>{this.state.questionNum}</h2>
                    <div>
                        <p>{this.state.question}</p>
                    </div>
                    <form>
                    <button type="button" onClick={this.answeredQuestion} value={this.state.answerOne}>{this.state.answerOne}</button>
                    <button type="button" onClick={this.answeredQuestion} value={this.state.answerTwo}>{this.state.answerTwo}</button>
                    <button type="button" onClick={this.answeredQuestion} value={this.state.answerThree}>{this.state.answerThree}</button>
                    <button type="button" onClick={this.answeredQuestion} value={this.state.answerFour}>{this.state.answerFour}</button>
                    </form>
                </div>
            </>
        )
    }


}


const mapStateToProps = state => {
    return {
      coin: state.coin.coin,
    }
  }
  
  export default connect(mapStateToProps)(TriviaOne);
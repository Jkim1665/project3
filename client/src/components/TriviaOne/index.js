import React from 'react';
import store from "../../config/store";
import { connect } from 'react-redux';

class TriviaOne extends React.Component {

    state ={
        question: "CSS stands for Creating Style Sheets",
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
        correctAnswer: "",
    }

    componentDidMount() {
        this.questionsOne();
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
     
    }

    //array of all the questions
    questionsOne = () => {

        const questions = [

            {q: "The answer is answerOne ?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerOne", im: "forrest.jpg"},
            {q: "The answer is answerTwo?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerTwo", im: "agnes.gif"},
            {q: "The answer is answerThree?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerThree", im: "carlton.gif"},
            {q: "The answer is answerFour?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerFour", im: "scar.gif"},

        ];

        const arrNum = Math.floor(Math.random() * 4);

        this.setState({
            question: questions[arrNum].q,
            answerOne: questions[arrNum].a1,
            answerTwo: questions[arrNum].a2,
            answerThree: questions[arrNum].a3,
            answerFour: questions[arrNum].a4,
            correctAnswer: questions[arrNum].c
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
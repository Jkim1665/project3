import React from 'react';
import store from "../../config/store";
import { connect } from 'react-redux';

class FinalBoss extends React.Component {

    state ={
        questions: [
            {q: "The answer is answerOne?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerOne"},
            {q: "The answer is answerTwo?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerTwo"},
            {q: "The answer is answerThree?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerThree"},
            {q: "The answer is answerFour?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerFour"},
            {q: "The answer is answerFive?", a1: "answerFive", a2: "answerTwo", a3: "answerThree", a4: "answerFour", c: "answerFive"},
            {q: "The answer is answerSix?", a1: "answerOne", a2: "answerSix", a3: "answerThree", a4: "answerFour", c: "answerSix"},
            {q: "The answer is answerSeven?", a1: "answerOne", a2: "answerTwo", a3: "answerSeven", a4: "answerFour", c: "answerSeven"},
            {q: "The answer is answerEight?", a1: "answerOne", a2: "answerTwo", a3: "answerThree", a4: "answerEight", c: "answerEight"},
        ],
        question: "",
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
        correctAnswer: "",
        questionIndex: 0,
        questionNum: "",
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

    //set state to next question
    questionsOne = () => {

        const questIndex = this.state.questionIndex + 1;

        if (this.state.questionIndex < this.state.questions.length) {
            const questions = this.state.questions[this.state.questionIndex];

            this.setState({
                question: questions.q,
                answerOne: questions.a1,
                answerTwo: questions.a2,
                answerThree: questions.a3,
                answerFour: questions.a4,
                correctAnswer: questions.c,
                questionNum: "Question #" + questIndex,
                questionIndex: questIndex,
            });
        } else {
            this.setState({
                question: "You have completed this set of questions.",
                questionNum: "",
                answerOne: "",
                answerTwo: "",
                answerThree: "",
                answerFour: "",
                correctAnswer: "",
                questionIndex: 0,
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
  
  export default connect(mapStateToProps)(FinalBoss);
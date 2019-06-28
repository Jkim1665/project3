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
        answersCorrect: 0,
        finalScore: "",
        resultButton: "",
    }

    componentDidMount() {
        this.questionsOne();
    }


    //function to increase coin count
    increaseCoins = () => {

        console.log(this.state.answersCorrect + " first")
        const correctAns = this.state.answersCorrect + 1;

        console.log(correctAns + " correct answers")
        this.setState({
            answersCorrect: correctAns,
        });
        console.log(this.state.answersCorrect + " second")
        this.questionsOne();
       
    }

    answeredQuestion = (answer) => {

        if (answer.target.value === this.state.correctAnswer) {
            this.increaseCoins();
        } else {
            this.questionsOne();
        }

    }


    //set state to next question or show end results
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
            if(this.answersCorrect >= 8) {
                this.setState({
                    question: "You passed the interview! Welcome to Google!",
                    questionNum: "Congratulations!",
                    answerOne: "",
                    answerTwo: "",
                    answerThree: "",
                    answerFour: "",
                    correctAnswer: "",
                    questionIndex: 0,
                    finalScore: "Your score: " + this.state.answersCorrect + ".",
                    resultButton: "Restart Game"
                });
            } else {
                this.setState({
                    question: "You were not able to pass the interview this time. You will have to study some more to reach level 3 again.",
                    questionNum: "Sorry Jack...",
                    answerOne: "",
                    answerTwo: "",
                    answerThree: "",
                    answerFour: "",
                    correctAnswer: "",
                    questionIndex: 0,
                    finalScore: "Your score: " + this.state.answersCorrect + ".",
                    resultButton: "Close",
                });
                store.dispatch({
                    type:"UPGRADE_PLAYER",
                    payload: {
                        level: 0,
                    }
                });
            }

        }
    }


    endGame = () => {
        if(this.answersCorrect >= 8) {
            window.location.reload();
        } else {
            store.dispatch({
                type: 'MODAL_OPEN',
                payload: {
                  isAnyModalOpen: false,
                  modalFinalisOpen: false,
                }
              });
        }
    }


    render() {
        return (
            <>
                <div>
                    <h2>{this.state.questionNum}</h2>
                    <div>
                        <p>{this.state.question}</p>
                        <p>{this.state.finalScore}</p>
                    </div>
                    <form>
                        {this.state.answerOne && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerOne}>{this.state.answerOne}</button>}
                        {this.state.answerTwo && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerTwo}>{this.state.answerTwo}</button>}
                        {this.state.answerThree && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerThree}>{this.state.answerThree}</button>}
                        {this.state.answerFour && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerFour}>{this.state.answerFour}</button>}
                        {this.state.resultButton && <button type="button" className="button" onClick={this.endGame}>{this.state.resultButton}</button>}
                    </form>
            </div>
            </>
        )
    }


}


const mapStateToProps = state => {
    return {
      coin: state.coin.coin,
      modalFinalisOpen: state.modal.modalFinalisOpen,
    }
  }

  export default connect(mapStateToProps)(FinalBoss);
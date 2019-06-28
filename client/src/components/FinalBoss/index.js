import React from 'react';
import store from "../../config/store";
import { connect } from 'react-redux';

class FinalBoss extends React.Component {

    state ={
        questions: [
            {q: "An array must contain only strings.", a1: "True", a2: "False", a3: "", a4: "", c: "False"},
            {q: "Which of these is NOT a database function?", a1: "Delete", a2: "Update", a3: "Remove", a4: "Create", c: "Remove"},
            {q: "Which loop is BEST used to iterate through a tree data structure?", a1: "while loop", a2: "for loop", a3: "tree loop", a4: "for-each loop", c: "while loop"},
            {q: "What does ORM stand for?", a1: "Object Relational Model", a2: "Object Rest Mapping", a3: "Option Relation Model", a4: "Object Relational Mapping", c: "Object Relational Mapping"},
            {q: "Using git, how do you create a new branch?", a1: "git new <newbranch>", a2: "git branch <newbranch>", a3: "git b <newbranch>", a4: "git newB <newbranch>", c: "git branch <newbranch>"},
            {q: "What does === mean in JavaScript?", a1: "assignment operator", a2: "strict equality", a3: "does not equal", a4: "loose equality", c: "strict equality"},
            {q: "Which of these are NOT one of the four pillars of object oriented programming?", a1: "Abstraction", a2: "Structure", a3: "Inheritance", a4: "Polymorphism", c: "Structure"},
            {q: "What key word is used to choose which database to use?", a1: "select", a2: "use", a3: "switch", a4: "database", c: "use"},
            {q: "What is ReactJS?", a1: "Server side framework", a2: "User-interface framework", a3: "A library for building UI", a4: "A database system", c: "A library for building UI"},
            {q: "What http method would you use to update an entry in a database?", a1: "PUT", a2: "POST", a3: "UPDATE", a4: "REVISE", c: "PUT"},
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
        intro: 0,
    }

    componentDidMount() {
        this.questionsOne();
    }


    //function to increase coin count
    increaseCoins = () => {

        const correctAns = this.state.answersCorrect + 1;

        this.setState({
            answersCorrect: correctAns,
        }, () => {  this.questionsOne(); });
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

        if (this.state.intro === 0) {
            this.setState({
                question: "You will be asked a series of questions. If you answer 8 or more questions correctly, you will pass this interview. If you cannot answer at least 8 questions correctly, you will go back down to level zero and will have to work your way back up again.",
                questionNum: "Welcome to the final interview!",
                intro: 1,
            });
        } else if ((this.state.questionIndex < this.state.questions.length) && (this.state.intro !== 0)) {
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
                intro: 2,
            });
        } else {
            if(this.state.answersCorrect >= 8) {
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
        if(this.state.answersCorrect >= 8) {
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
                    <h2 style={{
                        marginTop: "100px",
                    }}>{this.state.questionNum}</h2>
                    <div>
                        <p>{this.state.question}</p>
                        <p>{this.state.finalScore}</p>
                    </div>
                    <form>
                        {this.state.answerOne && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerOne}>{this.state.answerOne}</button>}
                        {this.state.answerTwo && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerTwo}>{this.state.answerTwo}</button>}
                        {this.state.answerThree && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerThree}>{this.state.answerThree}</button>}
                        {this.state.answerFour && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerFour}>{this.state.answerFour}</button>}
                        {this.state.resultButton && <button type="button" onClick={this.endGame}>{this.state.resultButton}</button>}
                        {this.state.intro <= 1 && <button type="button" onClick={this.questionsOne}>Got it!</button>}
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
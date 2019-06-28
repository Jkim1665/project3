import React from 'react';
import store from "../../config/store";
import { connect } from 'react-redux';

class TriviaTwo extends React.Component {

    state ={
        questions: [
            {q: "State can be initialized when code is loaded or state can be set on event changes.", a1: "True", a2: "False", a3: "", a4: "", c: "True"},
            {q: "React merges the object you provide into the current state using _________.", a1: "state()", a2: "changeState()", a3: "updateState()", a4: "setState()", c: "setState()"},
            {q: "Arbitrary inputs of components are called _________.", a1: "keys", a2: "props", a3: "elements", a4: "ref", c: "props"},
            {q: "________ can be done while more than one element needs to be returned from a component.", a1: "Wrapping", a2: "Insulation", a3: "Packing", a4: "Abstraction", c: "Wrapping"},
            {q: "Which of the following needs to be updated to achieve dynamic UI updates?", a1: "props", a2: "state", a3: "classes", a4: "map", c: "state"},
            {q: "Lifecycle methods are mainly used __________.", a1: "to keep track of event history", a2: "to enhance components", a3: "to free up resources", a4: "", c: "to free up resources"},
            {q: "Ref is used to refer an element/component returned by __________.", a1: "react()", a2: "render()", a3: "reduce()", a4: "refer()", c: "render()"},
            {q: "In JSX, most of the errors can be caught during ________.", a1: "interpretation", a2: "execution", a3: "compilation", a4: "build", c: "compilation"},
            {q: "Components cannot refer to other components in their output.", a1: "True", a2: "False", a3: "", a4: "", c: "False"},
            {q: "JSX is faster because it performs _________ while compiling code to JavaScript.", a1: "modification", a2: "compression", a3: "optimization", a4: "encryption", c: "optimization"},
            {q: "If our elements are dynamic, react can keep track of the changes using keys.", a1: "True", a2: "False", a3: "", a4: "", c: "True"},
            {q: "A function that does not change its results for the same set of inputs is called a _________.", a1: "pure function", a2: "impure function", a3: "", a4: "", c: "pure function"},
            {q: "What is the smallest building block of ReactJS?", a1: "props", a2: "elements", a3: "components", a4: "", c: "elements"},
            {q: "An altered component may be uniquely indentified with the help of ref.", a1: "True", a2: "False", a3: "", a4: "", c: "False"},
            {q: "React considers everything as ________.", a1: "user interface", a2: "elements", a3: "components", a4: "objects", c: "components"},
            {q: "React is mainly for building _________.", a1: "databases", a2: "connectivity", a3: "user interfaces", a4: "design platforms", c: "user interfaces"},
            {q: "In react, state can be accessed using ________.", a1: "current", a2: "state", a3: "getState()", a4: "state()", c: "state"},
            {q: "What is invoked once, only on the client, after rendering occues?", a1: "componentWillUnmount", a2: "shouldComponentUpdate", a3: "componentWillMount", a4: "componentDidMount", c: "componentDidMount"},
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
                question: "You have completed this set of questions. If you haven't yet, make sure to visit Will and Guillermo to practice more coding questions! You can find Guillermo in the building next door, and Will should be in the woods.",
                questionNum: "Good job!",
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
                        {this.state.answerOne && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerOne}>{this.state.answerOne}</button>}
                        {this.state.answerTwo && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerTwo}>{this.state.answerTwo}</button>}
                        {this.state.answerThree && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerThree}>{this.state.answerThree}</button>}
                        {this.state.answerFour && <button type="button" className="buttonQ" onClick={this.answeredQuestion} value={this.state.answerFour}>{this.state.answerFour}</button>}
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
  
  export default connect(mapStateToProps)(TriviaTwo);
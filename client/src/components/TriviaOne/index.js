import React from 'react';
import store from "../../config/store";
import { connect } from 'react-redux';


class TriviaOne extends React.Component {

    state ={
        questions: [
            {q: "Is JavaScript a case-sensitive language?", a1: "Yes", a2: "No", a3: "", a4: "", c: "Yes"},
            {q: "How can you get the total number of arguments passed to a function?", a1: "args.length", a2: "arguments.length", a3: "Both of the above", a4: "None of the above", c: "arguments.length"},
            {q: "Which built-in method returns the length of the string?", a1: "length()", a2: "size()", a3: "index()", a4: "number()", c: "length()"},
            {q: "Which built-in method reverses the order of the elements of an array?", a1: "changeOrder(order)", a2: "reverse()", a3: "sort(order)", a4: "backwards()", c: "reverse()"},
            {q: "Which of the following function of Number object returns the number's value?", a1: "toString()", a2: "valueOf()", a3: "toLocaleString()", a4: "toPrecision()", c: "valueOf()"},
            {q: "Which of the following function of String object returns the index within the calling String object of the first occurrence of the specified value?", a1: "substr()", a2: "search()", a3: "lastIndexOf()", a4: "indexOf()", c: "indexOf()"},
            {q: "Which of the following function of String object returns the calling string value converted to lower case while respecting the current locale?", a1: "toLocaleLowerCase()", a2: "toLowerCase()", a3: "toString()", a4: "subString()", c: "toLocaleLowerCase()"},
            {q: "Which of the following function of String object creates an HTML hypertext link that requests another URL?", a1: "link()", a2: "sub()", a3: "url()", a4: "small()", c: "link()"},
            {q: "Which of the following function of Array object creates a new array with all of the elements of this array for which the provided filtering function returns true?", a1: "concat()", a2: "every()", a3: "filter()", a4: "some()", c: "filter()"},
            {q: "Which of the following function of Array object returns true if at least one element in this array satisfies the provided testing function??", a1: "reverse()", a2: "shift()", a3: "slice()", a4: "some()", c: "some()"},
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
                question: "You have completed this set of questions. Make sure to visit Steven and Guillermo to practice more coding questions! Steven should be at the school, and Guillermo is at the lemonade stand. Also, there are hints around the map so make sure to look for them!",
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
                    <div style={{
                            textAlign: "center",
                            width: "75%",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}>
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
  
  export default connect(mapStateToProps)(TriviaOne);
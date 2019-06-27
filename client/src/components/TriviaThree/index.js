import React from 'react';
import store from "../../config/store";
import { connect } from 'react-redux';

class TriviaThree extends React.Component {

    state ={
        questions: [
            {q: "What does CSS stand for?", a1: "Collection Style Sheet", a2: "Cascading Style Sheet", a3: "Complete Style Sheet", a4: "Cascading Style Syntax", c: "Cascading Style Sheet"},
            {q: "What does HTML stand for?", a1: "High Traffic Markup Language", a2: "Hyperlinks and Text Markup Language", a3: "Hashtag and Text Markup Language", a4: "Hypertext Markup Language", c: "Hypertext Markup Language"},
            {q: "Where in the HTML document is the correct place to refer to an external style sheet?", a1: "In the <head> section", a2: "In the <body> section", a3: "In the <p> section", a4: "In the <header> section", c: "In the <head> section"},
            {q: "Which is the correct HTML element for inserting a line break?", a1: "<break>", a2: "<line break>", a3: "<br>", a4: "<lb>", c: "<br>"},
            {q: "Which is the correct HTML for adding a background color?", a1: "<background>yellow</background>", a2: "<body style='background-color: yellow;'>", a3: "<body bg='yellow'>", a4: "<background style=yellow>", c: "<body style='background-color: yellow;'>"},
            {q: "What is the correct HTML for referring to an external style sheet?", a1: "<link rel='stylesheet' type='text/css' href='mystyle.css'>", a2: "<stylesheet>mystyle.css</stylesheet>", a3: "<style src='mystyle.css'>", a4: "<css.style.mystyle>", c: "<link rel='stylesheet' type='text/css' href='mystyle.css'>"},
            {q: "Which is the correct CSS syntax?", a1: "{body;color:green;}", a2: "body {color: green;}", a3: "{body:color= green;}", a4: "body: color= green;", c: "body {color: green;}"},
            {q: "What is the correct HTML for creating a hyperlink?", a1: "<a href='http://www.Jack.com'>Jack</a>", a2: "<a>http://www.Jack.com</a>", a3: "<a hyperlink='http://www.Jack.com'>Jack</a>", a4: "<a url='http://www.Jack.com'>www.Jack.com</a>", c: "<a href='http://www.Jack.com'>Jack</a>"},
            {q: "How do you insert a comment in a CSS file?", a1: "**comment this**", a2: "<--comment this-->", a3: "/*comment this*/", a4: "//comment this//", c: "/*comment this*/"},
            {q: "Which attribute is used to show that an input field must be filled out in HTML?", a1: "validate", a2: "require", a3: "necessary", a4: "mustFill", c: "require"},
            {q: "How do you insert a comment in an HTML file?", a1: "**comment this**", a2: "<!--comment this-->", a3: "/*comment this*/", a4: "$comment this$", c: "<!--comment this-->"},
            {q: "adfasdg", a1: "changeOrde", a2: "reverse", a3: "sort", a4: "backwards", c: "reverse"},
            {q: "adfasdg", a1: "changeOrde", a2: "reverse", a3: "sort", a4: "backwards", c: "reverse"},
            {q: "adfasdg", a1: "changeOrde", a2: "reverse", a3: "sort", a4: "backwards", c: "reverse"},
            {q: "adfasdg", a1: "changeOrde", a2: "reverse", a3: "sort", a4: "backwards", c: "reverse"},
            {q: "adfasdg", a1: "changeOrde", a2: "reverse", a3: "sort", a4: "backwards", c: "reverse"},
            {q: "adfasdg", a1: "changeOrde", a2: "reverse", a3: "sort", a4: "backwards", c: "reverse"},
            {q: "adfasdg", a1: "changeOrde", a2: "reverse", a3: "sort", a4: "backwards", c: "reverse"},
            {q: "adfasdg", a1: "changeOrde", a2: "reverse", a3: "sort", a4: "backwards", c: "reverse"},
            {q: "adfasdg", a1: "changeOrde", a2: "reverse", a3: "sort", a4: "backwards", c: "reverse"},
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
                question: "You have completed this set of questions. If you haven't yet, make sure to visit Steven and Will to practice more coding questions! Steven is at the school, which is at the far east end of the map, and Will should be in the woods, which is located at the west end of the map. Be careful when visiting Will, you might encounter some bears!",
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
  
  export default connect(mapStateToProps)(TriviaThree);
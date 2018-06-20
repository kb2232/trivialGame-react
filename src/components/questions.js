import React from 'react';

class QuestionPanel extends React.Component 
{
  constructor(props) {
    super(props);
  }
 
  render() {
  
    if (this.props.activeGame) {
      return ( <div className="text-center">
                  <p className="question-panel">{ this.props.question }</p>
               </div> )
    } else {
      return ( <div className="text-center">
                 <p className="question-panel message">Game Over</p>
                 <div className="hyperlink-button">
                   <a onClick={ this.props.resetGame } href="#">Restart</a>
                 </div>
               </div>);
    }
  }
}

class Option extends React.Component 
{ 
  render() {
    return <div><a href="#"
              onClick={ this.props.triggerProcess } 
              className="option-card">
            { this.props.optionValue }
           </a></div>;
  }
}

class StatusDisplay extends React.Component {
  render() {
    return (<div className="status-display text-center">
                  <p>Correct: { this.props.correct }</p>
                  <p>Incorrect: { this.props.incorrect }</p>
            </div>)
  }
}

class GameBoard extends React.Component {
  constructor(props) {
    super(props); 
    
    this.processGuess = this.processGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
    
    this.state = {
      currentIndex: 0,
      correct: 0,
      incorrect: 0,
      activeGame: true,
      questionsAnswer: [
        { // 1
          question: 'what is the correct way to initialize the state of an object ?',
          options: ["this.state = ", "this.setState = ", "this.setState() ", "this.state() "],
          answer: "this.state = "
        },
        { // 2
          question: 'what is the correct way to update the state of an object ?',
          options: [ "this.state = ", "this.setState = ...", "this.setState({...}) ", "this.state() "],
          answer: "this.setState({...}) "
        },
        { // 3
          question: 'What is 10 - 6 ?',
          options: [ 2, 4, 10, 7],
          answer: 4
        },
        { // 4
          question: 'What is 12 % 3 ?',
          options: [ 4, 1, 0, 8],
          answer: 0
        },
        { // 5
          question: 'What comes down and never goes up ?',
          options: [ "taxes", "stars", "wind", "rain"],
          answer: "rain"
        },
        { // 6
          question: 'what motivates you?',
          options: [ "hard work", "results", "failure", "money"],
          answer: "failure"
        },
        { // 7
          question: 'React is way more efficient at manipulating the DOM?',
          options: [ "cannot be determined", "false", "nope", "true"],
          answer: "true"
        },
        { // 8
          question: 'What is 2 + 5 ?',
          options: [ 10, 7, 8, 6],
          answer: 7
        },
        { // 9
          question: 'The root of all evil is ',
          options: [ "money", 'humans', "lack of money", 'love'],
          answer: "lack of money"
        },
        { // 10
          question: 'What are the three common states of water',
          options: [ "solid, liquid, gas", "carbon, graphite, meta-state", "solid, condensed matter, crystaline", "plasma, liquid, gas"],
          answer: "solid, liquid, gas"
        }
      ]
    };
  }
  
  resetGame() {
    this.setState({
      currentIndex: 0,
      correct: 0,
      incorrect: 0,
      activeGame: true
    });
  }
  
  processGuess(e) { 
    
   if (this.state.currentIndex + 1 === this.state.questionsAnswer.length) { 
       this.setState( { activeGame: false } );
     
       return;
   }
   // For accomplishing a better readible equality-check.
   let answer = parseInt(e.target.textContent);
   let correctAnswer = 
       parseInt(
          this.state.questionsAnswer[this.state.currentIndex]['answer']
        );
    
   if ( answer === correctAnswer ) {
       this.setState( {correct: this.state.correct + 1} );
   } else {
       this.setState( {incorrect: this.state.incorrect + 1} );
   } 
    
   this.setState( {currentIndex: this.state.currentIndex + 1} );
  }
  
  render() {
    var options = [];
    
    if (this.state.activeGame) {
      for (let i = 0; i < this.state
                              .questionsAnswer[0]
                              .options
                              .length; i++) {
        options.push( <Option optionValue={
                this
                  .state
                  .questionsAnswer[this.state.currentIndex]
                  .options[i] }
              triggerProcess = { this.processGuess } 
              activeGame = { this.state.activeGame } /> );
      }
    }
    
    return (  <div>
                <div className="row">
                  <div className="offset-lg-2 col-lg-7 col-md-12">
                      <QuestionPanel activeGame={ this.state.activeGame } 
                                     question={
                                        this
                                          .state
                                          .questionsAnswer[this.state.currentIndex]
                                          .question }
                                     resetGame = { this.resetGame } />
                      <div className={ this.state.activeGame 
                                        ? 'visible'
                                        : 'hidden' } >
                         { options }
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                      <StatusDisplay 
                        correct={ this.state.correct } 
                        incorrect={ this.state.incorrect } />
                  </div>
              </div>
            </div> );
  }
}

export default GameBoard;

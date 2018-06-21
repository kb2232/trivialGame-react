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

class StatusDisplay extends React.Component 
{
  render() {
    return (<div className="status-display text-center">
                  <p>Correct: { this.props.correct }</p>
                  <p>Incorrect: { this.props.incorrect }</p>
            </div>)
  }
}

class GameBoard extends React.Component 
{
  constructor(props) 
  {
    super(props); 
    //below - using bind to send "this" - initial state parameters to
    //processGuess and resetGame
    // this.processGuess = this.processGuess.bind(this);
    // this.resetGame = this.resetGame.bind(this);

    this.processGuess = this.processGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
    
    this.state = {
      currentIndex: 0,
      correct: 0,
      incorrect: 0,
      activeGame: true,
      questionsAnswer: [
        { // 1
          question: 'what is the correct way to initialize the state of an object? 1. this.state = ; 2. this.setState = ; 3. this.setState(); 4. this.state();  ',
          options: [1,2,3,4],
          answer: 1
        },
        { // 2
          question: 'what is the correct way to update the state of an object ? 1. this.state =  2. this.setState = ... 3. this.setState({...}) 4. this.state() ',
          options: [ 1,2,3,4],
          answer: 3
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
          question: 'What comes down and never goes up ? 1. taxes, 2. stars, 3. wind, 4. rain',
          options: [ 1,2,3,4],
          answer: 4
        },
        { // 6
          question: 'what motivates you? 1. "hard work", 2. "results", 3. "failure", 4. "money"',
          options: [ 1,2,3,4],
          answer: 3
        },
        { // 7
          question: 'React is way more efficient at manipulating the DOM? 1. "cannot be determined", 2. "false", 3. "nope", 4. "true"',
          options: [ 1,2,3,4],
          answer: 4
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
  
  processGuess(e) 
  { 
    
   if (this.state.currentIndex + 1 === this.state.questionsAnswer.length) 
   { 
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
  
  render() 
  {
    var options = [];
    
    if (this.state.activeGame) 
    {
      for (let i = 0; i < this.state.questionsAnswer[0].options.length; i++) 
      {
        options.push( <Option optionValue={
                this.state.questionsAnswer[this.state.currentIndex].options[i] }
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

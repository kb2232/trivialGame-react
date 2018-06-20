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
          question: 'What is 8 x 1 ?',
          options: [ 2, 7, 8, 9],
          answer: 8
        },
        { // 2
          question: 'What is 3 + 4 ?',
          options: [ 5, 7, 9, 34],
          answer: 7
        },
        { // 3
          question: 'What is 10 - 6 ?',
          options: [ 2, 4, 10, 7],
          answer: 4
        },
        { // 4
          question: 'What is 12 / 3 ?',
          options: [ 4, 6, 3, 8],
          answer: 4
        },
        { // 5
          question: 'What is 11 + 0 ?',
          options: [ 15, 11, 12, 10],
          answer: 11
        },
        { // 6
          question: 'What is 13 + 2 ?',
          options: [ 4, 17, 9, 15],
          answer: 15
        },
        { // 7
          question: 'What is 33 / 11 ?',
          options: [ 2, 3, 4, 1],
          answer: 3
        },
        { // 8
          question: 'What is 2 + 5 ?',
          options: [ 10, 7, 8, 6],
          answer: 7
        },
        { // 9
          question: 'What is 9 - 4 ?',
          options: [ 5, 7, 6, 9],
          answer: 5
        },
        { // 10
          question: 'What is 11 * 2 ?',
          options: [ 20, 22, 33, 34],
          answer: 22
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

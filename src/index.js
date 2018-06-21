import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './components/timer';
import './styles.css';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';

class Game extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.state = {
			title: 'Totally Trivial Trivia!!',
      isHidden: true,
      isToggle: true,
		};
	}
  //this is to handle click events
  handleClick() {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
      isHidden: !this.state.isHidden,
    });
  }

	render() {
		return (
			<Router>
				<div>
					<div className="pb-2 mt-4 mb-2 title">{this.state.title}</div>
					<Link to="/startGame">
						<button onClick={this.handleClick.bind(this)} className="btn btn-danger">
            {!this.state.isToggleOn ? 'ON' : 'OFF'}
						</button>
					</Link>
					{/*Routes will go here*/}
					<Route
						path="/startGame"
						render={() => {
							return (
								<div className="timer">
                {!this.state.isHidden && <Timer />}
								</div>
							);
						}}
					/>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('game'));

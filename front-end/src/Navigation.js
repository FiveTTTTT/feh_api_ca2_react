import React from 'react';
import { Link } from 'react-router-dom';
// import App from './App';

class Navigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {isStillTrue: true};

        this.toggleTruthood = this.toggleTruthood.bind(this)
    }

    render() {
        return ( 
            <div>
                <h1 >Hello {this.props.name}</h1>
                <p>Is it true ?</p>
                <button onClick={this.toggleTruthood}>{this.state.isStillTrue.toString()} </button>
                <Link to="/">yo</Link>
            </div>
        )
    }
    toggleTruthood(){
        this.setState(prevState => ({
            isStillTrue: !prevState.isStillTrue
        }))    
    }
}

export default Navigation;
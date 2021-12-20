import React from 'react';
import { Link } from 'react-router-dom';
// import App from './App';

class Navigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {isStillTrue: true};
        // console.log(this.state);

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
        console.log(this.state);
    }
}

export default Navigation;






// render(){
//     if(!this.state.isLoaded){
//         return(
//             <div>Loading... {console.log(this.state)}</div>
//         )
//     } else {
//         return(
//             <div> {console.log(this.setState({isLoaded:true}))}</div>  
//         )
//     }
// }


// render(){
//     if(!this.state.isLoaded){
//         return(
//             <div>Loading... {console.log(this.state)}</div>
//         )
//     } else {
//         return(
//             <div>
//                 <ul>
                    
//                     {this.state.dogs.map(dog => (
//                     <li key={dog.id}>
//                         {dog.name} {dog.price}
//                     </li>
//                     ))}
//                 </ul>
//           </div>  
//         )
//     }
// }

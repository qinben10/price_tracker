import Axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            price: ''
        }
    }
    
    async componentDidMount(){
    
        const price = (await axios.get('/api/price')).data
        this.setState({price})
    }

    render(){
        return(
            <div>
                Shwo the price: {this.state.price}
            </div>
        );
    }

}

ReactDOM.render(<App />,document.querySelector('#root'));
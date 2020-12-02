import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'



class App extends React.Component{
    constructor(){
        super()
        this.state = {
            price: '',
            option: 'test',
            uri: '',
            user:'',
            email:'',
        }
        this.submitKeyWord = this.submitKeyWord.bind(this)
        this.priceUpdate = this.priceUpdate.bind(this)
        this.startTracker = this.startTracher.bind(this)
    }
    
    async submitKeyWord(e){
        e.preventDefault();
        const {uri,option} = this.state
        const price = (await axios.get('/api/price', { params: {
            uri: uri,
            option: option
          }})).data
        this.setState({price: price})
    }
    async priceUpdate(ev) {
        ev.preventDefault();
        const {price,user,email,uri,} = this.state
        await axios.post('/api/price/priceupdate',{price,user,email,uri})

      }
    async startTracher(){
        const {user,email,uri} = this.state
        await axios.post('/api/price/settracker',{user,email,uri})
    }

    render(){
        return(
            <div>
                <img src = 'https://i.dansdeals.com/wp-content/uploads/2017/11/20165253/black-friday-2894130_1920.png'/>
                <p>You Best Black Friday Friend</p>
                <form className = 'form-inline' onSubmit ={this.submitKeyWord}>
                <label>
                    Please enter url of product you looking for: 
                </label>
                <input
                onChange = {({ target:{value} }) => this.setState({uri : value})}>
                </input>
                <button>
                    CHECK
                </button>
                </form>
                <div className = 'form-inline'>
                <button onClick = {()=> this.setState({price: '$100'})}>
                    Set Price To $100
                </button>
                </div>

                <div>
                <label>Please select Website Type</label>
                <button className = "button-select" onClick={() => this.setState({option : 'test'})}>
                    Test Web
                </button>
                <button className = "button-select" onClick={() => this.setState({option : 'newegg'})}>
                    NewEgg
                </button>
                </div>

                <div>
                Current the price: {this.state.price}
                </div>
                <p>would you like to subscribe price update? </p>
                <form className = 'form-inline' onSubmit={this.priceUpdate}>
                <label>Name</label>
                <input type="text" name="user_name"
                onChange = {({ target:{value} }) => this.setState({user : value})} />
                <label>Email</label>
                <input type="email" name="user_email" 
                onChange = {({ target:{value} }) => this.setState({email : value})}/>
                <input type="submit" value="SendEmail" />
                </form>
                <div className = 'form-inline'>
                <button onClick = {()=>this.startTracher()}>Start the tracker</button>
                </div>
            </div>
        );
    }

}

ReactDOM.render(<App />,document.querySelector('#root'));
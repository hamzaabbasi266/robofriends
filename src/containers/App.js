import React,{Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from'../components/ErrorBoundry';
import './App.css';
class App extends Component{
    constructor(){
        super();
        this.state={
            robots:[],
            searchField:''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response=> response.json())
        .then(users=>  this.setState({robots:users}))
    }
    onSearchChange=(event)=>{
        this.setState({searchField:event.target.value})
      
    }
    render(){
        const {robots,searchField}=this.state;
        const filteredRebots = robots.filter(robots=>{
        return robots.name.toLowerCase().includes(searchField.toLowerCase())  
    })
    return !robots.length ?
        <h1> Loading</h1> :
        (
                <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchBox  searchChange={this.onSearchChange}/>
                <Scroll> 
                    <ErrorBoundry>          
                <CardList robots={filteredRebots}/>
                     </ErrorBoundry>
                </Scroll>         
                </div>
            )
        }
}
export default App;
import {useState, useEffect} from 'react';
import CardList from '../components/CardList';

import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
function App(){
	/* constructor(){
		super()                                                 
		this.state={
			robots: [],
			searchfield: ''
		}
	}*/
	const [robots, setRobots]=useState([])
	const [searchfield, setSearchfield]=useState('')

	/*componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
			return response.json();
		}).then(users=>{
			this.setState({robots: users})
		});
	
	} */

	useEffect(()=>{
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users=>{setRobots(users)});
	}, [])


	const onSearchChange=(event)=>{
		setSearchfield(event.target.value);
		console.log(event.target.value);
		
	
	}
	
	const filteredRobots=robots.filter(robots=>{
		return robots.name.toLowerCase().includes(searchfield.toLowerCase());
	})
	if(robots.length===0)
		return <h1>Loading</h1>
	return (
		<div className='tc '>
			<h1 className='f1'> RoboFriends</h1>
			<SearchBox searchChange={onSearchChange}/>
			<Scroll>
				<ErrorBoundary>
					<CardList robots={filteredRobots}/>
				</ErrorBoundary>
			</Scroll>
		</div>
	); 


}

export default App;
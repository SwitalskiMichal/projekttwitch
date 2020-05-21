import React, { Component } from 'react'
import SearchBar from './SearchBar'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Game from './Game'
import Navbar from './Navbar'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <Navbar />
            <SearchBar />
          </div>
          <Switch>
            <Route path='/game/' component={Game} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
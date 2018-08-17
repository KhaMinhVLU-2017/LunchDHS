import React, { Component } from 'react'
import './App.css'
import FirstHeader from './myComponent/header'
import RouteMeo from './myComponent/routeRedire'
// import socketIOClient from 'socket.io-client'

class App extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <FirstHeader />
          <RouteMeo />
        </div>
      </div>
    )
  }
}

export default App

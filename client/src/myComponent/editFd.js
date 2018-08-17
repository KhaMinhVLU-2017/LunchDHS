import React, { Component } from 'react'
import { Col, Table, Button } from 'reactstrap'
import axios from 'axios'
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3333')

class EditFood extends Component {
  constructor (props) {
    super(props)
    this.state = {listFood: []}
    this.removeFood = this.removeFood.bind(this)
  }
  componentDidMount () {
    this.getListFood()
  }
  getListFood () {
    let self = this
    axios.get('http://localhost:3333/home/MenuFood')
      .then(function (response) {
        let FoodMenu = response.data.FoodMenu
        self.setState({listFood: FoodMenu})
      })
  }
  removeFood (e) {
    let id = e.target.value

    axios.get('http://localhost:3333/home/delete/' + id)
      .then(function (response) {
      // socket send Sever  for delete
        if (response.status === 200) {
          socket.emit('createFoodIO', 'del')
          console.log('Delete Complete')
        }
        // console.log(response)
      })
  }
  render () {
    let meo = this
    socket.on('createFoodIO', (mgs) => {
      if (mgs === 200) {
        console.log('Render List')
        meo.getListFood()
      }
    })
    let element = this.state.listFood.map((item, index) => {
      return (
        <tr key={item._id}>
          <td>{index + 1}</td>
          <td>{item.title}</td>
          <td>{item.price}</td>
          <td>{item.unit}</td>
          <td><Button color='danger' value={item._id} onClick={this.removeFood}>Remove</Button></td>
        </tr>
      )
    })
    return (
      <Col md={12}>
        <h3>Modification</h3>
        <Col md={12}>
          <TableFood >
            {element}
          </TableFood>
        </Col>
      </Col>
    )
  }
}

class TableFood extends React.Component {
  render () {
    return (
      <Table dark>
        <thead>
          <tr>
            <th>#</th>
            <th>Food</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {this.props.children}
        </tbody>
      </Table>
    )
  }
}
export default EditFood

import React, { Component } from 'react'
import FirstBegin from './firstUser'
import {
  Card, CardImg, CardBody,
  CardTitle, Badge, Button, Col, Row, Container
} from 'reactstrap'
import axios from 'axios'
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3333')

const Food = (props) => {
  return (
    <Col md={4} style={{ marginTop: '55px' }}>
      <Card key={props.id}>
        <CardImg top width='500px' height='300px' src={props.imagefood} alt='Card image cap' />
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <Badge color='danger'>{props.price}&ensp;{props.unit}</Badge>
          <div>
            <Button id={props.idButton} value={props.priceButton} name={props.colorButton} onClick={props.onChangeMeo} color={props.colorButton}>Order</Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

class MenuFood extends Component {
  constructor (props) {
    super(props)
    this.state = {countMeo: 0, color: 'primary', sum: 0, listFood: [], error: null, orderdetail: {name: '', listorder: []}}
    this.handerOrder = this.handerOrder.bind(this)
  }
  componentDidMount () {
    this.getDateFood()
  }
  getDateFood (mgs) {
    // this.setState({message: mgs})
    let self = this
    axios.get('http://localhost:3333/home/MenuFood')
      .then(function (response) {
        let FoodMenu = response.data.FoodMenu
        // console.log(FoodMenu)
        self.setState({
          listFood: FoodMenu
        })
      })
  }
  handerOrder (event) {
    if (event.target.name === 'primary') {
      event.target.classList = 'btn btn-success'
      event.target.name = 'success'
      let meo = this.state.countMeo + 1
      let sumS = this.state.sum + Number(event.target.value)
      this.setState({countMeo: meo})
      this.setState({sum: sumS})
      this.setState({listorder: this.state.orderdetail.listorder.push(event.target.id)})
      // let elemenChoose = event.target.id
      // console.log('My Choose value: ' + elemenChoose)
    } else {
      event.target.classList = 'btn btn-primary'
      event.target.name = 'primary'
      let meo = this.state.countMeo - 1
      let sumS = this.state.sum - Number(event.target.value)
      this.setState({countMeo: meo})
      this.setState({sum: sumS})
      let elemenChoose = event.target.id
      this.state.orderdetail.listorder.map((item, index) => item === elemenChoose ? this.state.orderdetail.listorder.splice(index, 1) : item)
      // console.log('My Choose value: ' + elemenChoose)
      // console.log(this.state.orderdetail.listorder)
    }
  }
  render () {
    // let self = this
    socket.on('createFoodIO', (mgs) => {
      if (mgs === 200) {
        mgs = 1
        console.log('Da Nhan')
        this.getDateFood(mgs)
        // self.setState({myLoad: true})
      }
    })
    let menu = this.state.listFood
    let menuAll = menu.map(item => <Food imagefood={'http://localhost:3333/' + item.images} idButton={item._id} priceButton={item.price} colorButton={this.state.color} onChangeMeo={this.handerOrder} key={item._id} title={item.title} price={item.price} unit={item.unit} />)
    return (
      <Container fluid style={{ lineHeight: '32px' }}>
        <FirstBegin passList={this.state.orderdetail} count={this.state.countMeo} price={this.state.sum} />
        <Row >
          {menuAll}
        </Row>
      </Container>
    )
  }
}

export default MenuFood

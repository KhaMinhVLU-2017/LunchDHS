import React from 'react'
import { Card, CardImg, CardBody,
  CardTitle, Badge, Col, CardText, Row, Container, Alert } from 'reactstrap'
import axios from 'axios'
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3333')

function Foodmeo (props) {
  var FoodModel = props.UserFood
  var ArrOrder = props.ListOrder
  let elements = ArrOrder.filter(item => FoodModel._id === item.fkFood).map((isut, index) => <BadeName key={index} username={isut.fkUser} />)
  // console.log(elements)
  return (
    <Col md={4} style={{ marginTop: '55px' }}>
      <Card>
        <CardImg top width='300px' height='350px' src={'http://localhost:3333' + FoodModel.images} alt='Card image cap' />
        <CardBody>
          <CardTitle id={FoodModel.id}>
            <Alert style={{fontFamily: 'initial', fontSize: 25, fontWeight: 'bold'}} color='primary'>
              {FoodModel.title}
            </Alert>
          </CardTitle>
          <CardText>
            {elements}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  )
}

function BadeName (props) {
  return (
    <Badge style={{marginRight: 10}} color='warning' >{props.username}</Badge>
  )
}
class MFoodOr extends React.Component {
  constructor (props) {
    super(props)
    this.state = {listFood: [], listOrder: [], status: 100}
  }
  componentDidMount () {
    this.tickReRed()
  }
  tickReRed (mgs) {
    // console.log('Accept: ' + mgs)
    // this.setState({status: mgs})
    let seft = this
    axios.get('http://localhost:3333/home/MenuFood')
      .then(function (response) {
        let FoodMenu = response.data.FoodMenu

        let ListOrder = ''
        axios.get('http://localhost:3333/home/ListOrder')
          .then(function (responses) {
            ListOrder = responses.data.OrderList
            // console.log(ListOrder)
            seft.setState({listFood: FoodMenu, listOrder: ListOrder})
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  render () {
    // let seft = this
    socket.on('updatemgs', (mgs) => {
      if (mgs === 200) {
        mgs = 1
        this.tickReRed()
        // console.log(this.state.listOrder)
      }
    })
    socket.on('createFoodIO', (mgs) => {
      if (mgs === 200) {
        mgs = 1
        console.log('Da Nhan')
        this.tickReRed()
      }
    })
    let ListFood = this.state.listFood
    let ListOrder = this.state.listOrder
    // console.log(ListOrder)
    let elements = ListFood.map((item, index) => <Foodmeo key={index} UserFood={item} ListOrder={ListOrder} />)
    return (
      <Container fluid style={{ lineHeight: '32px' }}>
        <Row>
          {elements}
        </Row>
      </Container>
    )
  }
}
export default MFoodOr

import React, { Component } from 'react'
import { Col, Button } from 'reactstrap'
import MFoodOr from './tablefood'

class OrderList extends Component {
  render () {
    return (
      <Col md={12}>
        <Col md={12}>
          <h1><a href='/'><Button color='secondary'>MenuFood</Button></a>\<Button color='success'>ListOrder</Button></h1>
        </Col>
        <hr />
        <MFoodOr />
      </Col>
    )
  }
}

export default OrderList

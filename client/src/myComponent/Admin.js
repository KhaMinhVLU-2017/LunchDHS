import React, { Component } from 'react'
import { Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

class AdminHander extends Component {
  render () {
    return (
      <Col md={12}>
        <h2>Manager Food</h2>
        <Link to={this.props.link1}>
          <Button outline color='primary'>CreateFood</Button>{' '}
        </Link>
        <Link to={this.props.link2}>
          <Button outline color='info' >Edit</Button>{' '}
        </Link>
        <hr />
      </Col>
    )
  }
}

export default AdminHander

import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Badge, Col } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3333')

class FirstBegin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      value: '',
      text: 'Your name',
      orderdetail: {username: null, listorder: []},
      back: null
    }

    this.toggle = this.toggle.bind(this)
    this.handerSave = this.handerSave.bind(this)
    this.handerChange = this.handerChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }
  // Handler Name
  handerSave (event) {
    this.setState({ value: this.state.text })
    this.setState({
      modal: !this.state.modal
    })
    var orderdetail = {...this.state.orderdetail}
    orderdetail.username = this.state.text
    this.setState({orderdetail})
  }
  handerChange (event) {
    this.setState({ text: event.target.value })
  }
  handleSubmit (event) {
    event.preventDefault()
    var orderdetail = {...this.state.orderdetail}
    this.props.passList.listorder.map(item => orderdetail.listorder.push(item))
    this.setState({orderdetail})
    const data = this.state.orderdetail
    console.log(data)
    let seft = this // Set this for know. Because after render it's can't run
    axios({
      method: 'post',
      url: 'http://localhost:3333/home/OrderDetail',
      data: data
    }).then(function (response) {
      if (response.status === 200) {
        socket.emit('updatemgs', 'complete')
        seft.setState({back: <Redirect to='/about' />})
      }
      // console.log(response.status)
    })
  }
  render () {
    return (
      <Col md={12} xs={12}>
        {this.state.back}
        <form onSubmit={this.handleSubmit}>
          <Button name={this.state.value} className='btn_home_name' color='danger' onClick={this.toggle}>{this.state.value === '' ? 'Name' : this.state.value}</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Please Input User</ModalHeader>
            <ModalBody>
              <Input type='text' onChange={this.handerChange} name='user' id='first_user' placeholder={this.state.text} />
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.handerSave}>Save</Button>{' '}
              <Button color='secondary' onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <OrderCard className='btn_home_order' count={this.props.count} price={this.props.price} />
          <CompleteOrder className='btn_home_submit' />
          <hr />
        </form>
      </Col>
    )
  }
}

function OrderCard (props) {
  return (
    <Button type='button' className={props.className} style={{ marginLeft: '30px' }} color='success' >Order &ensp; {props.count === 0 ? '' : props.count}  <Badge color='dark'>Total Price: {props.price}</Badge>
    </Button>

  )
}
function CompleteOrder (props) {
  return (
    <Button type='submit' className={props.className} style={{ marginLeft: '30px' }} color='warning'> Submit </Button>
  )
}

export default FirstBegin

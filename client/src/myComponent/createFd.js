import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText, Modal, ModalBody } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client'
import { Loader } from 'semantic-ui-react'
const socket = openSocket('http://localhost:3333')

class CreateFood extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null,
      back: null,
      fd_unit: 'vnd',
      fd_images: null,
      modal: false
    }
    this.handerChange = this.handerChange.bind(this)
    this.handerReset = this.handerReset.bind(this)
    this.handerSubmit = this.handerSubmit.bind(this)
    this.handerChangeInput = this.handerChangeInput.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  handerChange (event) {
    let file = event.target.files[0]
    this.setState({
      file: URL.createObjectURL(file),
      fd_images: file,
      back: null
    })
    // console.log(file)
    // console.log(this.state.fd_images)
  }
  handerReset () {
    window.location.reload()
    // this.toggle()
  }
  handerSubmit (e) {
    e.preventDefault()
    let seft = this
    const fd = new FormData ()
    fd.append('fd_images', this.state.fd_images)
    fd.append('fd_title', this.state.fd_title)
    fd.append('fd_unit', this.state.fd_unit)
    fd.append('fd_price', this.state.fd_price)
    axios.post('http://localhost:3333/home/CreateFood', fd, {
      onUploadProgress: progressEvent => {
        console.log('UploadProgress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          socket.emit('createFoodIO', 'postFile')
          seft.setState({ back: <Redirect to='/admin/edit' /> })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }
  handerChangeInput (e) {
    let name = e.target.name
    this.setState({ [name]: e.target.value })
    console.log(this.state[name])
  }
  // Chua xu ly dc POST
  render () {
    return (
      <Col md={12} >
        {this.state.back}
        <h3>Create Food</h3>
        <Col md={6}>
          <Form onSubmit={this.handerSubmit} encType='multipart/form-data'>
            <FormGroup row>
              <Label for='title' md={2}>Title</Label>
              <Col md={10}>
                <Input required='required' type='text' name='fd_title' id='fd_title' placeholder='Your Food' onChange={this.handerChangeInput} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='Price' md={2}>Price </Label>
              <Col md={10}>
                <Input type='number' name='fd_price' id='fd_price' placeholder={'Food\'s Price'} onChange={this.handerChangeInput} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='Unit' md={2}>Unit</Label>
              <Col md={10}>
                <Input required='required' type='select' name='fd_unit' id='fd_unit' placeholder={'Food\'s Price'} onChange={this.handerChangeInput}>
                  <option value='VND'>VND</option>
                  <option value='$'>$</option>
                </Input >
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='file' md={2}>Image</Label>
              <Col md={10}>
                <Input required='required' onChange={this.handerChange} type='file' name='fd_images' id='fd_images' />
                <FormText color='muted'>
                  Upload Images
                </FormText>
              </Col>
              <Col md={{ offset: 2, size: 10 }}>
                <img style={{ height: 300, width: 300 }} src={this.state.file}
                  alt='Please Choose'
                  accept='image/x-png,image/gif,image/jpeg' />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col style={{ padding: 0 }} md={{ size: 10, offset: 2 }}>
                <Button type='submit' name='submit' color='success'>Submit</Button>
                <Button style={{ marginLeft: 20 }} color='danger' onClick={this.handerReset}>Cancel</Button>
              </Col>
            </FormGroup>
          </Form>
          <ModalExample toggle={this.toggle} modal={this.state.modal} />
        </Col>
      </Col>
    )
  }
}

const LoaderExampleInlineCentered = () => (
  <Loader size='massive' active inline='centered'>
    Loading
  </Loader>
)

class ModalExample extends Component {
  render () {
    return (
      <div>
        <Modal contentClassName='bg-info' size='lg' isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} centered>
          <ModalBody >
            <LoaderExampleInlineCentered />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default CreateFood

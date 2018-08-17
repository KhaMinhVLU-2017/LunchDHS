import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MenuFood from './menuFood'
import OrderList from './orderList'
import AdminHander from './Admin'
import { Container, Row, Col } from 'reactstrap'
import CreateFood from './createFd'
import EditFood from './editFd'

const RouteMeo = () => (
  <Router>
    <Col md={12}>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/Admin'component={Admin} />
    </Col>
  </Router>
)

const Home = () => (
  <MenuFood />
)

const About = () => (
  <OrderList />
)
const Admin = ({match}) => (
  <Container>
    <Row>
      <AdminHander link1={`${match.url}/create`}
        link2={`${match.url}/edit`}
      />
      <Route path={`${match.url}/create`} component={createFd} />
      <Route path={`${match.url}/edit`} component={editfood} />
    </Row>
  </Container>
)
const createFd = () => (
  <CreateFood />
)
const editfood = () => (
  <EditFood />
)

export default RouteMeo

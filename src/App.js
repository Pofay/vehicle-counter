import React from 'react'
import { Col, Grid, Row, Button } from 'react-bootstrap'
import logo from './logo-cit.jpeg'
import './App.css'

class VehicleInputArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = { plateNumber: '', type: 'guest' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSubmit({ plateNumber: this.state.plateNumber, type: this.state.type })
  }

  render () {
    return (
      <div style={{ marginLeft: '5%', marginBottom: '2%' }} className='text-justify'>
        <form onSubmit={this.handleSubmit}>
          <label>Plate Number:</label>
          <input type='text'
            id='new-platenumber'
            value={this.state.plateNumber}
            onChange={(event) => this.setState({ plateNumber: event.target.value })}
            required />
          <div>
            <label> Vehicle Type:</label>
            <select title={'Vehicle Types'}
              id='vehicle-type'
              onChange={(event) => this.setState({ type: event.target.value })}>
              <option value='guest'>Guest</option>
              <option value='dropoff'>Drop Off</option>
              <option value='parking'>Parking</option>
            </select>
          </div>
          <Button type='submit'>Add Vehicle</Button>
        </form>
      </div>
    )
  }
}

class SearchArea extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <label style={{ marginRight: '5px' }}> Search Plate Number: </label>
        <input onChange={(event) => this.props.showMatching(event.target.value)}id='search-platenumber' />
      </div>
    )
  }
}
const VehicleTableRow = ({ removeVehicle, plateNumber }) =>
  (
    <Row>
      <span style={{ marginRight: '20%', borderStyle: 'solid' }}>{plateNumber}</span>
      <button onClick={() => removeVehicle(plateNumber)}>Out</button>
    </Row>
  )

const VehicleColumn = ({ removeVehicle, title, vehicles }) =>
  (
    <Col sm={6} md={4}>
      <div style={{ backgroundColor: '#CCCCFF', width: '100%' }} className='text-center'> {title} </div>
      {vehicles.map((v, i) => <VehicleTableRow removeVehicle={removeVehicle} key={i} {...v} />)}
    </Col>
  )

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { vehicles: [
      { plateNumber: 'VFS722', type: 'guest' },
      { plateNumber: 'VFS733', type: 'dropoff' },
      { plateNumber: 'CEH427', type: 'parking' }
    ],
    queryString: '' }
    this.addVehicle = this.addVehicle.bind(this)
    this.removeVehicle = this.removeVehicle.bind(this)
    this.showMatching = this.showMatching.bind(this)
  }

  addVehicle (vehicleInfo) {
    this.setState((prevState) => ({
      vehicles: prevState.vehicles.concat(vehicleInfo)
    }))
  }

  removeVehicle (plateNumber) {
    console.log(plateNumber)
    this.setState((prevState) => ({
      vehicles: prevState.vehicles.filter(v => v.plateNumber !== plateNumber)
    }))
  }

  showMatching (plateNumber) {
    this.setState({ queryString: plateNumber })
    console.log(this.state.queryString)
  }

  render () {
    return (
      <div className='App container'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Vehicle Counter Prototype V1</h1>
        </header>
        <div className='App-intro'>
          <VehicleInputArea onSubmit={this.addVehicle} />
          <SearchArea showMatching={this.showMatching} />
          <br />
          <div>
            <Grid>
              <Row style={{ marginLeft: '5%', marginRight: '5%' }}>
                <VehicleColumn removeVehicle={this.removeVehicle} title={'Guest'}
                  vehicles={this.state.queryString.length === 0 ? this.state.vehicles.filter(i => i.type === 'guest')
                    : this.state.vehicles.filter(i => i.type === 'guest').filter(i => i.plateNumber.includes(this.state.queryString))} />
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

export default App

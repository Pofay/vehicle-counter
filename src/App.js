import React from 'react'
import { Table, Col, Grid, Row, Button } from 'react-bootstrap'
import logo from '../images/logo-cit.jpeg'
import './App.css'
import axios from 'axios'

class VehicleInputArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = { plateNumber: '', type: 'guest' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSubmit({ plateNumber: this.state.plateNumber, type: this.state.type })
    this.setState({ plateNumber: '', type: 'guest' })
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
              value={this.state.type}
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

const SearchArea = (props) =>
  (
    <div>
      <label style={{ marginRight: '5px' }}> Search Plate Number: </label>
      <input onChange={(event) => props.showMatching(event.target.value)}id='search-platenumber' />
    </div>
  )

const VehicleTableRow = ({ removeVehicle, plateNumber, type }) =>
  (
    <tr>
      <td>{plateNumber}</td>
      <td>{type}</td>
      <td><button onClick={() => removeVehicle(plateNumber)}>Out</button></td>
    </tr>
  )

const VehicleTable = ({ removeVehicle, title, vehicles }) =>
  (
    <Table responsive striped bordered hover>
      <thead className='text-center'>
        <tr>
          <th>Plate Number</th>
          <th>Vehicle Type</th>
          <th>Out</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((v, i) => <VehicleTableRow removeVehicle={removeVehicle} key={i} {...v} />)}
      </tbody>
    </Table>
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
                <VehicleTable removeVehicle={this.removeVehicle} title={'Guest'}
                  vehicles={this.state.queryString.length === 0 ? this.state.vehicles.filter(i => i.type === 'guest')
                    : this.state.vehicles.filter(i => i.type === 'guest').filter(i => i.plateNumber.includes(this.state.queryString))} />
                <VehicleTable removeVehicle={this.removeVehicle} title={'Drop Off'}
                  vehicles={this.state.queryString.length === 0 ? this.state.vehicles.filter(i => i.type === 'dropoff')
                    : this.state.vehicles.filter(i => i.type === 'dropoff').filter(i => i.plateNumber.includes(this.state.queryString))} />
                <VehicleTable removeVehicle={this.removeVehicle} title={'Parking'}
                  vehicles={this.state.queryString.length === 0 ? this.state.vehicles.filter(i => i.type === 'parking')
                    : this.state.vehicles.filter(i => i.type === 'parking').filter(i => i.plateNumber.includes(this.state.queryString))} />
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

export default App

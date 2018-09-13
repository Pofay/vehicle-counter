import React from 'react'
import { Col, Grid, Row } from 'react-bootstrap'
import logo from '../images/logo-cit.jpeg'
import './App.css'
import VehicleInputForm from './components/vehicle-input-form'
import SearchArea from './components/search-area'
import VehicleTable from './components/vehicle-table'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { vehicles: [
      { plateNumber: 'VFS722', type: 'guest' },
      { plateNumber: 'VFS733', type: 'dropoff' },
      { plateNumber: 'CEH427', type: 'parking' }
    ],
    queryString: '' }
  }

  addVehicle = (vehicleInfo) => {
    this.setState((prevState) => ({
      vehicles: prevState.vehicles.concat(vehicleInfo)
    }))
  }

  removeVehicle = (plateNumber) => {
    this.setState((prevState) => ({
      vehicles: prevState.vehicles.filter(v => v.plateNumber !== plateNumber)
    }))
  }

  showMatching = (inputPattern) => {
    this.setState({ queryString: inputPattern.toUpperCase() })
  }

  render = () => {
    const { queryString, vehicles } = this.state
    const isEmptyQueryString = queryString === 0

    return (
      <div className='App container'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h3 className='App-title'>Vehicle Counter Prototype V1</h3>
        </header>
        <Grid className='App-intro'>
          <Row>
            <VehicleInputForm onSubmit={this.addVehicle} />
            <Col xs={6} md={4} style={{ marginTop: '5%' }}>
              <h3>Vehicles Inside Premises: {this.state.vehicles.length}</h3>
            </Col>
          </Row>
          <hr />
          <SearchArea showMatching={this.showMatching} />
          <br />
          <Row style={{ marginLeft: '5%', marginRight: '5%' }}>
            <VehicleTable removeVehicle={this.removeVehicle} title={'Parking'}
              vehicles={isEmptyQueryString ? vehicles : vehicles.filter(i => i.plateNumber.includes(queryString))} />
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App

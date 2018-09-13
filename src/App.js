import React from 'react'
import { Grid, Row } from 'react-bootstrap'
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
    return (
      <div className='App container'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Vehicle Counter Prototype V1</h1>
        </header>
        <div className='App-intro'>
          <VehicleInputForm onSubmit={this.addVehicle} />
          <h1>Number of Vehicles Inside Premises: {this.state.vehicles.length}</h1>
          <SearchArea showMatching={this.showMatching} />
          <br />
          <Grid>
            <Row style={{ marginLeft: '5%', marginRight: '5%' }}>
              <VehicleTable removeVehicle={this.removeVehicle} title={'Parking'}
                vehicles={this.state.queryString.length === 0 ? this.state.vehicles
                  : this.state.vehicles.filter(i => i.plateNumber.includes(this.state.queryString))} />
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

export default App

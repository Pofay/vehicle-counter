import React from 'react'
import { ToggleButtonGroup, ToggleButton, ButtonToolbar, ControlLabel, FormControl, Table, Grid, Row, Button } from 'react-bootstrap'
import logo from '../images/logo-cit.jpeg'
import './App.css'

class VehicleInputForm extends React.Component {
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
      <div style={{ marginLeft: '2%', marginTop: '2%', marginBottom: '2%' }} className='text-justify'>
        <form onSubmit={this.handleSubmit}>
          <ControlLabel>Plate Number:</ControlLabel>
          <FormControl
            id='new-platenumber'
            placeholder='Enter Platenumber'
            type='text'
            value={this.state.plateNumber}
            onChange={(event) => this.setState({ plateNumber: event.target.value })}
            required />
          <ControlLabel style={{ paddingBottom: '0.5%' }}> Vehicle Type: </ControlLabel>
          <ButtonToolbar onChange={(event) => this.setState({ type: event.target.value })}>
            <ToggleButtonGroup
              type='radio'
              name='vehicle-types'
              style={{ display: 'block' }}
              defaultValue={this.state.type}
            >
              <ToggleButton value={'guest'}>Guest</ToggleButton>
              <ToggleButton value={'parking'}>Parking</ToggleButton>
              <ToggleButton value={'dropoff'}>Drop Off</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          <Button style={{ marginTop: '2%' }} type='submit'>Add Vehicle</Button>
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
          <VehicleInputForm onSubmit={this.addVehicle} />
          <SearchArea showMatching={this.showMatching} />
          <br />
          <div>
            <Grid>
              <Row style={{ marginLeft: '5%', marginRight: '5%' }}>
                <VehicleTable removeVehicle={this.removeVehicle} title={'Parking'}
                  vehicles={this.state.queryString.length === 0 ? this.state.vehicles
                    : this.state.vehicles.filter(i => i.plateNumber.includes(this.state.queryString))} />
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

export default App

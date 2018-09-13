import React from 'react'
import { Col, Button, ControlLabel, FormControl, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

class VehicleInputForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { plateNumber: '', type: 'guest' }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit({ plateNumber: this.state.plateNumber, type: this.state.type })
    this.setState({ plateNumber: '', type: 'guest' })
  }

  render = () => {
    return (
      <Col xs={6} md={6} style={{ marginLeft: '2%', marginTop: '2%', marginBottom: '2%' }} className='text-justify'>
        <form onSubmit={this.handleSubmit}>
          <ControlLabel>Plate Number:</ControlLabel>
          <FormControl
            style={{ width: '75%' }}
            id='new-platenumber'
            placeholder='Enter Platenumber'
            type='text'
            value={this.state.plateNumber}
            onChange={(event) => this.setState({ plateNumber: event.target.value })}
            required />
          <ControlLabel style={{ paddingBottom: '0.5%' }}> Vehicle Type: </ControlLabel>
          <ButtonToolbar
          >
            <ToggleButtonGroup
              type='radio'
              name='vehicle-types'
              style={{ display: 'block' }}
              defaultValue={this.state.type}
              value={this.state.type}
              onChange={(value) => this.setState({ type: value })}
            >
              <ToggleButton value={'guest'}>Guest</ToggleButton>
              <ToggleButton value={'parking'}>Parking</ToggleButton>
              <ToggleButton value={'dropoff'}>Drop Off</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          <Button style={{ marginTop: '2%' }} type='submit'>Add Vehicle</Button>
        </form>
      </Col>
    )
  }
}

export default VehicleInputForm

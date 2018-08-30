import React from 'react'
import { Col, Grid, Row, Button, DropdownButton, MenuItem } from 'react-bootstrap'
import logo from './logo-cit.jpeg'
import './App.css'

const VehicleInputArea = (props) =>
  (
    <div style={{ marginLeft: '5%', marginBottom: '2%' }} className='text-justify'>
      <form>
        <label>Plate Number:</label>
        <input id='new-platenumber' />
        <div>
          <label> Vehicle Type:</label>
          <DropdownButton title={'Vehicle Types'} id='vehicle-type'>
            <MenuItem eventKey='Guest'>Guest</MenuItem>
            <MenuItem eventKey='Drop Off'>Drop Off</MenuItem>
            <MenuItem eventKey='Parking'>Parking</MenuItem>
          </DropdownButton>
        </div>
        <Button type='submit'>Add Vehicle</Button>
      </form>
    </div>
  )

const SearchArea = (props) =>
  (
    <div>
      <form>
        <label style={{ marginRight: '5px' }}> Search Plate Number: </label>
        <input id='search-platenumber' />
      </form>
    </div>
  )
const VehicleTableRow = (props) =>
  (
    <Row>
      <span style={{ marginRight: '20%', borderStyle: 'solid' }}> VFS733 </span>
      <button> Out </button>
    </Row>
  )

const VehicleColumn = ({ title }) =>
  (
    <Col sm={6} md={4}>
      <div style={{ backgroundColor: '#CCCCFF', width: '100%' }} className='text-center'> {title} </div>
      <VehicleTableRow />
      <VehicleTableRow />
    </Col>
  )
const App = () => {
  return (
    <div className='App container'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1 className='App-title'>Vehicle Counter Prototype V1</h1>
      </header>
      <div className='App-intro'>
        <VehicleInputArea />
        <SearchArea />
        <br />
        <div>
          <Grid>
            <Row style={{ marginLeft: '5%', marginRight: '5%' }}>
              <VehicleColumn title={'Guest'} />
              <VehicleColumn title={'Drop Off'} />
              <VehicleColumn title={'Parking'} />
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default App

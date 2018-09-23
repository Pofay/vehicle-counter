import React from 'react'
import { Table } from 'react-bootstrap'

const VehicleTableRow = ({ removeVehicle, plateNumber, type }) =>
  (
    <tr>
      <td>{plateNumber}</td>
      <td>{type}</td>
      <td><button onClick={() => removeVehicle({ plateNumber: plateNumber, type: type })}>Out</button></td>
    </tr>
  )

const VehicleTable = ({ removeVehicle, title, vehicles }) =>
  (
    <Table responsive condensed striped bordered hover>
      <thead className='text-center'>
        <tr>
          <th>Plate Number</th>
          <th>Vehicle Type</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((v, i) => <VehicleTableRow removeVehicle={removeVehicle} key={i} {...v} />)}
      </tbody>
    </Table>
  )

export default VehicleTable

import React from 'react'

const SearchArea = (props) =>
  (
    <div>
      <label style={{ marginRight: '5px' }}> Search Plate Number: </label>
      <input onChange={(event) => props.showMatching(event.target.value)}id='search-platenumber' />
    </div>
  )

export default SearchArea

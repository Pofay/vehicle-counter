import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('Smoke Test', () => {
  expect(1).toBe(1)
})

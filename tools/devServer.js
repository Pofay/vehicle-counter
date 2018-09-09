import path from 'path'
import express from 'express'
import webpack from 'webpack'
import config from '../webpack.dev'
import open from 'open'
import hotMiddleware from 'webpack-hot-middleware'
import devMiddleware from 'webpack-dev-middleware'

const port = 3000
const app = express()
const compiler = webpack(config)

app.use(new devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(new hotMiddleware(compiler))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'))
})

app.listen(port, (err) => {
  if (err) { console.log(err) } else { open(`http:localhost:${port}`) }
})

require('dotenv').config()

const express = require('express')
const sequelize = require('./config/database')
const clienteRoutes = require('./routes/clienteRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use('/clientes', clienteRoutes)
app.use('/auth', authRoutes)

async function iniciarServidor() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor iniciado na porta ${process.env.PORT || 3000}`)
    })
  } catch (erro) {
    console.error('Não foi possível conectar ao banco de dados:', erro.message)
  }
}

iniciarServidor()

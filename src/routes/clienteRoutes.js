const express = require('express')
const { cadastrar } = require('../controllers/clienteController')

const router = express.Router()

router.post('/', cadastrar)

module.exports = router

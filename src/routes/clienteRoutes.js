const express = require('express')
const { cadastrar, perfil } = require('../controllers/clienteController')
const autenticar = require('../middlewares/auth')

const router = express.Router()

router.post('/', cadastrar)
router.get('/perfil', autenticar, perfil)

module.exports = router

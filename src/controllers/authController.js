const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Cliente = require('../models/Cliente')

async function login(req, res) {
  try {
    const { email: emailInformado, senha } = req.body || {}
    const email = emailInformado?.trim().toLowerCase()
    const cliente = email ? await Cliente.findOne({ where: { email } }) : null

    if (!cliente || !senha) {
      return res.status(401).json({ mensagem: 'E-mail ou senha inválidos' })
    }

    const senhaConfere = await bcrypt.compare(senha, cliente.senha)

    if (!senhaConfere) {
      return res.status(401).json({ mensagem: 'E-mail ou senha inválidos' })
    }

    const token = jwt.sign(
      { id: cliente.id },
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
    )

    return res.json({ token })
  } catch {
    return res.status(500).json({ mensagem: 'Não foi possível realizar o login' })
  }
}

module.exports = { login }

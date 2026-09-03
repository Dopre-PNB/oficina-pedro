const jwt = require('jsonwebtoken')

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não enviado' })
  }

  const [tipo, token] = authHeader.split(' ')

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' })
  }

  try {
    req.cliente = jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' })
  }
}

module.exports = autenticar

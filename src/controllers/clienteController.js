const clienteService = require('../services/clienteService')

async function cadastrar(req, res) {
  try {
    const cliente = await clienteService.cadastrarCliente(req.body)

    return res.status(201).json({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      placa: cliente.placa,
      modeloVeiculo: cliente.modeloVeiculo,
      quilometragem: cliente.quilometragem,
    })
  } catch (erro) {
    if (erro.name === 'SequelizeValidationError') {
      return res.status(400).json({ mensagem: 'Dados do cliente inválidos' })
    }

    return res.status(erro.status || 500).json({
      mensagem: erro.status ? erro.message : 'Não foi possível cadastrar o cliente',
    })
  }
}

async function perfil(req, res) {
  try {
    const cliente = await clienteService.buscarClientePorId(req.cliente.id)

    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' })
    }

    return res.json(cliente)
  } catch {
    return res.status(500).json({ mensagem: 'Não foi possível consultar o perfil' })
  }
}

module.exports = {
  cadastrar,
  perfil,
}

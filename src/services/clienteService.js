const bcrypt = require('bcrypt')
const Cliente = require('../models/Cliente')

function criarErro(mensagem, status) {
  const erro = new Error(mensagem)
  erro.status = status
  return erro
}

function validarDadosCadastro(dados = {}) {
  const nome = dados.nome?.trim()
  const email = dados.email?.trim().toLowerCase()
  const senha = dados.senha
  const telefone = dados.telefone?.trim()
  const placa = dados.placa?.trim().toUpperCase()
  const modeloVeiculo = dados.modeloVeiculo?.trim()
  const quilometragem = Number(dados.quilometragem)

  if (!nome || !email || !senha || !telefone || !placa || !modeloVeiculo || dados.quilometragem === undefined || dados.quilometragem === null || dados.quilometragem === '') {
    throw criarErro('Preencha todos os campos do cliente', 400)
  }

  if (!Number.isInteger(quilometragem) || quilometragem < 0) {
    throw criarErro('Informe uma quilometragem válida', 400)
  }

  return { nome, email, senha, telefone, placa, modeloVeiculo, quilometragem }
}

async function cadastrarCliente(dados) {
  const cliente = validarDadosCadastro(dados)
  const clienteExistente = await Cliente.findOne({ where: { email: cliente.email } })

  if (clienteExistente) {
    throw criarErro('Já existe um cliente cadastrado com este e-mail', 409)
  }

  const senhaCriptografada = await bcrypt.hash(cliente.senha, 10)

  return Cliente.create({
    ...cliente,
    senha: senhaCriptografada,
  })
}

async function buscarClientePorId(id) {
  return Cliente.findByPk(id, {
    attributes: { exclude: ['senha'] },
  })
}

module.exports = {
  cadastrarCliente,
  buscarClientePorId,
}

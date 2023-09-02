import Login from '../models/usuario.model.js';

export const findOne = (req, res) => {
  const { email, senha } = req.body;
  Login.findOne({ where: { email, senha } })
    .then((login) => {
      if (!login) {
        return res.status(404).send({ message: 'Login não encontrado' });
      }
      return res.status(200).send(login);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

export const create = (req, res) => {
  const { email, senha, nome } = req.body;
  Login.create({ email, senha, nome })
    .then((login) => {
      res.status(201).send(login);
    })
    .catch((error) => {
      if (error.errors[0].validatorKey === 'not_unique') {
        res.status(400).send(
          { message: `${error.errors[0].path} já está cadastrado` },
        );
      } else {
        res.status(500).send({ message: error.message });
      }
    });
};

export const enviarCodigo = (req, res) => {
  const { email } = req.body;
  const senhaTemporaria = Math.random().toString(36).slice(-8);
  Login.update({ senha: senhaTemporaria }, { where: { email } })
    .then((login) => {
      res.status(204).send(login);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

export const alterarSenha = (req, res) => {
  const { email, senhaValidadora, senhaNova } = req.body;

  try {
    const [updatedRows] = Login.update(
      { password: senhaNova },
      { where: { email, password: senhaValidadora } },
    );

    if (updatedRows === 0) {
      return res.status(401).json({ error: 'Senha incorreta ou usuário não encontrado.' });
    }

    return res.status(200).json({ message: 'Senha atualizada com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
  }
};

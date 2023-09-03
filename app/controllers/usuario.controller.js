import Usuario from '../models/usuario.model.js';
import { gerarToken } from '../controllers/auth.controller.js'
import { hash, compare } from 'bcrypt';
import * as yup from 'yup';

export const Cadastrar = async (req, res) => {

    let schema = yup.object().shape({
        usuario: yup.string("O campo usuário precisa ser uma string")
            .required("O campo usuário é obrigatorio")
            .max(50, "O campo usuário não pode ser maior que 100 caracteres"),

        senha: yup.string("O campo senha precisa ser uma string")
            .required("O campo senha é obrigatorio")
            .max(50, "O campo senha não pode ser maior que 100 caracteres"),

        email: yup.string("O campo email precisa ser uma string")
            .required("O campo email é obrigatorio")
            .max(150, "O campo email não pode ser maior que 100 caracteres"),

        nome: yup.string("O campo nome precisa ser uma string")
            .required("O campo nome é obrigatorio")
            .max(100, "O campo nome não pode ser maior que 100 caracteres"),
    });

    try {

        await schema.validate(req.body);

        const { usuario, senha, email, nome } = req.body;

        const senhaHash = await hash(senha, 8);

        await Usuario.create({ usuario, senha: senhaHash, email, nome })
            .then(async (user) => {
                res.status(201).send({ token: await gerarToken(user.id), message: "Usuário cadastrado com sucesso" });
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

    } catch (error) {
        res.status(400).send(
            { message: error.errors },
        );
    };
};

export const Acessar = async (req, res) => {

    let schema = yup.object().shape({
        usuario: yup.string("O campo usuário precisa ser uma string")
            .required("O campo usuário é obrigatorio")
            .max(50, "O campo usuário não pode ser maior que 100 caracteres"),

        senha: yup.string("O campo senha precisa ser uma string")
            .required("O campo senha é obrigatorio")
            .max(50, "O campo senha não pode ser maior que 100 caracteres"),
    });

    try {

        await schema.validate(req.body);

        const { usuario, senha } = req.body;

        Usuario.findOne({ where: { usuario } })
            .then(async (user) => {
                if (user) {

                    try {
                        if (await compare(senha, user.senha)) {
                            return res.status(200).send({ token: await gerarToken(user.id) });
                        }
                    } catch (error) {
                        res.status(404).send({ message: 'Usuário ou senha não encontrado' });
                    }

                }

                res.status(404).send({ message: 'Usuário ou senha não encontrado' });

            })
            .catch((error) => {
                res.status(500).send({ message: error.message });
            });

    } catch (error) {
        res.status(400).send(
            { message: error.errors },
        );
    };
};

export const findByPk = async (id) => {

    Usuario.findByPk(id)
        .then((user) => {
            return user;
        })
        .catch((error) => {
            return { message: error.message };
        });
};

export const findAll = async () => {

    Usuario.findAll()
        .then((user) => {
            return { user };
        })
        .catch((error) => {
            return { message: error.message };
        });
};
import Card from '../models/card.model.js';
import * as yup from 'yup';

export const Cadastrar = async (req, res) => {

    let schema = yup.object().shape({
        mensagem: yup.string("O campo mensagem precisa ser uma string")
            .required("O campo mensagem é obrigatorio")
            .max(500, "O campo mensagem não pode ser maior que 100 caracteres"),

        idRemetente: yup.number("O ID do remetente precisa ser númerico")
            .required("O remetente não informado"),

        idDestinatario: yup.number("O ID do destinatario precisa ser númerico")
            .required("O destinatario não informado"),
    });

    try {

        await schema.validate(req.body);

        const envidoEm = new Date();

        const { mensagem, idRemetente, idDestinatario } = req.body;

        await Card.create({ mensagem, envidoEm, LidoEm: null, idRemetente, idDestinatario })
            .then(async () => {
                res.status(201).send({ message: "Card enviado com sucesso" });
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
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET;

export const gerarToken = async (id) => {

    const token = jwt.sign({
        id: id
    },
        SECRET
    );

    return token;
}

export const verificarToken = async (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: 'Não autorizado!' });
    }

    try {
        jwt.verify(token, SECRET);

        const tokenDecode = jwt.decode(token);
        res.locals.id = tokenDecode.id;
        next();

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const rotaAutenticada = async (req, res) => {
    res.status(200).send({
        message: 'id: ' + res.locals.id
    })
}
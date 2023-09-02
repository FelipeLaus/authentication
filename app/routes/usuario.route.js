import express from 'express';
import { Cadastrar,Acessar } from '../controllers/usuario.controller.js';
import { verificarToken,rotaAutenticada } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/cadastrar', Cadastrar);
router.post('/acessar', Acessar);
router.post('/rotaAutenticada',verificarToken,rotaAutenticada);

export default router;

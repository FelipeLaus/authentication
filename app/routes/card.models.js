import express from 'express';
import { Cadastrar } from '../controllers/card.controller.js';

const router = express.Router();

router.post('/cadastrar', Cadastrar);

export default router;

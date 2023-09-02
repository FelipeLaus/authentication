import express from 'express';
import cors from 'cors';
import usuarioRoute from './app/routes/usuario.route.js';

const corsOptions = {
  origin: 'http://localhost:4200',
};

const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Isso é uma API' });
});

app.use('/api/usuario', usuarioRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}.`);
});

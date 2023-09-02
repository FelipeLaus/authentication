import db from './config/db.js';
import Usuario from './app/models/usuario.model.js'
import Card from './app/models/card.model.js'

(async ()=>{
    await db.sync({force:true});
})();
const express = require('express');

const router = express.Router();

const controllerAlunos = require("../controllers/alunosControllers");

router.get("/",controllerAlunos.getAll);
router.get('/edit', controllerAlunos.getEdit); 
router.get('/delete', controllerAlunos.getDelete); 
router.get('/sobre', controllerAlunos.getSobre); 
router.get("/:cod", controllerAlunos.getCod);
router.get("/editar/:cod", controllerAlunos.getId);

module.exports = router



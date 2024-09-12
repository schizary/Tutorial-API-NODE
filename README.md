# Tutorial-API-NODE

Este tutorial demonstra como criar uma API básica usando Node.js, Express e MongoDB.

## Pré-requisitos

Antes de começar, você precisará do seguinte instalado:

- [Node.js](https://nodejs.org) (versão 12 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [MongoDB](https://www.mongodb.com/) (local ou Atlas)

## Passo 1: Configurando o Projeto

1. Crie uma nova pasta para o seu projeto:

    ```bash
    mkdir minha-api
    cd minha-api
    ```

2. Inicialize um novo projeto Node.js:

    ```bash
    npm init -y
    ```

3. Instale as dependências necessárias:

    ```bash
    npm install express mongoose body-parser
    ```

## Passo 2: Criando o Servidor Express

1. Crie um arquivo `server.js` na raiz do seu projeto:

    ```javascript
    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');

    const app = express();
    const port = 3000;

    // Middleware para parsear JSON
    app.use(bodyParser.json());

    // Rota de teste
    app.get('/', (req, res) => {
        res.send('API está funcionando!');
    });

    // Conectar ao MongoDB
    mongoose.connect('mongodb://localhost:27017/minhaapi', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Conectado ao MongoDB');
    }).catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
    });

    // Iniciar o servidor
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
    ```

2. Inicie o servidor:

    ```bash
    node server.js
    ```

    Abra o navegador e vá até `http://localhost:3000`. Você verá a mensagem **"API está funcionando!"**.

## Passo 3: Criando Rotas e Controladores

1. Crie uma pasta `routes` e um arquivo `userRoutes.js`:

    ```javascript
    const express = require('express');
    const router = express.Router();
    
    // Exemplo de rota GET
    router.get('/users', (req, res) => {
        res.json([{ name: 'Usuário 1' }, { name: 'Usuário 2' }]);
    });

    module.exports = router;
    ```

2. Modifique o `server.js` para incluir a rota:

    ```javascript
    const userRoutes = require('./routes/userRoutes');

    // Usar as rotas de usuários
    app.use('/api', userRoutes);
    ```

3. Agora, ao acessar `http://localhost:3000/api/users`, você verá um JSON com uma lista de usuários.

## Passo 4: Criando um Modelo MongoDB

1. Crie uma pasta `models` e um arquivo `User.js`:

    ```javascript
    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
    });

    const User = mongoose.model('User', userSchema);

    module.exports = User;
    ```

2. Modifique as rotas para criar e buscar usuários no MongoDB:

    ```javascript
    const express = require('express');
    const router = express.Router();
    const User = require('../models/User');

    // Rota para listar usuários
    router.get('/users', async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
    });

    // Rota para criar um novo usuário
    router.post('/users', async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        try {
            const savedUser = await user.save();
            res.json(savedUser);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar usuário' });
        }
    });

    module.exports = router;
    ```

3. Teste as rotas usando um cliente HTTP como o [Postman](https://www.postman.com/) ou o [Insomnia](https://insomnia.rest/).

## Passo 5: Testando a API

1. Para buscar todos os usuários, faça uma requisição `GET`:

    ```
    GET http://localhost:3000/api/users
    ```

2. Para criar um novo usuário, faça uma requisição `POST`:

    ```
    POST http://localhost:3000/api/users
    Content-Type: application/json

    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "senha123"
    }
    ```

## Conclusão

Você criou com sucesso uma API simples utilizando Node.js, Express e MongoDB. Agora, você pode expandir adicionando autenticação, validação, paginação, etc.

## Dependências

- `express`: Framework minimalista para o Node.js
- `mongoose`: ODM para MongoDB
- `body-parser`: Middleware para manipulação de JSON

## Próximos Passos

- Implementar autenticação com JWT
- Adicionar validação de dados usando o pacote `Joi`
- Adicionar testes automatizados com `Mocha` ou `Jest`

## Licença

Este projeto está licenciado sob os termos da licença MIT.

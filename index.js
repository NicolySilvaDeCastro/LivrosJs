const express = require('express'); // permite os comandos get, post, push e delete
const bodyParser = require('body-parser'); // json e xml

const app = express(); 
app.use(bodyParser.json());

let livros = [];

app.get('/livros', (req, res) => { //req = front-end e res = resposta
    res.json(livros); // restfull = get pega todos os itens(utilizar filtro) / graphic area = get seleciona
    });

    app.get('/livros/:codigo', (req, res) => { //Filtro
        const { codigo } = req.params; 
        const livro = livros.find(l => l.codigo === codigo); // se placa do veículo = array, significa que o veiculo foi encontrado
        if (livro) { 
        res.json(livros); 
        } else { 
        res.status(404).json({ message: 'Livro não encontrado.' }); 
        } 
        });
        
        app.post('/livros', (req, res) => { 
            const { codigo, editora, autor, ano } = req.body; // quais atributos serão salvos
            const livro= { codigo, editora, autor, ano };
            livros.push(livro); 
            res.status(201).json({ message: 'Livro cadastrado com sucesso.' }); 
            });
            
            app.put('/livros/:codigo', (req, res) => { //put = colocar 
                const { codigo } = req.params; // update --> atualiza informações
                const { editora, autor, ano} = req.body; 
                const livro= livros.find(l => l.codigo === codigo); 
                if (livro) { 
                livro.editora = editora || livro.editora; 
                livro.autor = autor || livro.autor; 
                livro.ano = ano || livro.ano; 
                res.json({ message: 'Informações do livro atualizadas com sucesso.' });
                } else {
                res.status(404).json({ message: 'Livro não encontrado.' }); 
                } 
                });

                app.delete('/livros/:codigo', (req, res) => { // só é possível deletar pelo índice
                    const { codigo } = req.params;  //quando o sistema deleta um atributo, ele apenas o ignora, porém ele continua ocupando memória do sistema
                    const livroIndex = livros.findIndex(l => l.codigo === codigo); 
                    if (livroIndex !== -1) { //3,1 = índice três e uma exclusão / 3,2 = índice três e duas exclusões a partr desse índice
                    livros.splice(livroIndex, 1); // o "1" sinaliza quantos irão excluír
                    res.json({ message: 'Livro excluído com sucesso.' }); 
                    } else { 
                    res.status(404).json({ message: 'Livro não encontrado.' }); 
                    } 
                    });


const port = 3000; // a porta 3000 é geralemnte usada para o node
app.listen(port, () => {  // executar servidor
console.log(`Servidor rodando em http://localhost:${port}`);  
});

//node index.js = executa código  
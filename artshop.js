const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/artshop',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});

const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha


    const usuario = new Usuario({
        email : email,
        senha : senha
    })


    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }


});

const ProdutoArtSchema = new mongoose.Schema({
    id_produtoart : {type : Number, required : true},
    descricao : {type : String},
    artista : { type : String},
    datacriacao : {type : Date},
    quantidadeestoque : {type : Number}
});

const ProdutoArt = mongoose.model("ProdutoArt", ProdutoArtSchema);

app.post("/cadastroproduto", async(req, res)=>{
    const id_produtoart = req.body.id_produtoart;
    const descricao = req.body.descricao;
    const artista = req.body.artista;
    const datacriacao = req.body.datacriacao;
    const quantidadeestoque  = req.body.quantidadeestoque


    const produtoArt = new ProdutoArt({
        id_produtoart : id_produtoart,
        descricao : descricao,
        artista : artista,
        datacriacao : datacriacao,
        quantidadeestoque : quantidadeestoque
    })


    try{
        const newProdutoArt = await produtoArt.save();
        res.json({error : null, msg : "Produto ok", id_produtoartId : newProdutoArt._id});
    } catch(error){
        res.status(400).json({error});
    }


});

app.get("/cadastroprodutoart", async(req, res)=>{
    res.sendFile(__dirname + "/cadastroprodutoart.html")
})

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})
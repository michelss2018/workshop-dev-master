//Usei o "express" para criar e configurar o servidor
const express = require("express")
const server = express()

const db = require("./db")

//Configurando arquivos estaticos (css, script, imagens, etc)
server.use(express.static("public"))

//Habilitar uso do reqy.bory
server.use(express.urlencoded({extended: true}))

//Configurando o Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//Criei uma rota
// e capturei o pedido do cliente para responder
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS!")
        }

        const  reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for(let idea of reversedIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }
    
    return res.render("index.html", {ideas: lastIdeas})
    })

})

server.get("/ideias", function(req, res){ 

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS!")
        }

        const  reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", {ideas: reversedIdeas})

    })
    
})

server.post("/", function(req, res){
    //Inserir dados na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);    
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS!")
        }

        return res.redirect("/ideias")
    })
})

//liguei o servidor na porta "3000"
server.listen(3000)
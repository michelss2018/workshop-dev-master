const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./workshop-dev.db')

db.serialize(function(){
    //Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)


    //Inserir dados na tabela
    /*
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
        "https://www.flaticon.com/svg/vstatic/svg/4062/4062906.svg?token=exp=1611096650~hmac=261fdccf2afcf7cd7676bd4eaa8a6772",
        "Cursos de Programação 1",
        "Estudo",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eligendi iure, optio ex neque ullam",
        "http://google.com"
    ]

    db.run(query, values, function(err){
        if (err) return console.log(err)

        console.log(this)
    })
    
    //Consultar dados na tabela
    /*
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })
    */

    //Deletar um dado da tabela
    
    /*
    db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
        if (err) return console.log(err)

        console.log("Deletei!", this)
    })
    */
})

module.exports = db
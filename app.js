//PRIMERO: se asignan los módulos a constantes para poderlos implementar
const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');

//TERCERO: comandos usados para capturar los datos y con esto no vamos a tener problemas a la hora de realizar las peticiones y cuando se carguen los datos
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//CUARTO: hacemos un método get para comprobar que hay comunicación 
app.get('/status',(req,res)=> {
    res.json({
        "status": "server listening"
    })
  })

//QUINTO: simular login, se define la ruta de acceso y los datos que va a recibir
app.post('/login', async (req,res)=>{
    //datos cargados desde postman
    try{
        const user = req.body.user;
        const password = req.body.password;

        //comparando que los datos son correctos
        if(user == 'admin' && password =='12345'){

            //SEXTO: se usa la librería bcrypt, la cual recibe el valor a cifrar y el número de rounds, async + await=asíncrono, para sincrono es con hashSync
            let passwordhash = await bcryptjs.hash(password, 8);
            //------------------------------------------------

            res.json({
                "message":"LOGIN SUCCESS",
                //SEXTO
                "passwordhash": passwordhash
                //-------
            })
        }else{
            res.json({
                "message":"LOGIN FAILED"
            })
        }
    }
    catch(error){
        res.send(error);
    }
})

//SEPTIMO: métdo para comparar
app.post('/verify',(req,res)=>{
    const passwordToVerify = req.body.password;
    let hashSaved = "$2a$08$cTbTx58b6Ssb3fols1TU.OgRmqVjRpMT3GpLzAWBJSvQAInTItFpa"; //valor sale de la consulta de login de postman
    let validation = bcryptjs.compareSync(passwordToVerify,hashSaved);

    if(validation){
        res.json({
            "response": "Verification Success"
        })
    }else{
        res.json({
            "response": "Verification Failed"
        })
    }

})

//SEGUNDO: configurción del puerto por el que va a estar escuchando la app
app.listen(3001, ()=>{
    console.log('SERVER UP!');
})
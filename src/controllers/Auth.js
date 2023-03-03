import {db} from "../database/data.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";

export async function SingUp(req,res){
    const {name, email, password} = req.body;

try{
    const useremail = await db.query(`SELECT * FROM users WHERE email=$1`,[email]);

if (useremail.rowCount > 0) return res.sendStatus(409)

const passwordHash = bcrypt.hashSync(password, 10);

await db.query(`INSERT INTO users (name ,email, password) VALUES($1, $2, $3)`,[name, email, passwordHash])

}catch(err){

    res.status500.send(err.message)
}

    
   
    
    
    res.sendStatus(201)
}


export async function SingIn(req, res){
    const {email, password} = req.body

 try{
    const {rows: finduser} = await db.query(`SELECT * FROM users WHERE email = $1`,[email]);
   
const [user] = finduser;

if (!user){return res.sendStatus(401);}

if (bcrypt.compareSync(password, user.password)){
    const token = uuid();


    await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, user.id]);

    return res.send(token)

}

res.sendStatus(401)
    

 }catch(err){

    res.status(500).send(err.message)
}
        
}

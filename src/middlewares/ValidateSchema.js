import {db} from "../database/data.js"

export async function userValidate(req, res, next) {

    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    if (!token){return res.status(401).send("sem token");}

    try{
        const {rows: findsession} = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);

        const [session] = findsession;

        if (!session) {return res.status(401).send("sem sessão")}

        const {rows: findusers}= await db.query(`SELECT * FROM users WHERE id = $1`, [session.userId]);
        
        const[user] = findusers

        if(!user){return res.status(401).send("sem usuario")}
        res.locals.user = user

        next()

    }catch(err){
        res.status(500).send(err.message)
    }

}
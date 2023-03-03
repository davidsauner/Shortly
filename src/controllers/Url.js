import { nanoid } from "nanoid";
import {db} from "../database/data.js"


export async function UrlShorten(req,res){
    const {id} = res.locals.user;
    const{url} = req.body;

const shortUrl = nanoid(8)

try{
    await db.query(`INSERT INTO shortens (url, "shortUrl","userId") VALUES($1,$2,$3)`,[url, shortUrl, id]);

res.status(201).send({shortUrl})

}catch(err){res.status(500).send(err.message)}


}

export async function getUrlId(req, res){
    const {id} = req.params;

    try {
        const {rows: findurl} = await db.query(`SELECT * FROM shortens WHERE id = $1`,[id])

        if(findurl.length === 0) {return res.sendStatus(404)}
        const [url] = findurl

        delete url.views
        delete url.userId
        delete url.createdAt
        res.send(url)

    }catch(err){res.status(500).send(err.message)}
}

export async function openUrl(req,res) {

const {shortUrl} = req.params;

try {
    const {rows: findshorturls} = await db.query(`SELECT * FROM shortens WHERE "shortUrl" = $1`,[shortUrl]);

    if(findshorturls.length === 0){return res.sendStatus(404)};

    const [url] = findshorturls

     await db.query(`UPDATE shortens SET views = views + 1 WHERE id = $1`, [url.id]);

     res.redirect(url.url)

}catch(err){res.status(500).send(err.message)}


}
export async function deleteUrl(req,res){
    const {id} = req.params;
    const {user} = req.locals.user;

    try {
        const {rows:findurl} = await db.query(`SELECT * FROM shortens WHERE id = $1`, [id]);

        if (findurl.length === 0) {return res.sendStatus(404)};
    
        const [url] = findurl;
    
        if (url.userId !== user.id) {return res.sendStatus(401)};
    
        await db.query("DELETE FROM shortens WHERE id=$1", [id]);

        res.sendStatus(204);
    } catch (err) {res.status(500).send(err.message)}

}
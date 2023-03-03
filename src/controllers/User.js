import {db} from "../database/data.js"
export async function getUser(req,res){
    const {user} = res.locals;

    try {
        
        const {row:findviwes} = await db.query(`SELECT SUM(views) FROM shortens WHERE shortens."userId" = $1`,[user.id])

        const count = findviwes

        const {row:findurls} = await db.query(`SELECT * FROM shortens  WHERE shortens."userId" = $1`,
            [user.id]
          );
          const url = findurls
        res.send({
            id: user.id,
            name: user.name,
            visitCount: count.sum || 0,
            shortenedUrls: url,
          });



    } catch (err) { res.status(500).send(err.message)  }

}

export async function getRank(req,res){
    try {
        const { rows } = await db.query(`
        SELECT 
          u.id, 
          u.name, 
          COUNT(s.id) as "linksCount", 
          COALESCE(SUM(s."views"), 0) as "visitCount"
        FROM users u
        LEFT JOIN shortens s ON s."userId" = u.id
        GROUP BY u.id
        ORDER BY "visitCount" DESC
        LIMIT 10
      `);
        res.send(rows);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
      }

}
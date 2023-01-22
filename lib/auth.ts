import jwt from 'jsonwebtoken'
import prisma from './prisma'


export const validateRoute =  (handler) => {
    return async (req,res) => {
        const { MUSICA_ACCESS_TOKEN: token }  = req.cookies

        if(token) {
            let user

            try {

                const {id} = jwt.verify(token, 'hello')
                user =  await prisma.user.findUnique({
                    where: {id},
                })

                if(!user) {
                    throw new Error("No such user exists")
                }
                
            } catch (error) {
                res.status(401)
                res.json({error: "Not authorized"})
                return
            }
            return handler(req,res, user)
        }

        res.status(401)
        res.json({error: "Not authorized"})

        
    }
}
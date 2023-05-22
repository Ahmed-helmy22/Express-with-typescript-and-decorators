import { NextFunction, Request, Response } from "express"
import { get } from "./decorators/routes"
import { controller } from "./decorators/controller";
import { use } from "./decorators/use";




const protect = (req : Request , res: Response , next : NextFunction)=>{
if(!req.session?.isLogin === true) return res.send('access denied\n  <a href="/login"> login<a>')
 return next()
 }


@controller('')
export class RootController { 
@get('/')
getRoot(req : Request,res : Response){
        if(req.session?.isLogin) {
                res.send(`<div>
                            <div>
                                you are logged in 
                            </div>
                                <a href="/logout"> logout<a> 
                        </div>`)
        } else {
                res.send(`<div>
                            <div>
                                you are  not logged in 
                            </div>
                                <a href="/login"> login<a> 
                        </div>`)
        }
  }


  @get('/protected')
  @use(protect)
  protect(req : Request,res : Response){
    res.send('good you are in protected route')
  } 
}
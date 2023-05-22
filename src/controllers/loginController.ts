import { NextFunction, Request, Response } from "express";
import {get, post } from './decorators/routes';
import {controller } from './decorators/controller';
import { use } from "./decorators/use";
import { bodyValidator } from "./decorators/bodyvalidator";

const logger = (req : Request,res : Response, next : NextFunction)=>{
            console.log('hi from midllware');
            next()
            }

@controller('')
class LoginController {
            @get('/login')
            @use(logger)
            getLogin(req : Request,res : Response ) : void { 
                res.send( `<form method="POST">
                    <div>
                        <label>email</label>
                        <input type="email" name="email">
                        <label>email</label>
                        <input type="password" name="password">
                        <button>login</button>
                    </div>`)
        }
        @post('login')
        @bodyValidator('email' ,'password')
        postLogin(req : Request , res : Response){
            const {email , password} = req.body
    
             if(email==='ahmed@gmail.com'&&password==='1234'){
                 req.session={isLogin : true};
                 res.redirect('/')}
            else{
                res.send('invalid email or password')
                }
        
            }
            @get('logout')
            logOut(req : Request , res : Response){
                req.session = undefined;
                res.redirect('/')
            }
    }
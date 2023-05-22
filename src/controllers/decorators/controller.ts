
import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import AppRouter from "../../AppRouter";
import methods from './methods';
import metadataKeys from './metadataKeys';



const  bodyValidator = (...keys : string[])=>{
    return (req : Request , res : Response  , next : NextFunction)=>{
        for (const key of keys) {
         if(!req.body[key]) return res.status(422).send(`invalid request please write ${key}`)   
        }
      next()  
    }
}
export function controller(baseRoute : string) {
   const router = AppRouter.getInstance();
    return function(target : Function) {      
        for (const key of Object.getOwnPropertyNames(target.prototype)) {
            const handler = target.prototype[key]; // target is the constructor function
            const path = Reflect.getMetadata(metadataKeys.path , target.prototype , key) 
            const method : methods = Reflect.getMetadata(metadataKeys.method , target.prototype , key);
            const middlewares = Reflect.getMetadata(metadataKeys.middleware , target.prototype ,key) ||[] ;
            const reqBody = Reflect.getMetadata(metadataKeys.validator ,target.prototype , key ) ||[]


            if(path) { 
                router[method](`${baseRoute}${path}` , ...middlewares , bodyValidator(reqBody), handler)
            }
        }
    }
}




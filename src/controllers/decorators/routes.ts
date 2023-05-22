import 'reflect-metadata';
import methods from './methods';
import metadataKeys from './metadataKeys';
import { RequestHandler } from 'express';

 interface routeHanlerDescriptor extends PropertyDescriptor {
    value? : RequestHandler
} 


function routeBinder(method : string){
    return function(path: string) {
        return function(target : any , key : string , desc : routeHanlerDescriptor){
                Reflect.defineMetadata(metadataKeys.path, path , target , key)
                Reflect.defineMetadata(metadataKeys.method, method , target , key)

                }
            }
        }

export const get = routeBinder(methods.get)
export const post = routeBinder(methods.post)
export const patch = routeBinder(methods.patch)
export const del = routeBinder(methods.del)

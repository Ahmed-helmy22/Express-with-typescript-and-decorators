import 'reflect-metadata';
import metadataKeys from './metadataKeys';
import { RequestHandler } from 'express';

export function use(middleware : RequestHandler) {
    return function(target : any , key : string , desc: PropertyDescriptor){
        const middlewares = Reflect.getMetadata(metadataKeys.middleware ,target , key ) || [];
        Reflect.defineMetadata(metadataKeys.middleware ,[...middlewares , middleware]  , target , key)

    }
}
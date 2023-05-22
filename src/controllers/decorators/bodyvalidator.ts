import 'reflect-metadata'; 
import metadataKeys from './metadataKeys';

 export function bodyValidator(...keys : string[]){
    return function(target : any , key : string , desc : PropertyDescriptor){
    Reflect.defineMetadata(metadataKeys.validator , keys , target , key )
    }
}
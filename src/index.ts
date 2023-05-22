import express from 'express'; 
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/loginController';
import AppRouter from "./AppRouter";


const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieSession({keys:['oiuyhgfds']}))
app.use(AppRouter.getInstance())



const PORT = 5000
app.listen(PORT || 5000, ()=>{
    console.log(`app is running in port ${PORT}`);
    
})
     
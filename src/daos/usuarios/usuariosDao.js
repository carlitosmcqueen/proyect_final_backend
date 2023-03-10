import mail from "../../utils/nodemailer.js"
import logger from "../../../logs.js";
import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import { passHashed,validatePass  } from "../../utils/bcrypt.js";

class UsuarioDaoMongo extends ContenedorMongo {
    constructor() {
        super("usuarios", {
            username: String,
            password: String,
            edad:Number,
            telefono:String,
            imagen:String,
            carrito:Array,
            
        });
    }
    register = async (req,username,password,carrito,done) => {
        try{
            const {edad,telefono,imagen} = req.body
            const user = await this.db.findOne({username})
            if(user) return done(null,false)
            const saveUser = await this.db.create({username,password: passHashed(password),edad,telefono,imagen,carrito})
            mail("registro",saveUser)
            done(null,saveUser)
            
        }catch(err){
            logger.error(`error al registar usuario : ${err}`)
        }


    }
    login = async (username, password,done) =>{
        try{
            const user = await this.db.findOne({username})
            if(!user) return done(null,false)
            validatePass(password,user.password) ? done(null,user) : done(null,false)
        }catch(err){
            logger.error("error al iniciar session")
        }
    }
    find = async (id,done) => {
        try{
            await this.db.findById(id,done)
        }catch(err){
            logger.error(`error al desearilar ${err}`)
        }
    }
    IdUser = async (user)=>{
        try{
            const data = await this.db.findOne({username:user})
            return data 
        }catch(err){
            logger.error(`ni se encontreo el usario por su nombre`)
        }
    }

}

export default UsuarioDaoMongo;
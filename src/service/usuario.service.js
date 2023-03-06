import daos from "../daos/DaoFactory.js";
const {productosDao} = await daos

export const GETLOGIN = async (req,res) => {
    try{
        res.render("main",{layout:"login"})
    }catch(e){
        console.log(e)
    }
}

export const POSTLOGIN = async (req,res) => {
    const { username } = req.body;
    req.session.user = username
    res.redirect("/")
}
export const LOGINERROR = async (req,res) => {
    res.render("main",{layout:"loginError"});
}
export const GETREGISTER = async (req,res) => {
    res.render('main', {layout: 'register'})
}
export const POSTREGISTER = async (req,res) => {
    res.redirect("/login")
}
export const REGISTERERROR = async (req, res) => {
    res.render("main",{layout:"registerError"})
}

export const LOGOUT = async (req, res) => {
    res.render('main', {layout: 'logout', user : req.session.user})
    if(req.session){
        req.session.destroy();
    }
}

export const PRODUCTOS = async (req,res)=>{
    const data = await productosDao.getAll()
        res.render('main', {layout: 'productos', user : req.session.user,productos:data})
}

export const checkAuth = (req,res,next) =>{
    console.log("Auth Checked")
    next()
}
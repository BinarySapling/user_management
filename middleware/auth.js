export const checkAuth = (req,res,next) =>{
    if(success){
        console.log("AUTH CHECKED")
        next()
    }else{
        console.log("AUTH FAILED")
        return res.status(400).json({
            success:false
        })
    }
}

export const validateUser = (req,res,next)=>{
    const {name , email} = req.body
    if (!name || !email) {
        console.log(chalk.red('✗ Create failed: Name and email are required'));
        return res.status(400).json({ 
            success: false, 
            message: "Name and email are required" 
        });
    }
    next();
} 

export const validateUserId = (req,res,next) =>{
    const{id}  = req.params
    if(!id || id.length < 5 ){
        return res.status(400).json({
            success:false,
            message:"Id invalid"
        })
    }
    if(isNaN(id)){
        return res.status(400).json({
            success:false,
            message:"Id must be a number"
        })
    }

    next()
}
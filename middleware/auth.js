import chalk from "chalk";

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

export const validateToken = (req, res, next) => {
    console.log(chalk.yellow("→ Validating token..."));
    const token = req.headers.token || req.headers.authorization;
    
    // Check if token exists
    if (!token) {
        console.log(chalk.red("✗ No token provided"));
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided"
        });
    }
    
    // Simple token validation (you can replace with JWT verification)
    const validToken = "Bearer mysecrettoken123";
    
    if (token !== validToken) {
        console.log(chalk.red("✗ Invalid token"));
        return res.status(403).json({
            success: false,
            message: "Invalid token"
        });
    }
    
    // Token is valid, proceed
    console.log(chalk.green("✓ Token validated successfully"));
    next();
}
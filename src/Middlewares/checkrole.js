const checkAuthor = async(req, res, next)=>{
    try {
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({status: false, message: error.message})
        
    }
}
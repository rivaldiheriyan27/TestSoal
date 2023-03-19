const {User, Book,Bookmark} = require("../models/index");
const {compareHash,hashPassword} = require("../helpers/hashPassword")
const {signatureJwt,verifyJwt, secretKey} = require("../helpers/jwt")


class userController{
    static async register(req,res,next){
        try{
            const {email, password,phoneNumber,name} = req.body

            let input = {
                email,
                password,
                phoneNumber:`0${phoneNumber}`,
                name
            }

            console.log(input, "ini data Register")
            

            //Cek data apakah sudah ada email yang register atau belum

            const checkDataUser = await User.findOne({ // Penamaan harus spesifik contoh UserByEmailOPT
                where:{
                    email:email
                    // Kurang deletedAt is null
                }
            })

            if(checkDataUser){
                throw { name :"Email has been registered"}
            }

            const dataInputRegister = await User.create(input)

            const idToken = {
                id: dataInputRegister.id
            }

            let token = signatureJwt(idToken,secretKey)
            
            res.status(201).json({
            statusCode:201,
            data:{
                message: `new user with email ${dataInputRegister.email} has been successfully registered`,
                accesToken:token
            }
            });
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async login(req,res,next){
        try{
            const {email, password} = req.body;
            const user = await User.findOne({
                where:{
                    email:email,
                    // Kurang deletedAt is null
                }
            });

            // Check data apakah ada usernya atau tidak
            if (!user) {
                throw {name :"Email or Password is invalid"};
            }

            const validatePassword = compareHash(
                password,
                user.password
            )
            
            console.log(validatePassword, "ini validasi password")

            // Check data apakah passwordnya sudah sama atau tidak

            if (!validatePassword) {
                throw { name : `Email or Password is invalid`};
            }

            const payload = {
                id: user.id,
            };

            console.log(payload, " ini di login")

            const token = signatureJwt(payload,secretKey);

            res.status(200).json({
                statusCode:200,
                data:{
                    accesToken:token,
                    email:user.email,
                    role:user.role
                }
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = {userController,}
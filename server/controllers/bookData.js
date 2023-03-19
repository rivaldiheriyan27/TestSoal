const {User, Book,RentalBook} = require("../models/index");
const _ = require('lodash'); 
const dayjs = require('dayjs');
const dateNow = dayjs();
const { v4: uuidv4 } = require('uuid');
// const uuidv4 = require("uuid/v4")

class bookLibrary{
    static async bookData(req,res,next){
        try{
            console.log("ini data")
            const dataBook = await Book.findAll({
                attributes:{
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            console.log(dataBook)
            res.status(200).json({
                statuscode:200,
                data:dataBook
            })
        }catch(err){
            next(err)
        }
    }

    static async bookDataDetail(req,res,next){
        try{
            const {id} = req.params;

            const dataBook = await Book.findByPk(id,{
                attributes:{
                    exclude: ["createdAt", "updatedAt"]
                }
            })


            if(!dataBook){
                throw { name : "Not Found The Book"}
            }

            // console.log(dataBook)
            res.status(200).json({
                statuscode:200,
                data:dataBook
            })
        }catch(err){
            next(err)
        }
    }

    static async addBook(req,res,next){
        try{
            const {title, author,isbn} = req.body;
            let input = {
                title,
                author,
                isbn
            }

            console.log(input,"data input")

            // Apabila kolom deletedAt sudah disii anggap data sudah dihapus

            const checkBookDataisAlready = await Book.findOne({
                where:{
                    title,
                    author,
                    isbn
                    // Kurang deletedAt is null 
                }
            })

            if(checkBookDataisAlready){
                throw { name : "Book has been registered"}
            }

            console.log(input ,"ini data input buat buku")
            
            const dataBuku = await Book.create(input)

            res.status(201).json({
                message:`Ini buku baru berjudul ${input.title}`
            })
        }catch(err){
            next(err)
        }
    }

    static async history(req,res,next){
        try{
            const {id} = req.user

            console.log(id," ini data id user")
            const dataHistory = await Bookmark.findAll({
               include:[{model:Book}, {model:User}],
               where:{UserId:id}
            })
            console.log(dataHistory, "Ini data History")

            res.status(200).json({
                statuscode:200,
                data:dataHistory
            })
        }catch(err){
            next(err)
        }
    }

    static async borrowBook(req,res,next) {
        try{
            const{id:userId} = req.user;
            const {title,isbn,returnEstimate} = req.body; 
            const numberRent = _.toNumber(returnEstimate)
            let dataUUid = uuidv4();

            // console.log(userId,title,isbn,returnEstimate,"ini data yang dipakai")

            //Cek apakah buku ada atau tidak
            const checkBookIsAlready = await Book.findOne({
                where:{
                    title,
                    isbn
                }
            })

            console.log(checkBookIsAlready.id, 'ini id buku')

            if(!checkBookIsAlready){
                throw {name : "Not Found The Book"}
            }

            // -Cek apakah buku dipnjem orang lain atau tidak
            // - kalau dipnjem error

            const checkBookhasAlreadyBooked = await RentalBook.findOne({
                where:{
                    BookId: checkBookIsAlready.id , 
                    status: null || "Done" || "Late"
                }
            })

            if(checkBookhasAlreadyBooked){
                throw { name : "Book is already Booked"}
            }


            console.log("lewat check")

            // let hariIni = dateNow.format("YYYY-MM-DD")
            let returnBook = dateNow.add(numberRent, 'd').format("YYYY-MM-DD")
            console.log(returnBook , ' ini data hari')
            // console.log(dateNow,b,"tanggal hari ini dan 7 hari")
            
            console.log(dataUUid, "ini angka random")
            
            let input = {
                UserId:userId,
                BookId:checkBookIsAlready.id,
                rentNumber: dataUUid, 
                status:"Borrowed",
                returnEstimate: returnBook,
            }
            console.log(input, "ini data input")

            // Kurang rapih Validasi harus ada diatas  dan salah urutan
            const checkDataBookHasAlreadyGivenJustOneTime = await RentalBook.findOne({
                where:{
                    UserId:input.UserId,
                    BookId:input.BookId,
                }
            })
            
            if(checkDataBookHasAlreadyGivenJustOneTime){
                throw {name : "Already Borrowed"}
            }

            await RentalBook.create(input)

            res.status(201).json({
                message:"Berhasil Meminjam Buku di perpustakaan"
            })
        }catch(err){
            next(err)
        }
    }

    static async returnBook(req,res,next){
        try{
            // const{ id } = req.params;
            const{id:userId} = req.user;
            const {rentNumber} = req.body;

            // console.log("ini databuku", userId , "ini data di Return",title,isbn,rentNumber)

            //     -Cari nomor peminjaman ada atau tidak

            const checkDataOrderRentNumber = await RentalBook.findOne({
                where:{
                    rentNumber,
                    // kurang deletedAT IS NULL
                }
            })
            //    -Kalau engga ada balikin erorr(tidak meminjam)
            if(!checkDataOrderRentNumber){
                throw {name : "Data Rental not found"}
            }

            //     -cek apakah actual isinya null atau tidak
            //         -kalau tidak null sudah balikin
            if(checkDataOrderRentNumber.status === "Done" || checkDataOrderRentNumber.status === "Late"){
                // finite state machine ini membuat programer menjadi kesulitan kalau tidak hati2 dan salah paham 
                throw { name : "Book has already give to LibraryMan"}
            }

            

            let hariIni = dateNow.format("YYYY-MM-DD")
            console.log(hariIni)

            let statusUser; 

            if(checkDataOrderRentNumber.returnEstimate < hariIni){
                statusUser = "Late"
            }else{
                statusUser = "Done"
            }
            
            console.log(statusUser)


            // -kasi bukunya
            //     -actual balikin disiinya jam sekarang
            // -save database

            // let findUserBook = await Book.findOne({
            //     where:{
            //         id:id
            //     }
            // })

            // // console.log(findUserBook,"Ini dataUserBook")

            // if(!findUserBook){
            //     throw {name:"Not Found The Book"}
            // }

            const dataUpdate = await RentalBook.update(
                {
                actualEstimate:hariIni,
                status:statusUser
                },
                {
                    where:{
                        UserId:userId,
                        rentNumber
                    }
                }
            )
            console.log(dataUpdate, "data update")

            res.status(200).json({message:`Terimakasih Buku sudah dikembalikan`})
        }catch(err){
            next(err)
        }
    }

    static async listDataReturn(req,res,next){
        try{
            const{id:userId} = req.user;

            const dataReturn = await Bookmark.findAll({
                where:{
                    UserId:userId
                }
            })

            res.status(200).json({
                statuscode:200,
                data:dataReturn
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = {bookLibrary}
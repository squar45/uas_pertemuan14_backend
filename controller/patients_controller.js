import {response, request} from "express"
import patient_model from "../model/patient_model"

export default class Patients_controller {
    /**
     * Mendapatkan seluruh pasiens
     * @author Izzudin 
     * untuk melihat di postman ketik di bawah ini
     * @see http://localhost:8000/patients
     */
    async Index(req = request, res = response){
        //pagination
        const { page = 0, limit = 10} = await req.query
        const skip = page * limit
        const result = await patient_model.findMany({
            skip: parseInt(skip),
            take: parseInt(limit),
        })
        const resultCount = await patient_model.count()

        //jika data kosong
        if(result.length == 0){
            res.status(200).json({
                message : "Data is Empty"   
            })
            return
        }
        res.status(200).json({
            succes: true,
            message : "Get All Resource",
            current_page: page,
            total_page: Math.ceil(resultCount / limit),
            data : result,
        })
    }

    /**
     * Menambahkan data pasien
     */

    async Store(req = request, res = request){
        try {
            const data = await req.body
            const result = await patient_model.create({
                data : {
                    ...data,
                    in_date_at : new Date(data.in_date_at),
                }
            })

            // pengecekkan jika terjadi error
            if(!result){
                res.status(204).json({
                    success : false,
                    message: "gagal masukan data",
                })
                return
            }

            res.status(201).json({
                success:true,
                data : data,
            })
        } catch (error){
            res.status(422).json({
                success:false,
                error: error.message,
            })
        }
    }

    /**
     * Mengupdate data pasien
     */

    async Update(req = request, res = response){
        try {
            const {id} = await req.params
            const data = await req.body
            const result = await patient_model.update({
                data : data,
                where : {
                    id : parseInt(id)
                }
            })

            // jika data tidak ditemukan
            if(!result) {
                res.status(404).json({
                    message: "Resource not found",
                })
                return
            }

            res.status(200).json({
                success : true,
                message: "resource is update successfully"
            })
        } catch (error) {
            res.status(422).json({
                success: false,
                error:error.message,
            })
        }
    }

    /**
     * Menghapus data pasien
     */

    async Destroy(req = request, res = response){
        try {
            const {id} = await req.params
            const result = await patient_model.findUnique({
                where : {
                    id: parseInt(id)
                }
            })
            if(!result){
                res.status(404).json({
                    success : false,
                    message : "Resource not found"
                })
                return
            }
            const deleteResource = await patient_model.delete({
                where : {
                    id: parseInt(id)
                }
            })
            
            res.status(200).json({
                success: true,
                message: "Resource is Delete Successfuly",
            })
        } catch (error) {
            res.status(422).json({
                success:false,
                erorr: error.message,
            })
        }
    }

    /**
     * Mencari 1 data pasien bedasarkan id
     */

    async Show(req = request, res = response){
        try{
            const {id} = await req.params
            const result = await patient_model.findUnique({
                where : {
                    id: parseInt(id)
                }
            })

            if(!result){
                res.status(404).json({
                    success: false,
                    message : "Resource not found",
                })
                return
            }

            res.status(200).json({
                success: true,
                message: "Get detail resource",
                data:result,
            })
        } catch(error){
            res.status(422).json({
                succes: false,
                error: error.message,
            })
        }
    }

    /**
     * Mencari nama pasien
     */

    async Search(req = request, res = response){
        try{
            const {name} = await req.params
            const result = await patient_model.findMany({
                where : {
                    name : {
                        contains : name
                    }
                }
            })

            // jika tidak ditemukan
            if(!result){
                res.status(404).json({
                    success:false,
                    message : "Resource not found",
                    data : result,
                })
                return
            }

            res.status(200).json({
                success:true,
                message: "Resource found",
                data: result,
            })
        } catch (error){
            res.status(422).json({
                success:false,
                error: error.message,
            })
        }
    }

    /**
     * Mencari pasien bedasarkan status 
     */

     async Status(req = request, res = response){
        try{
            const{status} = await req.params

            // jika status tidak sesuai 
            const statusEnum = ["dead","recovered","positive"]
            if(!statusEnum.includes(status)){
                res.status(404).json({
                    success:false,
                    message:"Status incorret"
                })
                return
            }
            const result = await patient_model.findMany({
                where: {
                    status:status
                }
            })

            res.status(200).json({
                success:true,
                message : `Get ${status} resource`,
                [`total ${status}`]: result.length,
                data : result, 
            })

        } catch (error) {
            res.status(422).json({
                success:false,
                error:error.message
            })
        }
     } 
}

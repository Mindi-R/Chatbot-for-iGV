import Host from '../models/host.model.js';

export const getAllHosts = async (req, res, next) => {
    try {
        const hosts = await Host.find();

        res.status(200).json ({
            status: "success",
            data: hosts,
        })
    }catch(error){
        next(error);
    }
}

export const getHostById = async (req, res, next) => {
    try{
        const host = await Host.findById(req.params.id).select('-password');

        if(!host){
            const error = new Error('host not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            status:"success",
            data: host,
        })

    }catch(error){
        next(error);
    }
}
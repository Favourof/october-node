import {v2 as cloudinary} from 'cloudinary'
import { envConfig } from './envConfig.js'

cloudinary.config({
    cloud_name: envConfig.cloudinary.cloudName,
     api_secret: envConfig.cloudinary.secretKey,
    api_key:envConfig.cloudinary.apiKey,
   
})

export default cloudinary;
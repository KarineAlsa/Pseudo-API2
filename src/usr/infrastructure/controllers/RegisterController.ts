import { Request, Response } from "express";
import  RegisterUseCase  from "../../application/RegisterUserCase";
import {NodemailerEmailService} from "../service/mailService"

export default class CreateProductController {

    constructor(readonly useCase:RegisterUseCase, readonly emailService: NodemailerEmailService){}

    async run(request:Request,response:Response) {

        const mail = request.body.mail
        const name = request.body.name
        const password = request.body.password
        const status = false
        try {
            
            let user = await this.useCase.run(mail,name,password,status);
            if (user) {
               
                const verificationUrl = `http://${process.env.HOST_SERVER}:${process.env.PORT}/user/activate/${user.id}`;
                await this.emailService.sendEmail(mail, "Verificar", `Para hacer la verificación: ${verificationUrl}`);
                return response.status(200).json({user:"algo tiene que salir"});
            } else {
                response.status(500).send({
                    status: "internal server error",
                    data: "Ha ocurrido un error con tu peticion, inténtelo más tarde.",
                });
            }
        } catch (error) {
            response.status(204).send({
                status: "error",
                data: "Ha ocurrido un error durante su petición.",
                msg: error,
            });
        }
            

        }
    }


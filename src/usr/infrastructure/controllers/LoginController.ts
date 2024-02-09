import { Request, Response } from "express";
import  LoginUserCase  from "../../application/LoginUserCase";

export default class CreateProductController {

    constructor(readonly useCase:LoginUserCase){}

    async run(request:Request,response:Response) {
        const id = request.params.id
        const mail = request.body.mail
        const password = request.body.password
        try {
            
            let orderItem = await this.useCase.run(id,mail,password);

            return response.status(200).json({"login":orderItem, "verificado":orderItem});

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Error to create an order",
                    error:error
                });
        }
    }

}
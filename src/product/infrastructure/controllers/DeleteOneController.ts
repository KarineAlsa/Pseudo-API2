import { Request, Response } from "express";
import  DeleteUseCase  from "../../application/Delete";

export default class DeleteOneController {

    constructor(readonly useCase:DeleteUseCase){}

    async run(request:Request,response:Response) {

        const id = request.params.id
        try {
            
            let orderItem = await this.useCase.run(id);

            return response.status(200).json(orderItem);

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Error to delete an order",
                    error:error
                });
        }
    }

}
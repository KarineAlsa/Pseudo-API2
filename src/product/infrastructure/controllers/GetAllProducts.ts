import { Request, Response } from "express";
import  AllProductsUseCase  from "../../application/AllProducts";

export default class DeleteOneController {

    constructor(readonly useCase:AllProductsUseCase){}

    async run(request:Request,response:Response) {

        const id = request.params.id
        try {
            
            let orderItem = await this.useCase.run();

            return response.status(200).json(orderItem);

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Error to get products",
                    error:error
                });
        }
    }

}
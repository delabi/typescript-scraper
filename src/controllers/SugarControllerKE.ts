import { AppDataSource } from '../configs/data-source'

import { NextFunction, Request, Response } from "express"

import { Sugar } from "../entity/Sugar"

export class SugarControllerKE {
    private sugarRepository =  AppDataSource.getRepository(Sugar)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.sugarRepository.exist("Kenya").find()
    }

    async one (request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const sugar = await this.sugarRepository.findOne({
            where: { id }
        })

        if (!sugar) {
            return "unrecorded sugar"
        }
        return sugar
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, size, price, country, date } = request.body;

        const sugar = Object.assign(new Sugar(), {
            name,
            size,
            price,
            country,
            date
        })

        return this.sugarRepository.save(sugar)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let sugarToRemove = await this.sugarRepository.findOneBy({ id })

        if (!sugarToRemove) {
            return "this sugar does not exist"
        }

        await this.sugarRepository.remove(sugarToRemove)

        return "sugar removed successfully"
    }
}
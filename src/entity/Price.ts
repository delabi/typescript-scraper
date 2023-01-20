import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Prices {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    size: string

    @Column()
    price: string

    @Column()
    country: string

    @Column()
    date: string
}
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Sugar {
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
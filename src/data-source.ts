import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "sugar-database-1.cxpnplofhv5c.ap-northeast-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "Kulea2023",
    database: "sugarIndexDB",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

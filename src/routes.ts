import { UserController } from "./controller/UserController"
import { SugarController } from "./controller/SugarController"

export const Routes = [
{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},{
    method: "get",
    route: "/sugars",
    controller: SugarController,
    action: "all"
}, {
    method: "get",
    route: "/sugars/:id",
    controller: SugarController,
    action: "one"
}, {
    method: "post",
    route: "/sugars",
    controller: SugarController,
    action: "save"
}, {
    method: "delete",
    route: "/sugars/:id",
    controller: SugarController,
    action: "remove"
}]
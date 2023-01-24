import { SugarController } from "../controllers/SugarController"

export const Routes = [
{
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
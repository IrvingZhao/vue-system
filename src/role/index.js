const page = () => import( /* webpackChunkName:'system/role/index' */ "./page");
const List = () => import(/* webpackChunkName:'system/role/list' */ "./list");
const Edit = () => import(/* webpackChunkName:'system/role/edit' */ "./edit");

const router = [
    {
        name: "role-list",
        path: "",
        component: List
    },
    {
        name: "role-create",
        path: "add",
        component: Edit
    },
    {
        name: "role-edit",
        path: ":id",
        component: Edit,
        props: true
    }
];

export default {
    page, router
}
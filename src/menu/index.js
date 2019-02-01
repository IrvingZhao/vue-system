const page = () => import(/* webpackChunkName: 'system/menu/index'*/ "./page");
const MenuList = () => import(/* webpackChunkName: 'system/menu/index'*/ "./menuList");
const MenuEdit = () => import(/* webpackChunkName: 'system/menu/edit' */ "./menuEdit");

const router = [
    {
        name: "menu-list",
        path: "",
        component: MenuList
    },
    {
        name: "menu-add",
        path: "add",
        component: MenuEdit
    },
    {
        name: "menu-update",
        path: ":id",
        component: MenuEdit,
        props: true
    },
];
export default {
    page,
    router,
}
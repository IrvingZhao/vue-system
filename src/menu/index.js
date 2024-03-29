const page = () => import(/* webpackChunkName: 'system/menu/index'*/ "./page");
const MenuList = () => import(/* webpackChunkName: 'system/menu/index'*/ "./menuList");
const MenuEdit = () => import(/* webpackChunkName: 'system/menu/edit' */ "./menuEdit");

const router = [
    {
        name: "system-menu-list",
        path: "",
        component: MenuList,
        meta: {
            key: "system_menu_list"
        }
    },
    {
        name: "system-menu-add",
        path: "add",
        component: MenuEdit,
        meta: {
            key: "system_menu_add"
        }
    },
    {
        name: "system-menu-update",
        path: ":id",
        component: MenuEdit,
        props: true,
        meta: {
            key: "system_menu_edit"
        }
    },
];
export default {
    page,
    router,
}
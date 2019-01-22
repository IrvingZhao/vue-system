const page = () => import(/* webpackChunkName: 'system/menu/index'*/ "./page");
const MenuList = () => import(/* webpackChunkName: 'system/menu/index'*/ "./menuList");
const MenuEdit = () => import(/* webpackChunkName: 'system/menu/edit' */ "./menuEdit");
const MenuOperator = () => import(/* webpackChunkName: 'system/menu/operator/index' */ './operatorList');
const MenuOperatorEdit = () => import(/* webpackChunkName: 'system/menu/operator/edit' */ "./operatorEdit");

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
    {
        name: "menu-operator",
        path: ":menuId/operator",
        component: MenuOperator,
        props: true
    },
    {
        name: "menu-operator-add",
        path: ":menuId/operator/add",
        component: MenuOperatorEdit,
        props: true
    },
    {
        name: "menu-operator-update",
        path: ":menuId/operator/:operatorId",
        component: MenuOperatorEdit,
        props: true
    }
];
export default {
    page,
    router,
}
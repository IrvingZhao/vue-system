const page = () => import(/* webpackChunkName: 'system/dic/index'*/ "./page");
const DicTypeList = () => import(/* webpackChunkName: 'system/dic/index'*/ "./dicType/dicTypeList");
const DicTypeEdit = () => import(/* webpackChunkName: 'system/dic/edit'*/ "./dicType/dicTypeEdit");
const DicItemList = () => import(/* webpackChunkName: 'system/dic/item/list' */ "./dicItem/dicItemList");
const DicItemEdit = () => import(/* webpackChunkName: 'system/dic/item/edit'*/ "./dicItem/dicItemEdit");

const router = [
    {
        name: "dicTypeList",
        path: "",
        component: DicTypeList
    },
    {
        name: "dicTypeAdd",
        path: "add",
        component: DicTypeEdit
    },
    {
        name: "dicTypeEdit",
        path: ":id",
        component: DicTypeEdit,
        props: true
    },
    {
        name: "dicItemList",
        path: ":typeId/item",
        component: DicItemList,
        props: true
    },
    {
        name: "dicItemAdd",
        path: ":typeId/item/add",
        component: DicItemEdit,
        props: true
    },
    {
        name: "dicItemEdit",
        path: ":typeId/item/:id",
        component: DicItemEdit,
        props: true
    }
];

export default {
    page,
    router
}
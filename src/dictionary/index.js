const page = () => import(/* webpackChunkName: 'system/dic/index'*/ "./page");
const DicTypeList = () => import(/* webpackChunkName: 'system/dic/index'*/ "./dicType/dicTypeList");
const DicTypeEdit = () => import(/* webpackChunkName: 'system/dic/edit'*/ "./dicType/dicTypeEdit");
const DicItemList = () => import(/* webpackChunkName: 'system/dic/item/list' */ "./dicItem/dicItemList");
const DicItemEdit = () => import(/* webpackChunkName: 'system/dic/item/edit'*/ "./dicItem/dicItemEdit");

const router = [
    {
        name: "dicTypeList",
        path: "",
        component: DicTypeList,
        meta: {
            key: "system_dicType_list"
        }
    },
    {
        name: "dicTypeAdd",
        path: "add",
        component: DicTypeEdit,
        meta: {
            key: "system_dicType_add"
        }
    },
    {
        name: "dicTypeEdit",
        path: ":id",
        component: DicTypeEdit,
        props: true,
        meta: {
            key: "system_dicType_edit"
        }
    },
    {
        name: "dicItemList",
        path: ":typeId/item",
        component: DicItemList,
        props: true,
        meta: {
            key: "system_dicItem_list"
        }
    },
    {
        name: "dicItemAdd",
        path: ":typeId/item/add",
        component: DicItemEdit,
        props: true,
        meta: {
            key: "system_dicItem_add"
        }
    },
    {
        name: "dicItemEdit",
        path: ":typeId/item/:id",
        component: DicItemEdit,
        props: true,
        meta: {
            key: "system_dicItem_edit"
        }
    }
];

export default {
    page,
    router
}
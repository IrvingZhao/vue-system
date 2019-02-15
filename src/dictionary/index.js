const page = () => import(/* webpackChunkName: 'system/dic/index'*/ "./page");
const DicTypeList = () => import(/* webpackChunkName: 'system/dic/index'*/ "./dicType/dicTypeList");
const DicTypeEdit = () => import(/* webpackChunkName: 'system/dic/edit'*/ "./dicType/dicTypeEdit");
const DicItemList = () => import(/* webpackChunkName: 'system/dic/item/list' */ "./dicItem/dicItemList");
const DicItemEdit = () => import(/* webpackChunkName: 'system/dic/item/edit'*/ "./dicItem/dicItemEdit");

const router = [
    {
        name: "system-dicType-list",
        path: "",
        component: DicTypeList,
        meta: {
            key: "system_dicType_list"
        }
    },
    {
        name: "system-dicType-add",
        path: "add",
        component: DicTypeEdit,
        meta: {
            key: "system_dicType_add"
        }
    },
    {
        name: "system-dicType-edit",
        path: ":id",
        component: DicTypeEdit,
        props: true,
        meta: {
            key: "system_dicType_edit"
        }
    },
    {
        name: "system-dicItem-list",
        path: ":typeId/item",
        component: DicItemList,
        props: true,
        meta: {
            key: "system_dicItem_list"
        }
    },
    {
        name: "system-dicItem-add",
        path: ":typeId/item/add",
        component: DicItemEdit,
        props: true,
        meta: {
            key: "system_dicItem_add"
        }
    },
    {
        name: "system-dicItem-edit",
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
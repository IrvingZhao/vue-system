const page = () => import(/* webpackChunkName:"system/resource/index" */ './page');
const ResourceList = () => import(/* webpackChunkName:"system/resource/list" */ './list');
const ResourceEdit = () => import(/* webpackChunkName:"system/resource/edit" */ './edit');

const router = [
    {
        name: "system-resource-list",
        path: "",
        component: ResourceList,
        meta: {
            key: "system_resource_list"
        }
    },
    {
        name: "system-resource-add",
        path: "add",
        component: ResourceEdit,
        meta: {
            key: "system_resource_add"
        }
    },
    {
        name: "system-resource-edit",
        path: ":id",
        component: ResourceEdit,
        props: true,
        meta: {
            key: "system_resource_edit"
        }
    },
];

export default {
    page, router
}
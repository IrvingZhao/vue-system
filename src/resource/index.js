const page = () => import(/* webpackChunkName:"system/resource/index" */ './page');
const ResourceList = () => import(/* webpackChunkName:"system/resource/list" */ './list');
const ResourceEdit = () => import(/* webpackChunkName:"system/resource/edit" */ './edit');

const router = [
    {
        name: "resource-list",
        path: "",
        component: ResourceList
    },
    {
        name: "resource-create",
        path: "add",
        component: ResourceEdit
    },
    {
        name: "resource-edit",
        path: ":id",
        component: ResourceEdit,
        props: true
    },
];

export default {
    page, router
}
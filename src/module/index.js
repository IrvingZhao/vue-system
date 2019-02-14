const page = () => import(/* webpackChunkName:"system/module/index" */ './page');
const List = () => import(/* webpackChunkName:"system/module/list" */ './list');
const Edit = () => import(/* webpackChunkName:"system/module/edit" */ './edit');
const PageList = () => import(/* webpackChunkName:"system/module/page/list" */ './page/list');
const PageEdit = () => import(/* webpackChunkName:"system/module/page/edit" */ './page/edit');
const OperatorList = () => import(/* webpackChunkName:"system/module/operator/list" */ './operator/list');
const OperatorEdit = () => import(/* webpackChunkName:"system/module/operator/edit" */ './operator/edit');
const ResourceList = () => import(/* webpackChunkName:"system/module/resource/list" */ './resource/list');
const ResourceEdit = () => import(/* webpackChunkName:"system/module/resource/edit" */ './resource/edit');

const router = [
    {
        name: "module-list",
        path: "",
        component: List,
        meta: {
            key: "system_module_list"
        }
    },
    {
        name: "module-create",
        path: "add",
        component: Edit,
        meta: {
            key: "system_module_add"
        }
    },
    {
        name: "module-edit",
        path: ":id",
        props: true,
        component: Edit,
        meta: {
            key: "system_module_edit"
        }
    },
    {
        name: "module-page-list",
        path: ":moduleId/page",
        component: PageList,
        props: true,
        meta: {
            key: "system_module_page_list"
        }
    },
    {
        name: "module-page-create",
        path: ":moduleId/page/add",
        component: PageEdit,
        props: true,
        meta: {
            key: "system_module_page_add"
        }
    },
    {
        name: "module-page-edit",
        path: ":moduleId/page/:id",
        component: PageEdit,
        props: true,
        meta: {
            key: "system_module_page_edit"
        }
    },
    {
        name: "module-page-operator-list",
        path: ":moduleId/page/:pageId/operator",
        component: OperatorList,
        props: true,
        meta: {
            key: "system_module_page_operator_list"
        }
    },
    {
        name: "module-page-operator-create",
        path: ":moduleId/page/:pageId/operator/add",
        component: OperatorEdit,
        props: true,
        meta: {
            key: "system_module_page_operator_add"
        }
    },
    {
        name: "module-page-operator-edit",
        path: ":moduleId/page/:pageId/operator/:id",
        component: OperatorEdit,
        props: true,
        meta: {
            key: "system_module_page_operator_edit"
        }
    },
    {
        name: "module-page-resource-list",
        path: ":moduleId/page/:pageId/resource",
        component: ResourceList,
        props: true,
        meta: {
            key: "system_module_page_resource_list"
        }
    },
    {
        name: "module-page-resource-create",
        path: ":moduleId/page/:pageId/resource/add",
        component: ResourceEdit,
        props: true,
        meta: {
            key: "system_module_page_resource_add"
        }
    },
    {
        name: "module-page-resource-edit",
        path: ":moduleId/page/:pageId/resource/:id",
        component: ResourceEdit,
        props: true,
        meta: {
            key: "system_module_page_resource_edit"
        }
    },
    {
        name: "module-page-operator-resource-list",
        path: ":moduleId/page/:pageId/operator/:operatorId/resource",
        component: ResourceList,
        props: true,
        meta: {
            key: "system_module_page_operator_resource_list"
        }
    },
    {
        name: "module-page-operator-resource-create",
        path: ":moduleId/page/:pageId/operator/:operatorId/resource/add",
        component: ResourceEdit,
        props: true,
        meta: {
            key: "system_module_page_operator_resource_add"
        }
    },
    {
        name: "module-page-operator-resource-edit",
        path: ":moduleId/page/:pageId/operator/:operatorId/resource/:id",
        component: ResourceEdit,
        props: true,
        meta: {
            key: "system_module_page_operator_resource_edit"
        }
    },
];

export default {
    page, router
}

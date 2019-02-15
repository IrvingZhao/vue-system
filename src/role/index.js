const page = () => import( /* webpackChunkName:'system/role/index' */ "./page");
const List = () => import(/* webpackChunkName:'system/role/list' */ "./list");
const Edit = () => import(/* webpackChunkName:'system/role/edit' */ "./edit");
const AuthEdit = () => import(/* webpackChunkName:'system/role/auth/edit' */ "./auth/edit");

const router = [
    {
        name: "system-role-list",
        path: "",
        component: List,
        meta: {
            key: "system_role_list"
        }
    },
    {
        name: "system-role-add",
        path: "add",
        component: Edit,
        meta: {
            key: "system_role_add"
        }
    },
    {
        name: "system-role-edit",
        path: ":id",
        component: Edit,
        props: true,
        meta: {
            key: "system_role_edit"
        }
    },
    {
        name: "system-role-auth-edit",
        path: ":id/auth",
        component: AuthEdit,
        props: true,
        meta: {
            key: "system_role_list_auth"
        }
    }
];

export default {
    page, router
}
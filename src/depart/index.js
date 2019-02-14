import page from './page';
import List from './list';
import Edit from './edit';

const router = [
    {
        name: "depart-list",
        path: "",
        component: List,
        meta: {
            key: "system_depart_list"
        }
    },
    {
        name: "depart-create",
        path: "add",
        component: Edit,
        meta: {
            key: "system_depart_add"
        }
    },
    {
        name: "depart-edit",
        path: ":id",
        component: Edit,
        props: true,
        meta: {
            key: "system_depart_edit"
        }
    }
];

export default {
    page, router
}
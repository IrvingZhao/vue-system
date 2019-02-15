import page from './page';
import List from './list';
import Edit from './edit';

const router = [
    {
        name: "system-depart-list",
        path: "",
        component: List,
        meta: {
            key: "system_depart_list"
        }
    },
    {
        name: "system-depart-add",
        path: "add",
        component: Edit,
        meta: {
            key: "system_depart_add"
        }
    },
    {
        name: "system-depart-edit",
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
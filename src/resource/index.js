import page from './page';
import List from './list';
import Edit from './edit';

const router = [
    {
        name: "resource-list",
        path: "",
        component: List
    },
    {
        name: "resource-create",
        path: "add",
        component: Edit
    },
    {
        name: "resource-edit",
        path: ":id",
        props: true,
        component: Edit
    },

];

export default {
    page, router
}
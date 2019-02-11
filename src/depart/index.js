import page from './page';
import List from './list';
import Edit from './edit';

const router = [
    {
        name: "depart-list",
        path: "",
        component: List
    },
    {
        name: "depart-create",
        path: "add",
        component: Edit,
    },
    {
        name: "depart-edit",
        path: ":id",
        component: Edit,
        props: true
    }
];

export default {
    page, router
}
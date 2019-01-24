import page from './page';
import List from './list';
import Edit from './edit';

const router = [
    {
        name: "module-list",
        path: "",
        component: List
    },
    {
        name: "module-edit",
        path: ":id",
        props: true,
        component: Edit
    },
    {
        name: "module-create",
        path: "create",
        component: Edit
    }
];

export default {
    page, router
}

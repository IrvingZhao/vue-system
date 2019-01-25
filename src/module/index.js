import page from './page';
import List from './list';
import Edit from './edit';
import PageList from './page/list';
import PageEdit from './page/edit';

const router = [
    {
        name: "module-list",
        path: "",
        component: List
    },
    {
        name: "module-create",
        path: "add",
        component: Edit
    },
    {
        name: "module-edit",
        path: ":id",
        props: true,
        component: Edit
    },
    {
        name: "module-page-list",
        path: ":moduleId/page",
        component: PageList,
        props: true
    },
    {
        name: "module-page-create",
        path: ":moduleId/page/add",
        component: PageEdit
    },
    {
        name: "module-page-edit",
        path: ":moduleId/page/:id",
        component: PageEdit,
        props: true
    },
];

export default {
    page, router
}

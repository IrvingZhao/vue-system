import page from './page';
import List from './list';
import Edit from './edit';
import PageList from './page/list';
import PageEdit from './page/edit';
import OperatorList from './operator/list';
import OperatorEdit from './operator/edit';

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
        component: PageEdit,
        props: true
    },
    {
        name: "module-page-edit",
        path: ":moduleId/page/:id",
        component: PageEdit,
        props: true
    },
    {
        name: "module-page-operator-list",
        path: ":moduleId/page/:pageId/operator",
        component: OperatorList,
        props: true
    },
    {
        name: "module-page-operator-create",
        path: ":moduleId/page/:pageId/operator/add",
        component: OperatorEdit,
        props: true
    },
    {
        name: "module-page-operator-create",
        path: ":moduleId/page/:pageId/operator/:id",
        component: OperatorEdit,
        props: true
    }
];

export default {
    page, router
}

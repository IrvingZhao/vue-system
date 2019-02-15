import page from './page';
import List from './list';
import Edit from './edit';

let router = [
    {
        name: "system-property-list",
        path: "",
        component: List,
        meta: {
            key: "system_property_list"
        }
    },
    {
        name: "system-property-add",
        path: "add",
        component: Edit,
        meta: {
            key: "system_property_add"
        }
    },
    {
        name: "system-property-edit",
        path: ":id",
        component: Edit,
        props: true,
        meta: {
            key: "system_property_edit"
        }
    }
];

export default {
    page, router
}
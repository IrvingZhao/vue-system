import Menu from './menu';
import Dic from './dictionary';
import Module from './module';
import Resource from './resource';
import Depart from './depart';
import Role from './role';
import Property from './properties'
import page from './BasePage';

let router = [
    {
        path: "menu",
        component: Menu.page,
        children: Menu.router
    },
    {
        path: "dic",
        component: Dic.page,
        children: Dic.router
    },
    {
        path: "module",
        component: Module.page,
        children: Module.router
    },
    {
        path: "resource",
        component: Resource.page,
        children: Resource.router
    },
    {
        path: "depart",
        component: Depart.page,
        children: Depart.router
    },
    {
        path: "role",
        component: Role.page,
        children: Role.router
    },
    {
        path: "property",
        component: Property.page,
        children: Property.router
    }
];

export default {
    router, page
};
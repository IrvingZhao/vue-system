import Menu from './menu';
import Dic from './dictionary';
import Module from './module';
import Resource from './resource';
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
    }
];

export default {
    router, page
};
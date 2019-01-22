import menu from './menu';
import dic from './dictionary';
import Resource from './resource';
import page from './BasePage';

let router = [
    {
        name: "menu",
        path: "menu",
        component: menu.page,
        children: menu.router
    },
    {
        name: "dic",
        path: "dic",
        component: dic.page,
        children: dic.router
    },
    {
        name: "resource",
        path: "resource",
        component: Resource.page,
        children: Resource.router
    }
];

export default {
    router, page
};
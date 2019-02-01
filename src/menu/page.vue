<template>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</template>

<script>
    import Store from './store';
    import SystemModuleStore from '../module/store';

    export default {
        name: "index",
        created() {
            this.$bread.splice(2);
            this.$bread.push({name: "菜单管理", path: "/system/menu"});
            if (!this.$store.system_menu) {
                this.$store.registerModule(["system_menu"], Store);
            }
            this.$store.dispatch("system_menu/updateMenus");

            if (!this.$store.system_module) {
                this.$store.registerModule(["system_module"], SystemModuleStore);
            }
            this.$store.dispatch("system_module/updateAllModulePage")
        },
        destroyed() {
            this.$store.unregisterModule(["system_menu", "system_module"]);
        }
    }
</script>

<style scoped>

</style>
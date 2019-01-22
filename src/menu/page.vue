<template>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</template>

<script>
    import Store from './store';

    export default {
        name: "index",
        created() {
            this.$bread.splice(2);
            this.$bread.push({name: "菜单管理", path: "/system/menu"});
            if (!this.$store.system_menu) {
                this.$store.registerModule(["system_menu"], Store);
            }
            this.$store.dispatch("system_menu/updateMenus");
        },
        destroyed() {
            this.$store.unregisterModule(["system_menu"]);
        }
    }
</script>

<style scoped>

</style>
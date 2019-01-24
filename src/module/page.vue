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
            this.$bread.push({name: "模块管理", path: "/system/module"});
            if (!this.$store.system_module) {
                this.$store.registerModule(["system_module"], Store);
            }
            this.$store.dispatch("system_module/updateModules");
        },
        destroyed() {
            this.$store.unregisterModule(["system_module"]);
        }
    }
</script>

<style scoped>

</style>
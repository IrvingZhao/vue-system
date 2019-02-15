<template>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</template>

<script>
    import Store from './store';

    export default {
        name: "page",
        created() {
            this.$bread.splice(2);
            this.$bread.push({name: "系统参数管理", path: "/system/property"});
            if (!this.$store.system_property) {
                this.$store.registerModule(["system_property"], Store);
            }
            this.$store.dispatch("system_property/updateProperties");
        },
        destroyed() {
            this.$store.unregisterModule(["system_property"]);
        }
    }
</script>

<style scoped>

</style>
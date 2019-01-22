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
            this.$bread.push({name: "资源管理", path: "/system/resource"});
            if (!this.$store.system_resource) {
                this.$store.registerModule(["system_resource"], Store);
            }
        },
        destroyed() {
            this.$store.unregisterModule(["system_resource"]);
        }
    }
</script>

<style scoped>

</style>
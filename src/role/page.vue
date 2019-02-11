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
            this.$bread.push({name: "角色管理", path: "/system/role"});
            if (!this.$store.system_role) {
                this.$store.registerModule(["system_role"], Store);
            }
            this.$store.dispatch("system_role/updateRoles");
        },
        destroyed() {
            this.$store.unregisterModule(["system_role"]);
        }
    }
</script>

<style scoped>

</style>
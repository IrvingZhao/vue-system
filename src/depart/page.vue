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
            this.$bread.push({name: "机构管理", path: "/system/depart"});
            if (!this.$store.system_dic) {
                this.$store.registerModule(["system_depart"], Store);
            }
            this.$store.dispatch("system_depart/updateDeparts");
        },
        destroyed() {
            this.$store.unregisterModule(["system_depart"]);
        }
    }
</script>

<style scoped>

</style>
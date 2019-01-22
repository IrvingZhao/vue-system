<template>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</template>

<script>
    import Store from './store';

    export default {
        name: "base-dic-page",
        created() {
            this.$bread.splice(2);
            this.$bread.push({name: "字典类型管理", path: "/system/dic"});
            if (!this.$store.system_dic) {
                this.$store.registerModule(["system_dic"], Store);
            }
            this.$store.dispatch("system_dic/updateDicTypes");
        },
        destroyed() {
            this.$store.unregisterModule(["system_dic"]);
        }
    }
</script>

<style scoped>

</style>
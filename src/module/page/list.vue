<template>
    <xlb-base-page>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">【{{moduleMap[moduleId]?moduleMap[moduleId].name:""}}】页面管理</template>
            <template>
                <router-link append to="add">
                    <el-button size="small">新增</el-button>
                </router-link>
            </template>
        </xlb-toolbar>
        <el-table :data="pageList" slot="grid">
            <el-table-column property="name" label="名称"></el-table-column>
            <el-table-column property="key" label="key"></el-table-column>
            <el-table-column property="path" label="地址"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <router-link append :to="scope.row.id" class="mgr-10">
                        <el-button size="small">修改</el-button>
                    </router-link>
                    <el-button size="small" @click="deleteDicItem(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </xlb-base-page>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';

    export default {
        name: "list",
        props: ["moduleId"],
        activated() {
            this.$bread.splice(3);
            this.$bread.push({name: "菜单管理", path: "/system/module/" + this.moduleId + "/page"});
            if (!this.hasWatch) {
                this.$store.dispatch("system_module/updatePages", this.moduleId);
            }
        },
        deactivated() {
            this.hasWatch = false;
        },
        watch: {
            moduleId() {
                this.hasWatch = true;
                this.$store.dispatch("system_module/updatePages", this.moduleId);
            }
        },
        computed: {
            ...mapState("system_module", ["pageList", "moduleMap"]),
            ...mapGetters("system_module", ["api"])
        },
        data() {
            return {
                hasWatch: false,
            }
        },
        methods: {
            deleteDicItem(id) {
                this.$confirm("确定删除该页面？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.page.del(this.moduleId, id).then(({body}) => {
                        const {code, msg, data} = body;
                        if ("000000" === code) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });
                            this.$store.dispatch("system_module/updatePages");
                        }
                    });
                }).catch(() => {
                });
            }
        }
    }
</script>

<style scoped>

</style>
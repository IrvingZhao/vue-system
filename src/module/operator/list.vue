<template>
    <xlb-base-page>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">【{{pageMap[pageId]?pageMap[pageId].name:""}}】功能管理</template>
            <template>
                <router-link append to="add">
                    <el-button size="small">新增</el-button>
                </router-link>
            </template>
        </xlb-toolbar>
        <el-table :data="operators" slot="grid">
            <el-table-column property="name" label="名称"></el-table-column>
            <el-table-column property="key" label="key"></el-table-column>
            <el-table-column label="类型">
                <template slot-scope="scope">
                    {{operatorType[scope.row.type]||scope.row.type}}
                </template>
            </el-table-column>
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
    import {mapGetters, mapState} from 'vuex';

    export default {
        name: "list",
        props: ["moduleId", "pageId"],
        activated() {
            this.$bread.splice(3);
            this.$bread.push({name: "页面管理", path: "/system/module/" + this.moduleId + "/page"});
            this.$bread.push({name: "功能管理", path: "/system/module/" + this.moduleId + "/page/" + this.pageId + "/operator"});
            if (!this.hasWatch) {
                this.$store.dispatch("system_module/updateOperators", {moduleId: this.moduleId, pageId: this.pageId});
            }
        },
        deactivated() {
            this.hasWatch = false;
        },
        watch: {
            moduleId() {
                this.hasWatch = true;
                this.$store.dispatch("system_module/updateOperators", {moduleId: this.moduleId, pageId: this.pageId});
            }
        },
        computed: {
            ...mapGetters("system_module", ["api"]),
            ...mapState("system_module", ["pageMap", "operators"]),
            operatorType() {
                return this.$dic.getDicItemMap("system.operator.type") || {}
            }
        },
        data() {
            return {
                hasWatch: false,
            }
        },
        methods: {
            deleteDicItem(id) {
                this.$confirm("确定删除该功能？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.operator.del(this.moduleId, this.pageId, id).then(({body}) => {
                        const {code, msg, data} = body;
                        if ("000000" === code) {
                            this.$message({
                                message: msg,
                                type: "success"
                            });
                            this.$store.dispatch("system_module/updateOperators", {
                                moduleId: this.moduleId,
                                pageId: this.pageId
                            });
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
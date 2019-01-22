<template>
    <xlb-base-page>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">【{{menuMap[this.menuId]?menuMap[menuId].name:""}}】功能管理</template>
            <template>
                <router-link append to="add">
                    <el-button size="small">新增</el-button>
                </router-link>
            </template>
        </xlb-toolbar>
        <el-table :data="operators" slot="grid">
            <el-table-column property="name" label="功能名称"></el-table-column>
            <el-table-column property="key" label="功能key"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <router-link append :to="scope.row.id" class="mgr-10">
                        <el-button size="small">修改</el-button>
                    </router-link>
                    <el-button size="small" @click="deleteOperator(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </xlb-base-page>
</template>

<script>
    import {mapState,mapGetters} from 'vuex';

    export default {
        name: "operator-list",
        props: ["menuId"],
        activated() {
            this.$bread.splice(3);
            this.$bread.push({name: "功能管理", path: "/system/menu/" + this.menuId + "/operator"});
            if (this.menuId) {
                if (!this.hasWatch) {
                    this.loadData();
                }
            }
        },
        deactivated() {
            this.hasWatch = false;
        },
        watch: {
            menuId(newVal) {
                if (newVal) {
                    this.hasWatch = true;
                    this.loadData();
                }
            }
        },
        computed: {
            ...mapState("system_menu", [
                "menuMap"
            ]),
            ...mapGetters("system_menu", ["api"]),
        },
        data() {
            return {
                operators: [],
                hasWatch: false
            }
        },
        methods: {
            loadData() {
                this.api.operator.list(this.menuId).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        this.operators = data;
                    }
                })
            },
            deleteOperator(id) {
                this.$confirm("确定删除该功能？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.operator.del(this.menuId, id).then(({body}) => {
                        const {code, msg, data} = body;
                        if ("000000" === code) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });
                            this.loadData();
                        }
                    })
                }).catch(() => {
                });
            }
        },
    }
</script>

<style scoped>

</style>
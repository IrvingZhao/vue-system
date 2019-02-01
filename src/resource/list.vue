<template>
    <xlb-base-page>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">
                接口管理
            </template>
            <template>
                <router-link append to="add">
                    <el-button size="small">新增</el-button>
                </router-link>
            </template>
        </xlb-toolbar>
        <el-table :data="resources" slot="grid">
            <el-table-column property="name" label="名称"></el-table-column>
            <el-table-column property="key" label="key"></el-table-column>
            <el-table-column property="url" label="地址"></el-table-column>
            <el-table-column property="method" label="请求方法"></el-table-column>
            <el-table-column label="操作" width="250">
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
        computed: {
            ...mapState("system_resource", ["resources"]),
            ...mapGetters("system_resource", ["api"]),
        },
        methods: {
            deleteDicItem(id) {
                this.$confirm("确定删除该接口？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.del(id).then(({body}) => {
                        const {code, msg, data} = body;
                        if ("000000" === code) {
                            this.$message({
                                message: msg,
                                type: "success"
                            });
                            this.$store.dispatch("system_resource/updateResource");
                        }
                    })
                });
            }
        }
    }
</script>

<style scoped>

</style>
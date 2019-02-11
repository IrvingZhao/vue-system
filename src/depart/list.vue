<template>
    <xlb-base-page>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">机构管理</template>
            <template>
                <router-link append to="add">
                    <el-button size="small">新增</el-button>
                </router-link>
            </template>
        </xlb-toolbar>
        <xlb-tree-table slot="grid" :data="departList">
            <xlb-tree-table-column label="名称" width="5" property="name"></xlb-tree-table-column>
            <xlb-tree-table-column label="操作" width="1">
                <template slot-scope="scope">
                    <router-link append :to="scope.row.id" class="mgr-10">
                        <el-button size="small" @click.stop>修改</el-button>
                    </router-link>
                    <el-button size="small" @click.stop="deleteClickHandle(scope.row.id)">删除</el-button>
                </template>
            </xlb-tree-table-column>
        </xlb-tree-table>
    </xlb-base-page>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';

    export default {
        name: "list",
        created() {
            console.info(this);
        },
        computed: {
            ...mapState("system_depart", ["departList"]),
            ...mapGetters("system_depart", ["api"])
        },
        activated(){
            this.$bread.splice(3);
        },
        methods: {
            deleteClickHandle(id) {
                this.$confirm("确定删除该机构？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.delete(id).then(({body}) => {
                        const {code, msg} = body;
                        if ("000000" === code) {
                            this.$message({
                                message: msg,
                                type: "success"
                            });
                            this.$store.dispatch("system_depart/updateDeparts")
                        }
                    })
                });
            }
        }
    }
</script>

<style scoped>

</style>
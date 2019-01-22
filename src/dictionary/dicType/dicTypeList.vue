<template>
    <xlb-base-page>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">字典类型管理</template>
            <template>
                <router-link append to="add">
                    <el-button size="small">新增</el-button>
                </router-link>
            </template>
        </xlb-toolbar>
        <xlb-tree-table slot="grid" :data="dicTypes">
            <xlb-tree-table-column label="名称" width="5" property="name"></xlb-tree-table-column>
            <xlb-tree-table-column label="编码" width="3" property="path"></xlb-tree-table-column>
            <xlb-tree-table-column label="操作" width="2">
                <template slot-scope="scope">
                    <router-link append :to="scope.row.id" class="mgr-10">
                        <el-button size="small" @click.stop>修改</el-button>
                    </router-link>
                    <router-link append :to="scope.row.id+'/item'" class="mgr-10">
                        <el-button size="small" @click.stop>字典项管理</el-button>
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
        name: "dic-type-list",
        activated() {
            this.$bread.splice(3);
        },
        computed: {
            ...mapState("system_dic", [
                "dicTypes"
            ]),
            ...mapGetters("system_dic", ["api"])
        },
        data() {
            return {}
        },
        methods: {
            deleteClickHandle(id) {
                this.$confirm("确定删除该字典类型？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.dicType.del(id).then(({body}) => {
                        const {code, msg, data} = body;
                        if ("000000" === code) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });
                            this.$store.dispatch("system_dic/updateDicTypes");
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
<template>
    <xlb-base-page>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">【{{dicTypeMap[typeId]?dicTypeMap[typeId].name:""}}】字典项管理</template>
            <template>
                <router-link append to="add">
                    <el-button size="small">新增</el-button>
                </router-link>
            </template>
        </xlb-toolbar>
        <el-table :data="dicItemList" slot="grid">
            <el-table-column property="code" label="字典项编码"></el-table-column>
            <el-table-column property="name" label="字典项展示值"></el-table-column>
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
        name: "dic-item-list",
        props: ["typeId"],
        activated() {
            this.$bread.splice(3);
            this.$bread.push({name: "字典项管理", path: "/system/dic/" + this.typeId + "/item"});
            if (!this.hasWatch) {
                this.loadDicItem();
            }
        },
        deactivated() {
            this.hasWatch = false;
        },
        computed: {
            ...mapState("system_dic", [
                "dicTypeMap"
            ]),
            ...mapGetters("system_dic", ["api"])
        },
        watch: {
            typeId() {
                this.hasWatch = true;
                this.loadDicItem();
            }
        },
        data() {
            return {
                hasWatch: false,
                dicItemList: []
            }
        },
        methods: {
            loadDicItem() {
                this.api.dicItem.list(this.typeId).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        this.dicItemList = data;
                    }
                })
            },
            deleteDicItem(itemId) {
                this.$confirm("确定删除该字典项？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.dicItem.del(this.typeId, itemId).then(({body}) => {
                        const {code, msg, data} = body;
                        if ("000000" === code) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });
                            this.loadDicItem();
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
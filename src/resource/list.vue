<template>
    <xlb-base-page>
        <xlb-search-form slot="searchForm" @search="search" @reset="reset">
            <div class="search-form-item">
                <div class="form-label">查询条件：</div>
                <el-input v-model="query" @change="searchParamChange" placeholder="请输入接口名称、key、地址"></el-input>
            </div>
        </xlb-search-form>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">
                公共接口管理
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
        <el-pagination slot="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="pageInfo.pageIndex" :page-sizes="[10,20,50]" :page-size="pageInfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total"></el-pagination>
    </xlb-base-page>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
        name: "list",
        computed: {
            ...mapState("system_resource", ["resources", "pageInfo"]),
            ...mapGetters("system_resource", ["api"]),
        },
        activated() {
            this.$bread.splice(3);
        },
        data() {
            return {
                query: ""
            }
        },
        methods: {
            search() {
                this.$store.dispatch("system_resource/updateResource");
            },
            reset() {
                this.query = "";
                this.$store.commit("system_resource/updateQuery", "");
                this.search();
            },
            handleSizeChange(val) {
                this.$store.commit("system_resource/updatePageSize", val);
                this.search();
            },
            handleCurrentChange(val) {
                this.$store.commit("system_resource/updatePageIndex", val);
                this.search();
            },
            searchParamChange(query) {
                this.$store.commit("system_resource/updateQuery", {query})
            },
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
                            this.search();
                        }
                    })
                });
            }
        }
    }
</script>

<style scoped>
    .search-form-item {
        flex: 0 0 400px;
        display: flex;
        align-items: center;
        margin: 0 10px 10px 0;
    }
</style>
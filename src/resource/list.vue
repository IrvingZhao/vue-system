<template>
    <xlb-base-page>
        <xlb-search-form slot="searchForm" @search="search" @reset="reset">
            <div class="search-form-item">
                <div class="form-label">查询条件：</div>
                <el-input v-model="searchForm.query" placeholder="请输入名称、key、地址"></el-input>
            </div>
        </xlb-search-form>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">资源管理</template>
            <template>
                <router-link append to="add">
                    <el-button size="small">新增</el-button>
                </router-link>
            </template>
        </xlb-toolbar>
        <el-table slot="grid" :data="gridData" :fit="true">
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="Key" prop="key"></el-table-column>
            <el-table-column label="地址" prop="url"></el-table-column>
            <el-table-column label="请求方法">
                <template slot-scope="scope">
                    {{reqMethod[scope.row.method]||scope.row.method}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <router-link class="mgr-10" append :to="scope.row.id">
                        <el-button>修改</el-button>
                    </router-link>
                    <el-button @click="deleteItem(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination slot="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="pageParams.pageIndex" :page-sizes="[10,20,50]"
                       :page-size.sync="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="total"></el-pagination>
    </xlb-base-page>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
        name: "list",
        data() {
            return {
                gridData: [],
                pageParams: {
                    pageIndex: 1,
                    pageSize: 10
                },
                total: 0,
                searchForm: {
                    query: ""
                },
            };
        },
        activated() {
            this.$bread.splice(3);
        },
        computed: {
            ...mapGetters("system_resource", ["api"]),
            reqMethod() {
                return this.$dic.getDicItemMap("system.requestMethod") || {};
            }
        },
        created() {
            console.info(this);
            this.loadData();
        },
        methods: {
            loadData() {
                this.api.list({...this.pageParams, query: this.searchForm.query}).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        this.gridData = data.list;
                        this.total = data.total;
                    }
                });
            },
            deleteItem(id) {
                this.$confirm("确定删除该功能？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.del(id).then(({body}) => {
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
            },
            handleCurrentChange() {
                this.loadData();
            },
            handleSizeChange() {
                this.loadData();
            },
            search() {
                this.loadData();
            },
            reset() {
                this.searchForm.query = "";
                this.loadData();
            }
        }
    }
</script>

<style scoped>
    .search-form-item {
        align-items: center;
        flex: 0 0 500px;
        display: flex;
        margin: 0 10px 10px 0;
    }
</style>
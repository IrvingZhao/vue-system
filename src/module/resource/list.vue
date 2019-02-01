<template>
    <xlb-base-page>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle" v-if="operatorId">
                【{{operatorMap[operatorId]?operatorMap[operatorId].name:""}}】接口管理
            </template>
            <template slot="pageTitle" v-else>【{{pageMap[pageId]?pageMap[pageId].name:""}}】接口管理</template>
            <template>
                <router-link append to="add">
                    <el-button size="small">新增</el-button>
                </router-link>
            </template>
        </xlb-toolbar>
        <el-table :data="resourceList" slot="grid">
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
    import {mapState, mapGetters} from 'vuex';

    export default {
        name: "list",
        props: ["operatorId", "pageId", "moduleId"],
        activated() {
            this.$bread.splice(3);
            this.$bread.push({name: "页面管理", path: "/system/module/" + this.moduleId + "/page"});
            if (this.operatorId) {
                this.$bread.push([
                    {
                        name: "功能管理",
                        path: "/system/module/" + this.moduleId + "/page/" + this.pageId + "/operator"
                    },
                    {
                        name: "接口管理",
                        path: "/system/module/" + this.moduleId + "/page/" + this.pageId + "/operator/" + this.operatorId + "/resource"
                    }
                ])
            } else {
                this.$bread.push({
                    name: "接口管理",
                    path: "/system/module/" + this.moduleId + "/page/" + this.pageId + "/resource"
                });
            }
            //数据不存在时，跳转
            if (!this.pageId) {
                this.$router.push("/system/module");
            }
            if (this.pageId) {
                if (Object.getOwnPropertyNames(this.pageMap).length < 2) {
                    if (this.moduleId) {
                        this.$router.push("/system/module/" + this.moduleId + "/page");
                    } else {
                        this.$router.push("/system/module");
                    }
                }
            }
            if (this.operatorId) {
                if (Object.getOwnPropertyNames(this.operatorMap) < 2) {
                    this.$router.push("/system/module/" + this.moduleId + "/page/" + this.pageId + "/operator")
                }
            }
            this.loadResource();
        },
        computed: {
            ...mapState("system_module", ["pageMap", "operatorMap", "resourceList"]),
            ...mapGetters("system_module", ["api"]),
            type() {
                return this.operatorId ? "operator" : "page"
            },
            sourceId() {
                return this.operatorId || this.pageId;
            }
        },
        data() {
            return {}
        },
        methods: {
            loadResource() {
                this.$store.dispatch("system_module/updateResource", {
                    type: this.type,
                    sourceId: this.sourceId
                });
            },
            deleteDicItem(id) {
                this.$confirm("确定删除该接口？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.resource.del(this.type, this.sourceId, id).then(({body}) => {
                        const {code, msg, data} = body;
                        if ("000000" === code) {
                            this.$message({
                                message: msg,
                                type: "success"
                            });
                            this.$store.dispatch("system_module/updateResource", {
                                type: this.type,
                                sourceId: this.sourceId
                            });
                        }
                    })
                });
            }
        }
    }
</script>

<style scoped>

</style>
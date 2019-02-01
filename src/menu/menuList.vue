<template>
    <xlb-base-page>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">菜单管理</template>
            <template>
                <!--<router-link append to="add" tag="el-button" :props="{size:'small'}">-->
                <!--新增-->
                <!--</router-link>-->
                <router-link append to="add">
                    <el-button size="small">新增</el-button>
                </router-link>
            </template>
        </xlb-toolbar>
        <xlb-tree-table slot="grid" :data="menus">
            <xlb-tree-table-column label="名称" width="3" property="name"></xlb-tree-table-column>
            <xlb-tree-table-column label="页面" width="4">
                <template slot-scope="scope">
                    {{getPagePath(scope.row.page)}}
                </template>
            </xlb-tree-table-column>
            <xlb-tree-table-column label="操作" width="3">
                <template slot-scope="scope">
                    <router-link append :to="scope.row.id" class="mgr-10">
                        <el-button size="small" @click.stop>修改</el-button>
                    </router-link>
                    <router-link append :to="scope.row.id+'/operator'" class="mgr-10">
                        <el-button size="small" @click.stop>功能配置</el-button>
                    </router-link>
                    <el-button size="small" @click.stop="deleteClickHandle(scope.row.id)">删除</el-button>
                </template>
            </xlb-tree-table-column>
        </xlb-tree-table>
    </xlb-base-page>
</template>

<script>
    import {mapState, mapGetters} from "vuex";

    export default {
        name: "menu-list",
        activated() {
            this.$bread.splice(3);
        },
        computed: {
            ...mapState("system_menu", [
                "menus"
            ]),
            ...mapState("system_module", ["modulePageTreeMap"]),
            ...mapGetters("system_menu", ["api"]),
        },
        methods: {
            getPagePath(pageId) {
                return pageId ?
                    this.$util.getTreePath(this.modulePageTreeMap, pageId,"name").join(">")
                    : ""
            },
            deleteClickHandle(id) {
                this.$confirm("确定删除该菜单？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.menu.del(id).then(({body}) => {
                        const {code, msg} = body;
                        if ("000000" === code) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });
                            this.$store.dispatch("system_menu/updateMenus");
                        }
                    });
                }).catch(() => {
                });
            }
        }
    }
</script>

<style scoped>
    .router-link {
        margin-right: 10px;
    }
</style>
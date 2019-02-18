<template>
    <xlb-base-page>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">
                权限配置
            </template>
        </xlb-toolbar>
        <div class="main-content" slot="grid">
            <div class="left tree-item">
                <el-tree ref="menuTree" :data="allAuthMenuTreeWithRoot" show-checkbox node-key="id"
                         :props="defaultProps"
                         :default-expand-all="true"
                         :expand-on-click-node="false" @current-change="menuCurrentChange"
                         @check-change="menuNodeCheckedChange">
                </el-tree>
            </div>
            <div class="right tree-item">
                <el-tree ref="operatorTree" :data="operatorTree" show-checkbox node-key="id" :props="defaultProps"
                         :default-expand-all="true"
                         :expand-on-click-node="false" @check-change="operatorNodeCheckedChange"/>
            </div>
        </div>
        <div class="button-area" slot="pagination">
            <el-button @click="save" type="primary">保存</el-button>
            <el-button>取消</el-button>
        </div>
    </xlb-base-page>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import {EditPage} from 'xlb-platform';

    export default {
        name: "edit",
        props: ["id"],
        mixins: [EditPage],
        computed: {
            ...mapGetters("system_role", ["api", "getPageOperators"]),
            ...mapState("system_role", ["pageMap", "allAuthMenuTree", "allOperatorMap"]),
            allAuthMenuTreeWithRoot() {
                return [{id: "root", name: "菜单", children: this.allAuthMenuTree}];
            },
            editBread() {
                return {name: "权限配置", path: "/system/role/" + this.id + "/auth"}
            },
        },
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                operatorTree: [],
                currentMenuId: "",
                menuOperatorCheckedMap: {},
                menuCurrentNodeKey: "",
                isInit: false,
                execMenuChange: true,
                breadSplice: 3
            };
        },
        methods: {
            reset() {
            },
            loadData() {
                this.isInit = true;
                new Promise((resolve) => {
                    if (!this.allAuthMenuTree || this.allAuthMenuTree.length === 0) {// 如果所有授权对象不存在，加载
                        this.$store.dispatch("system_role/updateAllAuthObject").then(resolve)
                    } else {
                        resolve();
                    }
                }).then(() => {
                    this.api.auth.getRoleAuthObject(this.id).then(({body}) => {//加载角色授权对象
                        const {code, data} = body;
                        if ("000000" === code) {
                            this.checkedRoleOldMenu(data.menus);
                            this.generateOperatorChecked(data.operators);
                            this.$nextTick(() => {
                                this.isInit = false;
                            });
                        }
                    })
                });
            },
            checkedRoleOldMenu(menus) {
                menus.forEach((item) => {
                    this.$refs.menuTree.setChecked(item.id, true, false);
                })
            },
            generateOperatorChecked(operators) {
                let pageMap = {};
                let operatorMap = {};
                //构建 page key value对象
                operators.forEach((item) => {
                    if (item.type === "page") {
                        pageMap[item.id] = item;
                    } else if (item.type === "operator") {
                        operatorMap[item.id] = item;
                    }
                });
                for (let operatorKey in operatorMap) {
                    if (operatorMap.hasOwnProperty(operatorKey)) {
                        let itemOperator = operatorMap[operatorKey];
                        let page = pageMap[itemOperator.pageId];
                        let refPage = pageMap[itemOperator.refPageId];
                        if (page) {
                            //关联 page 和 operators
                            (page.operators = page.operators || []).push(itemOperator);
                        }
                        if (refPage) {
                            //构建 operator 树
                            itemOperator.children = (refPage.operators = refPage.operators || []);
                        }
                    }
                }
                for (let pageKey in pageMap) {
                    if (pageMap.hasOwnProperty(pageKey)) {
                        this.menuOperatorCheckedMap[pageKey] = this.$util.getCurrentAndChildProp({children: pageMap[pageKey].operators}, "id");
                    }
                }
            },
            menuCurrentChange(data, node) {
                //切换operatorTree 及 currentMenuId 之前，保存之前的 operator的 checked的数据
                this.currentMenuId = data.id;
                if (data.page) {
                    this.operatorTree = [{
                        id: "root",
                        name: data.name + " - 操作",
                        children: this.getPageOperators(data.page)
                    }];
                } else {
                    this.operatorTree = [];
                }
                if (node.checked) {
                    //如果菜单节点为选中状态的话，更新左侧操作树，设置选中数据
                    let checkedKeys = this.menuOperatorCheckedMap[data.page] || this.$util.getCurrentAndChildProp({children: this.operatorTree}, "id");
                    this.$nextTick().then(() => {
                        checkedKeys.forEach((item) => {
                            this.$refs.operatorTree.setChecked(item, true, false);
                        });
                    });
                } else {
                    this.$refs.operatorTree.setCheckedKeys([]);
                }
            },
            menuNodeCheckedChange(data, checked) {
                if (!this.execMenuChange) {//菜单树选中时间执行开关
                    this.execMenuChange = true;
                    return;
                }
                if (!data.page) {//没有页面的 菜单，选择或未选择时，不执行操作
                    return;
                }
                if (!checked && this.menuOperatorCheckedMap[data.page]) {
                    this.menuOperatorCheckedMap[data.page] = [];//取消选择菜单后，如果该菜单的功能有被选中的操作数据，则置空
                } else if (checked && (!this.menuOperatorCheckedMap[data.page] || this.menuOperatorCheckedMap[data.page].length === 0)) { // 被选中，并且缓存中无已选择操作数据，则选择全部
                    this.menuOperatorCheckedMap[data.page] = this.$util.getCurrentAndChildProp({children: this.getPageOperators(data.page)}, "id");
                }
                if (data.id === this.currentMenuId) {//如果菜单树 选中改变的数据为当前选中的菜单话，设置操作树全部取消选中
                    let checkedKeys = checked ? this.menuOperatorCheckedMap[data.page] : [];//选中时，右侧所有操作选中
                    this.$refs.operatorTree.setCheckedKeys(checkedKeys);
                } else if (!this.isInit) { //非初始化的时候，切换左侧menu选择数据，右侧自动刷新为 菜单对应操作数据
                    this.menuCurrentChange(data, {checked});
                }
            },
            operatorNodeCheckedChange(data, checked) {
                let menuNode = this.$refs.menuTree.getNode(this.currentMenuId);
                if (!this.menuOperatorCheckedMap[menuNode.data.page]) {
                    this.menuOperatorCheckedMap[menuNode.data.page] = [];
                }
                if (checked) {//选中一个功能，则左侧菜单自动选中
                    if (!menuNode.checked) {
                        this.execMenuChange = false;
                        menuNode.checked = true;
                    }
                    this.menuOperatorCheckedMap[menuNode.data.page].push(data.id);
                } else {
                    this.menuOperatorCheckedMap[menuNode.data.page] = this.menuOperatorCheckedMap[menuNode.data.page].filter((item) => item !== data.id);
                }
            },
            save() {
                let checkedMenus = this.$refs.menuTree.getCheckedNodes(false, true);
                let checkedMenuKeys = {};
                let checkedOperatorKeys = {};
                let checkedPageKeys = {};
                checkedMenus.forEach((menuItem) => {
                    if (menuItem.id !== "root") {
                        checkedMenuKeys[menuItem.id] = true;
                        if (menuItem.page) {
                            checkedPageKeys[menuItem.page] = true;
                            this.menuOperatorCheckedMap[menuItem.page].forEach((item) => {
                                if (item !== "root") {
                                    checkedOperatorKeys[item] = true;
                                    if (this.allOperatorMap[item].refPageId) {
                                        checkedPageKeys[this.allOperatorMap[item].refPageId] = true;
                                    }
                                }
                            });
                        }
                    }
                });
                this.api.auth.saveRoleAuthObject(this.id, {
                    menus: Object.keys(checkedMenuKeys),
                    pages: Object.keys(checkedPageKeys),
                    operators: Object.keys(checkedPageKeys)
                }).then(({body}) => {
                    const {code, msg} = body;
                    if ("000000" === code) {
                        this.$message({
                            message: msg,
                            type: "success"
                        });
                        this.$router.push("/system/role")
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">

    .main-content {
        display: flex;
        flex: 1 1 auto;
        height: 100%;
    }

    .tree-item {
        flex: 1 1 50%;
        overflow: auto;
        border: 1px solid #ddd;
    }

    .right {
        margin-left: 15px;
    }

    .button-area {
        display: flex;
        flex: 0 0 40px;
        margin-top: 15px;
    }
</style>
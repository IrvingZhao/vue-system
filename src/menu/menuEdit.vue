<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="menuForm">
        <el-form-item prop="name" label="菜单名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="key" label="Key">
            <el-input v-model="form.key"></el-input>
        </el-form-item>
        <el-form-item prop="parent" label="父菜单">
            <el-cascader v-model="form.parent" :options="menus" filterable clearable change-on-select
                         :props="{label:'name',value:'id'}"></el-cascader>
        </el-form-item>
        <el-form-item prop="page" label="菜单访问页面">
            <el-cascader v-model="form.page" :options="modulePageTree" :props="refPageProps" clearable></el-cascader>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
    import {EditPage} from 'xlb-platform';

    export default {
        name: "menu-add",
        props: ["id"],
        mixins: [EditPage],
        computed: {
            ...mapState("system_menu_module", ["modulePageTree", "modulePageTreeMap"]),
            ...mapState("system_menu", [
                "menus", "menuMap"
            ]),
            ...mapGetters("system_menu", [
                "api"
            ]),
            editBread() {
                return {name: "修改", path: "/system/menu/" + this.id};
            },
            addBread() {
                return {name: "新增", path: "/system/menu/add"};
            }
        },
        data() {
            return {
                form: {
                    name: "",
                    key: "",
                    parent: [],
                    page: []
                },
                // hasChangeData: false,
                ruleForm: {
                    name: [
                        {required: true, message: "请输入菜单名称"}
                    ],
                    key: [
                        {required: true, message: "请输入菜单key"}
                    ]
                },
                refPageProps: {
                    value: "id",
                    label: "name"
                }
            }
        },
        methods: {
            loadData() {
                this.api.menu.getOne(this.id).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        if (data && data.id) {
                            data.parent = this.$util.getTreePath(this.menuMap, data.parent);
                            data.page = this.$util.getTreePath(this.modulePageTreeMap, data.page);
                            this.form = data;
                        } else {
                            this.$message({
                                message: "未找到id为[" + this.id + "]的菜单",
                                type: "error"
                            })
                        }
                    }
                });
            },
            reset() {
                this.$refs.menuForm.resetFields();
            },
            save() {
                this.$refs.menuForm.validate((valid) => {
                    if (valid) {
                        let data = {...this.form};
                        data.parent = data.parent[data.parent.length - 1];
                        if (data.page.length > 0) {
                            data.page = data.page[data.page.length - 1];
                        } else {
                            data.page = undefined;
                        }
                        data.id = this.id;
                        this.api.menu.save(data).then(({body}) => {
                            const {code, msg} = body;
                            if (code === "000000") {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$store.dispatch("system_menu/updateMenus");
                                this.$router.push("/system/menu");//TODO 刷新 主区域菜单
                            }
                        });
                    } else {
                        this.$message({
                            message: "请正确填写表单",
                            type: "error"
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
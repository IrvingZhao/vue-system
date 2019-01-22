<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="menuForm">
        <el-form-item prop="name" label="菜单名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="path" label="菜单地址">
            <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item prop="parent" label="父菜单">
            <el-cascader v-model="form.parent" :options="menus" filterable clearable change-on-select
                         :props="{label:'name',value:'id'}"></el-cascader>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">立即创建</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {mapState, mapGetters} from "vuex";

    export default {
        name: "menu-add",
        props: ["id"],
        activated() {
            if (!this.hasChangeData) {
                this.updateData();
            }
        },
        watch: {
            id() {
                this.hasChangeData = true;
                this.updateData();
            }
        },
        deactivated() {
            this.reset();
            this.hasChangeData = false;
        },
        computed: {
            ...mapState("system_menu", [
                "menus"
            ]),
            ...mapGetters("system_menu", [
                "menuPath",
                "api"
            ]),
        },
        data() {
            return {
                form: {
                    name: "",
                    path: "",
                    parent: []
                },
                hasChangeData: false,
                ruleForm: {
                    name: [
                        {required: true, message: "请输入菜单名称"}
                    ]
                }
            }
        },
        methods: {
            updateData() {
                this.$bread.splice(3);
                if (this.id) {
                    this.loadItemMenu();
                    this.$bread.push({name: "修改", path: "/system/menu/" + this.id});
                } else {
                    this.reset();
                    this.$bread.push({name: "新增", path: "/system/menu/add"});
                }
            },
            loadItemMenu() {
                this.api.menu.getOne(this.id).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        if (data && data.id) {
                            data.parent = this.menuPath(data.parent);
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
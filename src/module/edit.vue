<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="moduleForm">
        <el-form-item prop="name" label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="描述">
            <el-input type="textarea" :rows="2" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item prop="parent" label="父模块">
            <el-cascader v-model="form.parent" :options="modules" filterable clearable change-on-select
                         :props="{label:'name',value:'id'}"></el-cascader>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';

    export default {
        name: "edit",
        props: ["id"],
        activated() {
            if (!this.hasWatch) {
                this.updateModule();
            }
        },
        watch: {
            id() {
                this.hasWatch = true;
                this.updateModule();
            }
        },
        deactivated() {
            this.reset();
            this.hasWatch = false;
        },
        computed: {
            ...mapGetters("system_module", ["api"]),
            ...mapState("system_module", ["modules", "moduleMap"])
        },
        data() {
            return {
                hasWatch: false,
                form: {
                    name: "",
                    desc: "",
                    parent: []
                },
                ruleForm: {
                    name: {required: true, message: "请输入模块名称"}
                }
            }
        },
        methods: {
            updateModule() {
                this.$bread.splice(3);
                this.$store.commit("system_module/clearDisable");
                if (this.id) {
                    this.$store.commit("system_module/setDisabled", this.id);
                    this.loadModule();
                    this.$bread.push({name: "修改", path: "/system/module/" + this.id});
                } else {
                    this.reset();
                    this.$bread.push({name: "新增", path: "/system/module/add"});
                }
            },
            loadModule() {
                this.api.getOne(this.id).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        if (data && data.id) {
                            data.parent = this.$util.getTreePath(this.moduleMap, data.parent);
                            this.form = data;
                        } else {
                            this.$message({
                                message: "未找到id为[" + this.id + "]的模块",
                                type: "error"
                            });
                        }
                    }
                })
            },
            save() {
                this.$refs.moduleForm.validate((valid) => {
                    if (valid) {
                        let data = {...this.form};
                        data.parent = data.parent[data.parent.length - 1];
                        data.id = this.id;
                        this.api.save(data).then(({body}) => {
                            const {code, msg} = body;
                            if (code === "000000") {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$store.dispatch("system_module/updateModules");
                                this.$router.push("/system/module");
                            }
                        });
                    } else {
                        this.$message({
                            message: "请正确填写表单",
                            type: "error"
                        });
                    }
                });
            },
            reset() {
                this.$refs.moduleForm.resetFields();
            },
        }
    }
</script>

<style scoped>

</style>
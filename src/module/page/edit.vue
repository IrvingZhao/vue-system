<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="form">
        <el-form-item prop="name" label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="key" label="Key">
            <el-input v-model="form.key"></el-input>
        </el-form-item>
        <el-form-item prop="path" label="页面地址">
            <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="描述">
            <el-input type="textarea" :rows="2" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
        name: "edit",
        props: ["moduleId", "id"],
        activated() {
            if (!this.hasWatch) {
                this.updatePage();
            }
        },
        watch: {
            id() {
                this.hasWatch = true;
                this.updatePage();
            }
        },
        deactivated() {
            this.reset();
            this.hasWatch = false;
        },
        computed: {
            ...mapGetters("system_module", ["api"]),
        },
        data() {
            return {
                hasWatch: false,
                form: {
                    name: "",
                    key: "",
                    path: "",
                    remark: ""
                },
                ruleForm: {
                    name: {required: true, message: "页面名称不能为空"},
                    key: {required: true, message: "页面key不能为空"},
                    path: {required: true, message: "页面地址不能为空"},
                }
            }
        },
        methods: {
            updatePage() {
                this.$bread.splice("3");
                this.$bread.push({name: "页面管理", path: "/system/module/" + this.moduleId + "/page"});
                if (this.id) {
                    this.loadPage();
                    this.$bread.push({name: "修改", path: "/system/module/" + this.moduleId + "/page/" + this.id});
                } else {
                    this.reset();
                    this.$bread.push({name: "新增", path: "/system/module/" + this.moduleId + "/page/add"});
                }
            },
            loadPage() {
                this.api.page.getOne(this.moduleId, this.id).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        this.form = data;
                    }
                });
            },
            save() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let data = {...this.form};
                        data.id = this.id;
                        this.api.page.save(this.moduleId, data).then(({body}) => {
                            const {code, msg} = body;
                            if (code === "000000") {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$router.push("/system/module/" + this.moduleId + "/page");
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
                this.$refs.form.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
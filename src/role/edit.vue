<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="form">
        <el-form-item prop="name" label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="编码">
            <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="描述">
            <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {EditPage} from 'xlb-platform';

    export default {
        name: "edit",
        props: ["id"],
        mixins: [EditPage],
        computed: {
            ...mapGetters("system_role", ["api"]),
            editBread() {
                return {name: "修改", path: "/system/role/" + this.id}
            },
            addBread() {
                return {name: "新增", path: "/system/role/add"}
            },
        },
        data() {
            return {
                form: {
                    name: "",
                    code: "",
                    remark: ""
                },
                ruleForm: {
                    name: {required: true, message: "请输入角色名称"},
                    code: {required: true, message: "请输入角色编码"}
                },
            }
        },
        methods: {
            loadData() {
                this.api.getOne(this.id).then(({body}) => {
                    const {code, data} = body;
                    if ("000000" === code) {
                        this.form = data;
                    }
                })
            },
            save() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let data = {...this.form};
                        data.id = this.id;
                        this.api.save(data).then(({body}) => {
                            const {code, msg} = body;
                            if ("000000" === code) {
                                this.$message({
                                    message: msg,
                                    type: "success"
                                });
                                this.$router.push("/system/role");
                                this.$store.dispatch("system_role/updateRoles")
                            }
                        })
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
            },
        }
    }
</script>

<style scoped>

</style>
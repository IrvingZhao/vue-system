<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="form">
        <el-form-item prop="name" label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="key" label="Key">
            <el-input v-model="form.key"></el-input>
        </el-form-item>
        <el-form-item prop="value" label="值">
            <el-input v-model="form.value"></el-input>
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
            ...mapGetters("system_property", ["api"]),
            editBread() {
                return {name: "修改", path: "/system/property/" + this.id};
            },
            addBread() {
                return {name: "新增", path: "/system/property/add"};
            }
        },
        data() {
            return {
                form: {
                    name: "", key: "", value: "", remark: ""
                },
                ruleForm: {
                    name: {required: true, message: "请输入属性名称"},
                    key: {required: true, message: "请输入属性Key"},
                    value: {required: true, message: "请输入属性值"}
                },
                breadSplice: 3
            }
        },
        methods: {
            loadData() {
                this.api.getOne(this.id).then(({body}) => {
                    const {code, data} = body;
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
                        this.api.save(data).then(({body}) => {
                            const {code, msg} = body;
                            if ("000000" === code) {
                                this.$message({
                                    message: msg,
                                    type: "success"
                                });
                                this.$router.push("/system/property");
                                this.$store.dispatch("system_property/updateProperties")
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
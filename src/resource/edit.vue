<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="form">
        <el-form-item prop="name" label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="key" label="Key">
            <el-input v-model="form.key"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="接口地址">
            <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item prop="method" label="请求方法">
            <el-select v-model="form.method">
                <el-option v-for="item in requestMethods" :key="item" :value="item" :label="item"></el-option>
            </el-select>
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
            ...mapGetters("system_resource", ["api"]),
            addBread() {
                return {name: "新增", path: "/system/resource/add"}
            },
            editBread() {
                return {name: "修改", path: "/system/resource/" + this.id}
            }
        },
        data() {
            return {
                requestMethods: ["GET", "POST", "PUT", "DELETE"],
                form: {
                    name: "",
                    key: "",
                    url: "",
                    method: ""
                },
                ruleForm: {
                    name: {required: true, message: "请输入接口名称"},
                    key: {required: true, message: "请输入接口key"},
                    url: {required: true, message: "请输入接口地址"},
                    method: {required: true, message: "请选择请求方法"},
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
                                this.$router.push("/system/resource");
                                this.$store.dispatch("system_resource/updateResource")
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
            }
        }
    }
</script>

<style scoped>

</style>
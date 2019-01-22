<template>
    <el-form :model="form" :rules="ruleForm" label-width="150px" ref="resourceForm">
        <el-form-item prop="name" label="接口名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="key" label="接口key">
            <el-input v-model="form.key"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="接口地址">
            <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item prop="method" label="接口方法">
            <el-select v-model="form.method">
                <el-option v-for="item in requestMethods" :key="item.key" :label="item.value"
                           :value="item.key"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="public" label="是否为公共方法">
            <el-switch v-model="form.public" active-value="Y" inactive-value="N"></el-switch>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">立即创建</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "edit",
        activated() {
            if (!this.hasWatch) {
                this.updateData();
            }
        },
        props: ["id"],
        computed: {
            ...mapGetters("system_resource", ["api"]),
            requestMethods() {
                return this.$dic.getDicItemArray("system.requestMethod");
            }
        },
        watch: {
            id(newVal) {
                this.hasWatch = true;
                this.updateData();
            }
        },
        data() {
            return {
                hasWatch: false,
                form: {
                    name: "",
                    key: "",
                    url: "",
                    method: "",
                    public: "N"
                },
                ruleForm: {
                    name: {required: true, message: "请输入接口名称"},
                    key: {required: true, message: "请输入接口key"},
                    url: {required: true, message: "请输入接口地址"},
                    method: {required: true, message: "请选择接口请求方法"},
                }
            }
        },
        methods: {
            updateData() {
                this.$bread.splice(3);
                if (this.id) {
                    this.loadResource();
                    this.$bread.push({name: "修改", path: "/system/resource/" + this.id});
                } else {
                    this.reset();
                    this.$bread.push({name: "新增", path: "/system/resource/add"});
                }
            },
            loadResource() {
                this.api.getOne(this.id).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        this.form = data;
                    } else {
                        this.$message({
                            message: "未找到id为[" + this.id + "]的接口",
                            type: "error"
                        });
                    }
                });
            },
            save() {
                this.$refs.resourceForm.validate((valid) => {
                    if (valid) {
                        let data = {...this.form};
                        data.id = this.id;

                        this.api.save(data).then(({body}) => {
                            const {code, msg, data} = body;
                            if ("000000" === code) {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$router.push("/system/resource")
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
                this.$refs.resourceForm.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
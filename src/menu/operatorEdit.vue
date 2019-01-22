<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="operatorForm">
        <el-form-item prop="name" label="功能名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="key" label="功能key">
            <el-input v-model="form.key"></el-input>
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
        name: "operator-edit",
        props: ["menuId", "operatorId"],
        created() {
        },
        activated() {
            if (!this.hasWatch) {
                this.updateData();
            }
        },
        deactivated() {
            this.reset();
        },
        watch: {
            operatorId() {
                this.hasWatch = true;
                this.updateData();
            }
        },
        computed: {
            ...mapGetters("system_menu", ["api"]),
        },
        data() {
            return {
                form: {
                    name: "",
                    key: ""
                },
                hasWatch: false,
                ruleForm: {
                    name: [
                        {required: true, message: "请输入功能名称"}
                    ],
                    key: [
                        {required: true, message: "请输入功能key"}
                    ]
                }
            }
        },
        methods: {
            updateData() {
                this.$bread.splice(3);
                this.$bread.push({name: "功能管理", path: "/system/menu/" + this.menuId + "/operator"});
                if (this.operatorId) {
                    this.loadOperator();
                    this.$bread.push({
                        name: "修改",
                        path: "/system/menu/" + this.menuId + "/operator/" + this.operatorId
                    });
                } else {
                    this.$bread.push({name: "新增", path: "/system/menu/" + this.menuId + "/operator/add"});
                    this.reset();
                }
            },
            loadOperator() {
                this.api.operator.getOne(this.menuId, this.operatorId).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        if (data && data.id) {
                            this.form = data;
                        } else {
                            this.$message({
                                message: "未找到id为[" + this.operatorId + "]的功能",
                                type: "error"
                            });
                        }
                    }
                });
            },
            save() {
                this.$refs.operatorForm.validate((valid) => {
                    if (valid) {
                        let data = {...this.form};
                        data.id = this.operatorId;
                        this.api.operator.save(this.menuId, data).then(({body}) => {
                            const {code, msg} = body;
                            if (code === "000000") {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$router.push("/system/menu/" + this.menuId + "/operator");
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
                this.$refs.operatorForm.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="dicItemForm">
        <el-form-item prop="code" label="编码">
            <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="展示值">
            <el-input v-model="form.name"></el-input>
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
    import {mapGetters} from 'vuex';
    import {EditPage} from 'xlb-platform';

    export default {
        name: "dic-item-edit",
        props: ["typeId", "id"],
        mixins: [EditPage],
        computed: {
            ...mapGetters("system_dic", ["api"]),
            addBread() {
                return [
                    {name: "字典项管理", path: "/system/dic/" + this.typeId + "/item"},
                    {name: "新增", path: "/system/dic/" + this.typeId + "/item/add"}
                ];
            },
            editBread() {
                return [
                    {name: "字典项管理", path: "/system/dic/" + this.typeId + "/item"},
                    {name: "修改", path: "/system/dic/" + this.typeId + "/item/" + this.id}
                ];
            }
        },
        data() {
            return {
                form: {
                    name: "",
                    code: "",
                    remark: ""
                },
                ruleForm: {
                    name: [{required: true, message: "请输入字典项展示值"}],
                    code: [{required: true, message: "请输入字典项编码"}]
                },
            }
        },
        methods: {
            loadData() {
                this.api.dicItem.getOne(this.typeId, this.id).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        this.form = data;
                    }
                })
            },
            save() {
                this.$refs.dicItemForm.validate((valid) => {
                    if (valid) {
                        let data = {...this.form};
                        data.id = this.id;
                        this.api.dicItem.save(this.typeId, data).then(({body}) => {
                            const {code, data, msg} = body;
                            if ("000000" === code) {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$router.push("/system/dic/" + this.typeId + "/item");//TODO 刷新保存的字典项
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
                this.$refs.dicItemForm.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
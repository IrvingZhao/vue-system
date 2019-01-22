<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="dicTypeForm">
        <el-form-item prop="name" label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="编码">
            <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="描述">
            <el-input type="textarea" :rows="2" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item prop="parent" label="父字典项">
            <el-cascader v-model="form.parent" :options="dicTypes" filterable clearable change-on-select
                         :props="{label:'name',value:'id'}"></el-cascader>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">立即创建</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';

    export default {
        name: "dic-type-edit",
        props: ["id"],
        activated() {
            if (!this.hasWatch) {
                this.updateDicType();
            }
        },
        watch: {
            id() {
                this.hasWatch = true;
                this.updateDicType();
            }
        },
        deactivated() {
            this.reset();
            this.hasWatch = false;
        },
        computed: {
            ...mapState("system_dic", [
                "dicTypes"
            ]),
            ...mapGetters("system_dic", [
                "dicPath", "api"
            ]),
        },
        data() {
            return {
                form: {
                    name: "",
                    code: "",
                    desc: "",
                    parent: []
                },
                ruleForm: {
                    name: [{required: true, message: "请输入字典类型名称"}],
                    code: [{required: true, message: "请输入字典类型编码"}]
                },
                hasWatch: false
            }
        },
        methods: {
            updateDicType() {
                this.$bread.splice(3);
                if (this.id) {
                    this.loadDicType();
                    this.$bread.push({name: "修改", path: "/system/dic/" + this.id});
                } else {
                    this.reset();
                    this.$bread.push({name: "新增", path: "/system/dic/add"});
                }
            },
            loadDicType() {
                this.api.dicType.getOne(this.id).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        if (data && data.id) {
                            data.parent = this.dicPath(data.parent);
                            this.form = data;
                        } else {
                            this.$message({
                                message: "未找到id为[" + this.id + "]的字典项",
                                type: "error"
                            })
                        }
                    }
                })
            },
            save() {
                this.$refs.dicTypeForm.validate((valid) => {
                    if (valid) {
                        let data = {...this.form};
                        data.parent = data.parent[data.parent.length - 1];
                        data.id = this.id;
                        this.api.dicType.save(data).then(({body}) => {
                            const {code, msg} = body;
                            if (code === "000000") {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$store.dispatch("system_dic/updateDicTypes");
                                this.$router.push("/system/dic");//TODO 刷新 系统缓存字典类型数据
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
                this.$refs.dicTypeForm.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
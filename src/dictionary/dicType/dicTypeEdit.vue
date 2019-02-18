<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="dicTypeForm">
        <el-form-item prop="name" label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="编码">
            <el-input v-model="form.code">
                <template v-if="codePrepend" slot="prepend">{{codePrepend}}</template>
            </el-input>
        </el-form-item>
        <el-form-item prop="remark" label="描述">
            <el-input type="textarea" :rows="2" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item prop="parent" label="父字典项">
            <el-cascader v-model="form.parent" :options="dicTypes" filterable clearable change-on-select
                         @change="parentSelect"
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
    import {EditPage} from 'xlb-platform';

    export default {
        name: "dic-type-edit",
        props: ["id"],
        mixins: [EditPage],
        computed: {
            ...mapState("system_dic", ["dicTypes", "dicTypeMap"]),
            ...mapGetters("system_dic", ["api"]),
            editBread() {
                return {name: "修改", path: "/system/dic/" + this.id};
            },
            addBread() {
                return {name: "新增", path: "/system/dic/add"};
            }
        },
        data() {
            return {
                codePrepend: "",
                form: {
                    name: "",
                    code: "",
                    remark: "",
                    parent: []
                },
                ruleForm: {
                    name: [{required: true, message: "请输入字典类型名称"}],
                    code: [{required: true, message: "请输入字典类型编码"}]
                },
            }
        },
        methods: {
            loadData() {
                this.$store.commit("system_dic/setDisabled", this.id);
                this.api.dicType.getOne(this.id).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        if (data && data.id) {
                            let dataCode = data.code.split(".");
                            data.code = dataCode.pop();
                            this.codePrepend = dataCode.join(".");
                            data.parent = this.$util.getTreePath(this.dicTypeMap, data.parent);
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
                        data.code = this.codePrepend + "." + data.code;
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
                this.codePrepend = "";
                this.$store.commit("system_dic/clearDisable");
                this.$refs.dicTypeForm.resetFields();
            },
            parentSelect(selectDicType) {
                let parent = selectDicType[selectDicType.length - 1];
                if (parent) {
                    this.codePrepend = this.dicTypeMap[parent].code + ".";
                } else {
                    this.codePrepend = "";
                }
            }
        }
    }
</script>

<style scoped>

</style>
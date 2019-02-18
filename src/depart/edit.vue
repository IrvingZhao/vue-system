<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="form">
        <el-form-item prop="name" label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="parent" label="父机构">
            <el-cascader v-model="form.parent" :options="departList" filterable clearable change-on-select
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
        name: "edit",
        props: ["id"],
        mixins: [EditPage],
        computed: {
            ...mapState("system_depart", ["departList", "departMap"]),
            ...mapGetters("system_depart", ["api"]),
            addBread() {
                return {name: "新增", path: "/system/depart/add"};
            },
            editBread() {
                return {name: "修改", path: "/system/depart/" + this.id};
            }
        },
        data() {
            return {
                form: {
                    name: "",
                    parent: []
                },
                ruleForm: {
                    name: {required: true, message: "请输入机构名称"}
                }
            }
        },
        methods: {
            loadData() {
                this.$store.commit("system_depart/setDisabled", this.id);
                this.api.getOne(this.id).then(({body}) => {
                    const {code, msg, data} = body;
                    if ("000000" === code) {
                        if (data && data.id) {
                            data.parent = this.$util.getTreePath(this.departMap, data.parent);
                            this.form = data;
                        } else {
                            this.$message({
                                message: "未找到id为[" + this.id + "]的机构",
                                type: "error"
                            })
                        }
                    }
                })
            },
            save() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let data = {...this.form};
                        data.parent = data.parent[data.parent.length - 1];
                        data.id = this.id;
                        this.api.save(data).then(({body}) => {
                            const {code, msg} = body;
                            if ("000000" === code) {
                                this.$message({
                                    message: msg,
                                    type: "success"
                                });
                                this.$store.dispatch("system_depart/updateDeparts");
                                this.$router.push("/system/depart");//TODO 刷新系统缓存的机构信息
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
                this.$store.commit("system_depart/clearDisable");
                this.$refs.form.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
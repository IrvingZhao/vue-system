<template>
    <el-form :model="form" :rules="ruleForm" label-width="100px" ref="form">
        <el-form-item prop="name" label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="key" label="Key">
            <el-input v-model="form.key"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="类型">
            <el-radio-group v-model="form.type" size="small">
                <el-radio-button label="event">事件触发</el-radio-button>
                <el-radio-button label="link">链接页面</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="refPage" label="引用页面" v-if="form.type==='link'">
            <el-cascader v-model="form.refPage" :options="modulePageTree" :props="refPageProps" clearable></el-cascader>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';

    export default {
        name: "edit",
        activated() {
            console.info(this);
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
        props: ["moduleId", "pageId", "id"],
        computed: {
            ...mapState("system_module", ["modulePageTree", "modulePageTreeMap"]),
            ...mapGetters("system_module", ["api"])
        },
        data() {
            return {
                form: {
                    name: "",
                    key: "",
                    type: "event",
                    refPage: []
                },
                ruleForm: {
                    name: {required: true, message: "请输入操作名称"},
                    key: {required: true, message: "请输入操作名称"},
                    refPage: {required: true, message: "请选择跳转页面"}
                },
                refPageProps: {
                    value: "id",
                    label: "name"
                }
            }
        },
        methods: {
            updatePage() {
                new Promise((resolve) => {
                    if (this.modulePageTree.length === 0) {
                        this.$store.dispatch("system_module/updateAllModulePage").then(() => resolve())
                    } else {
                        resolve();
                    }
                }).then(() => {
                    this.$bread.splice(3);
                    this.$bread.push([
                        {name: "页面管理", path: "/system/module/" + this.moduleId + "/page"},
                        {name: "功能管理", path: "/system/module/" + this.moduleId + "/page/" + this.pageId + "/operator"}
                    ]);
                    if (this.id) {
                        this.$bread.push({
                            name: "修改",
                            path: "/system/module/" + this.moduleId + "/page/" + this.pageId + "/operator/" + this.id
                        });
                        this.api.operator.getOne(this.moduleId, this.pageId, this.id).then(({body}) => {
                            const {code, msg, data} = body;
                            if ("000000" === code) {
                                data.refPage = this.$util.getTreePath(this.modulePageTreeMap, data.refPage);
                                this.form = data;
                            }
                        });
                    } else {
                        this.$bread.push({
                            name: "新增",
                            path: "/system/module/" + this.moduleId + "/page/" + this.pageId + "/operator/add"
                        })
                    }
                })
            },
            save() {
                this.$refs.form.validate((v) => {
                    if (v) {
                        let data = {...this.form};
                        data.id = this.id;
                        if (data.type === "event") {
                            data.refPage = null;
                        } else if (data.type === "link") {
                            data.refPage = data.refPage[data.refPage.length - 1];
                        }
                        this.api.operator.save(this.moduleId, this.pageId, data).then(({body}) => {
                            const {code, msg} = body;
                            if ("000000" === code) {
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                this.$router.push("/system/module/" + this.moduleId + "/page/" + this.pageId + "/operator");
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
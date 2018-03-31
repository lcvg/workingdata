<style lang="less">
    @import './editable-table.less';
</style>

<template>

    <div>
          <!-- <Checkbox-group v-model="check"> -->
            
             <Table :ref="refs"  :columns="columnsList" @click.native="alt($event)" :data="thisTableData" border disabled-hover></Table>

          <!-- </Checkbox-group> -->
          <div>
        {{ check }}
    </div>
       
    </div>

</template>

<script>

const editButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: currentRow.editting ? 'success' : 'primary',
            loading: currentRow.saving
        },
        style: {
           
            margin: '0 5px'
        },
        on: {
            'click': () => {
               vm.$emit('refreshList');
            }
        }
    },  '编辑');
};


const showButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: currentRow.editting ? 'success' : 'primary',
            loading: currentRow.saving
        },
        style: {
            
            margin: '0 5px'
        },
        on: {
            'click': () => {
               vm.$emit('refreshList');
            }
        }
    },  '查看');
};

const checkbox = (vm, h, currentRow, index) => {
    console.log(index)
    return h('Checkbox', {
         // domProps:{value: index}  ,
        // props: {
        //     value: "we",
            
        // },
        
       on: {
            'click': () => {
               alert(2)
            },
            'on-change':(data) => {
                // vm.$refs.we

                if(data==true){
                     vm.check.push[index]=true
                 }else{
                    vm.check = ""
                 }

               
            }
        }
        
        
    },  index);
};

const deleteButton = (vm, h, currentRow, index) => {
    return h('Poptip', {
        props: {
            confirm: true,
            title: '您确定要删除这条数据吗?',
            transfer: true
        },
        on: {
            'on-ok': () => {
                vm.thisTableData.splice(index, 1);
                vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
            }
        }
    }, [
        h('Button', {
            style: {

                margin: '0 5px'
            },
            props: {
                type: 'error',
                placement: 'top'
            }
        }, '删除')
    ]);
};
const incellEditBtn = (vm, h, param) => {
    if (vm.hoverShow) {
        return h('div', {
            'class': {
                'show-edit-btn': vm.hoverShow
            }
        }, [
            h('Button', {
                props: {
                    type: 'text',
                    icon: 'edit'
                },
                on: {
                    click: (event) => {
                        vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    }
                }
            })
        ]);
    } else {
        return h('Button', {
            props: {
                type: 'text',
                icon: 'edit'
            },
            on: {
                click: (event) => {
                    vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                }
            }
        });
    }
};
const saveIncellEditBtn = (vm, h, param) => {
    return h('Button', {
        props: {
            type: 'text',
            icon: 'checkmark'
        },
        on: {
            click: (event) => {
                vm.edittingStore[param.index].edittingCell[param.column.key] = false;
                vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
            }
        }
    });
};
const cellInput = (vm, h, param, item) => {
    return h('Input', {
        props: {
            type: 'text',
            value: vm.edittingStore[param.index][item.key]
        },
        on: {
            'on-change' (event) {
                let key = item.key;
                vm.edittingStore[param.index][key] = event.target.value;
            }
        }
    });
};
export default {
    name: 'canEditTable',
    props: {
        refs: String,
        columnsList: Array,
        value: Array,
        url: String,
        editIncell: {
            type: Boolean,
            default: false
        },
        hoverShow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            columns: [],
            thisTableData: [],
            edittingStore: [],
            projectId:'',
            projectName:'',
            buildDate:'',
            teachingMethod:'',
            test:[],
            check:[],
            major:''
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            let vm = this;
          
            
            let cloneData = JSON.parse(JSON.stringify(this.value));
           
            let res = [];
            res = cloneData.map((item, index) => {
                let isEditting = false;
                return item;
            });
            this.thisTableData = res;
            // this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
            this.columnsList.forEach(item => {

                if (item.editable) {
                    item.render = (h, param) => {
                        let currentRow = this.thisTableData[param.index];
                        return h('span', currentRow[item.key]);
                    };
                }
                if(item.checkable){

                    item.render = (h, param) => {
                        let currentRowData = this.thisTableData[param.index];
                        return h('div', [

                                // showButton(this, h, currentRowData, param.index),
                                checkbox(this, h, currentRowData, param.index),
                            ]);
                    };
                     

                }
                if (item.handle) {
                    item.render = (h, param) => {
                        let currentRowData = this.thisTableData[param.index];
                        if (item.handle.length === 2) {
                            return h('div', [
                                editButton(this, h, currentRowData, param.index),
                                deleteButton(this, h, currentRowData, param.index)
                            ]);
                        } else if (item.handle.length === 1) {
                            if (item.handle[0] === 'edit') {
                                return h('div', [
                                    editButton(this, h, currentRowData, param.index)
                                ]);
                            } else {
                                return h('div', [
                                    deleteButton(this, h, currentRowData, param.index)
                                ]);
                            }
                        } else if (item.handle.length === 3) {
                            return h('div', [
                                editButton(this, h, currentRowData, param.index),
                                showButton(this, h, currentRowData, param.index),
                                deleteButton(this, h, currentRowData, param.index)
                            ]);
                        }

                    };
                }
            });
        },
        alt(event){
            if(event.clientX<306 && event.clientX>227 && event.clientY<214 &&event.clientY>175){
                alert(event.clientX+"ok"+event.clientY)
            }
           
            
        }
        // handleBackdata (data) {
        //     let clonedData = JSON.parse(JSON.stringify(data));
        //     clonedData.forEach(item => {
        //         delete item.editting;
        //         delete item.edittingCell;
        //         delete item.saving;
        //     });
        //     return clonedData;
        // }
    },
    watch: {
        value (data) {
            this.init();
        }
    }
};
</script>

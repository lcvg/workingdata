export const table1Columns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '课题名称',
        align: 'center',
        key: 'name',
        editable: true
    },
    {
        title: '课题编号',
        align: 'center',
        key: 'sex'
    },
    {
        title: '申报时间',
        align: 'center',
        key: 'work',
        editable: true
    },
     {
        title: '主持人',
        align: 'center',
        key: 'work',
        editable: true
    },
   {
        title: '操作',
        align: 'center',
        width: 190,
        key: 'handle',
        handle: ['edit','delete']
    }
];

export const table1Data = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const editInlineColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 90,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        key: 'work',
        width: 150,
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 190,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const editInlineData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const editIncellColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 120,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 160,
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['delete']
    }
];


export const buildproject = [
     {
        title: '全选',
        key: 'handle',
        width: 80,
        align: 'center',
        // checkable: true,
        type: 'selection',
        // className:'selectiond'
       
    },
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '课程名称',
        align: 'center',
        key: 'projectName',
        editable: true
    },
    {
        title: '课程编号',
        align: 'projectId',
        key: 'projectId'
    },
    {
        title: '建设时间',
        align: 'center',
        key: 'buildDate',
        editable: true
    },
     {
        title: '授课方式',
        align: 'center',
        key: 'teachingMethod',
        editable: true
    },
    {
        title: '所属专业',
        align: 'center',
        key: 'major',
        editable: true
    },
   {
        title: '操作',
        align: 'center',
        width: 190,
        key: 'handle',
        handle: ['edit','show', 'delete']
    }
];



export const editIncellData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const editInlineAndCellColumn = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 300,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 300,
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 200,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const editInlineAndCellData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const showCurrentColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 300,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 300,
        key: 'work',
        editable: true
    }
];

const tableData = {
    buildproject: buildproject,
    table1Columns: table1Columns,
    table1Data: table1Data,
    editInlineColumns: editInlineColumns,
    editInlineData: editInlineData,
    editIncellColumns: editIncellColumns,
    editIncellData: editIncellData,
    editInlineAndCellColumn: editInlineAndCellColumn,
    editInlineAndCellData: editInlineAndCellData,
    showCurrentColumns: showCurrentColumns
};

export default tableData;

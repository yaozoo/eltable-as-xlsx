<!--
 * @Author: luyao
 * @Date: 2023-05-05 19:23:44
 * @LastEditTime: 2023-05-06 11:19:32
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /eltable-as-xlsx/README.md
-->

### eltable-as-xlsx 介绍

```
eltable-as-xlsx 是为了解决导出el-table（elementPlus）数据的小插件
```

### 环境

```
vue3 、 elementPlus
```

### 使用说明

```
// 安装依赖
npm i eltable-as-xlsx -D

// 引入
import { exportExcel } from "eltable-as-xlsx";


exportExcel({
    id: tableId,  // 字符串  当前要下载的el-tableID
    fileName: `file-${new Date().getTime()}`, // 字符串 要导出的xlsx文件名称
    excludeColumns: props.excludeDownloadColumns, // 数组  导出时候要排除的数据
  });


```

截图 ：
![Alt text](https://github.com/LYao0919/Y-render/blob/master/assets/img/demo.gif)

### 举个栗子

```

<template>
  <el-table
    id="el-t"
    :data="tableData"
    style="width: 100%"
    @header-contextmenu="handleRightClick">
    <el-table-column label="日期" prop="date" />
    <el-table-column label="姓名" prop="name" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small">Edit</el-button>
        <el-button size="small" type="danger">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div
    v-if="contextMenuVisible"
    class="context-menu"
    :style="contextMenuStyle">
    <div class="context-menu-option" @click="exportExcelFun">导出为excel</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { exportExcel } from "eltable-as-xlsx";

interface User {
  date: string;
  name: string;
  address: string;
}

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const contextMenuVisible = ref(false);
// 右键菜单的位置
const contextMenuStyle = ref({
  left: "0",
  top: "0",
});

//
function handleRightClick(column: any, event: any) {
  event.preventDefault();
  // 获取鼠标位置
  let x = event.pageX;
  let y = event.pageY;
  contextMenuVisible.value = true;
  contextMenuStyle.value = {
    left: `${x}px`,
    top: `${y}px`,
  };
  // 三秒不操作就自动清空
  setTimeout(() => {
    contextMenuVisible.value = false;
  }, 3000);
}

function exportExcelFun() {
  exportExcel({
    id: "el-t", // DOM  id
    fileName: `file-${new Date().getTime()}`, // xlsx文件名
    excludeColumns: ["操作"], // 要过滤的列
  });
  contextMenuVisible.value = false;
}
</script>
<style>
.context-menu {
  position: fixed;

  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  z-index: 999;
  border: 1px solid #ccc;
}

.context-menu-option {
  padding: 4px 15px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 12px;
}

.context-menu-option:hover {
  background-color: #f5f5f5;
}
</style>


```

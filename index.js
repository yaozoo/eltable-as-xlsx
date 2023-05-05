/*
 * @Author: luyao
 * @Date: 2023-05-05 19:30:20
 * @LastEditTime: 2023-05-05 19:31:06
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /eltable-as-xlsx/index.js
 */
// 计算每列宽度

import FileSaver from "file-saver"; //下载exxel
import * as XLSX from "xlsx"; // ！！！vue3要这么引入 要不会报错

function computeColWidths(rows) {
  let columnWidths = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.cells;
    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      const cellValue = cell.innerText;
      const cellWidth = cell.clientWidth + 20;
      if (!columnWidths[j] || columnWidths[j] < cellWidth) {
        columnWidths[j] = cellWidth;
      }
    }
  }
  return columnWidths;
}

export const exportExcel = ({ id, fileName, excludeColumns = [] }) => {
  const theads = document.querySelectorAll(`#${id} table > thead > tr th`);
  const rows = document.querySelectorAll(`#${id} table > tbody > tr`);

  let data = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let rowData = [];
    const cells = row.cells;
    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      const columnTitle = theads[j].innerText;
      const colspan = Number(theads[j].getAttribute("colspan"));
      if (!excludeColumns.includes(columnTitle) || colspan > 1) {
        const cellValue = cell.innerText;
        rowData.push(cellValue);
      }
    }
    data.push(rowData);
  }

  const headers = [];
  for (let i = 0; i < theads.length; i++) {
    const columnTitle = theads[i].innerText;
    if (!excludeColumns.includes(columnTitle)) {
      headers.push(columnTitle);
    }
  }

  data.unshift(headers);
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // 计算每列宽度
  const columnWidths = computeColWidths(rows);
  worksheet["!cols"] = columnWidths.map((w) => ({ width: w / 6.4 }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet");

  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  FileSaver.saveAs(
    new Blob([wbout], { type: "application/octet-stream" }),
    `${fileName}.xlsx`
  );
};

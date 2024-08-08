"use strict"
load.hide()

const elTableEditor = document.getElementById("table_1")
const tableEditorInstance = TableEditor.getInstance(elTableEditor)
let tempRow = null
let tempRows = tableEditorInstance._rows
let tempDel = null

elTableEditor.addEventListener("update.psa.tableEditor", (e) => {
  e.preventDefault()
  const url = location.href.toString() + "/"
  if (tempDel) {
    fetch(url + tempDel.email + "?_method=DELETE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response)
        tempRows = tableEditorInstance._rows
        // tempDel = null
      })
      .catch((error) => console.error("Error:", error))
  }
  if (tempRow) {
    console.log(tempRow)
    fetch(url + tempRow.email + "?_method=PUT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempRow),
    })
      .then((response) => {
        console.log(response)
        // tempRow = null
      })
      .catch((error) => console.error("Error:", error))
  }
})

elTableEditor.addEventListener("render.psa.tableEditor", (e) => {
  e.preventDefault()
  if (tempRows.length !== tableEditorInstance._rows.length) {
    removeItemAndSyncArrays(tableEditorInstance._rows, tempRows)
  } else {
    tempRow = tableEditorInstance._tempRow
  }
})

function removeItemAndSyncArrays(array1, array2) {
  // Function to compare two objects (shallow comparison)
  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }
  // Iterate over array2 and remove items that are not in array1
  for (let i = array2.length - 1; i >= 0; i--) {
    const item = array2[i]
    const existsInArray1 = array1.some((array1Item) => isEqual(array1Item, item))
    if (!existsInArray1) {
      tempDel = item
    }
  }
}

;(() => {
  function convertTimestampToDate(timestamp) {
    const date = new Date(Number(timestamp))
    return date.toLocaleString("id-ID")
  }

  // Contoh penggunaan:
  const timestamp = 1723126323000
  console.log(convertTimestampToDate(timestamp)) // Output: "8/8/2024, 9:12:03 PM"

  function convertDateToTimestamp(dateString) {
    const date = new Date(dateString)
    return date.getTime()
  }

  // Contoh penggunaan:
  const dateString = "8/8/2024, 9:12:03 PM"
  console.log(convertDateToTimestamp(dateString)) // Output: 1723126323383
})()

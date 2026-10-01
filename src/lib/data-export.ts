import * as XLSX from 'xlsx'
import Papa from 'papaparse'

/**
 * แปลง Array of Objects เป็นไฟล์ Excel และดาวน์โหลด
 */
export function exportToExcel(data: any[], fileName: string, sheetName: string = 'Sheet1') {
  if (!data || !data.length) {
    console.error('No data to export')
    return
  }
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  
  // สร้างและดาวน์โหลดไฟล์
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

/**
 * แปลง Array of Objects เป็นไฟล์ CSV และดาวน์โหลด
 */
export function exportToCSV(data: any[], fileName: string) {
  if (!data || !data.length) {
    console.error('No data to export')
    return
  }
  const csv = Papa.unparse(data)
  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: 'text/csv;charset=utf-8;' }) // 0xEF, 0xBB, 0xBF คือ BOM สำหรับเปิดใน Excel ภาษาไทยไม่เพี้ยน
  
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${fileName}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

/**
 * อัปโหลดและอ่านข้อมูลจากไฟล์ Excel หรือ CSV กลับมาเป็น JSON
 */
export async function parseFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const isCSV = file.name.endsWith('.csv')

    if (isCSV) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data)
        },
        error: (error: any) => {
          reject(error)
        }
      })
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = e.target?.result
          const workbook = XLSX.read(data, { type: 'binary' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const json = XLSX.utils.sheet_to_json(worksheet)
          resolve(json)
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = (error) => reject(error)
      reader.readAsBinaryString(file)
    }
  })
}

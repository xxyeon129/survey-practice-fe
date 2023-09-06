import * as XLSX from 'xlsx';
import './survey-table.scss';
import { useRef } from 'react';

const SurveyTable = () => {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet([
    { Name: 'John', Age: 30 },
    { Name: 'Lala', Age: 40 },
  ]);

  const createExcel = () => {
    XLSX.utils.book_append_sheet(workbook, worksheet, '테스트1');
    XLSX.writeFile(workbook, 'sheetjs-react-example.xlsx');
  };

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = () => {
    const fileInput = fileRef.current;
    if (fileInput) {
      const file = fileInput.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (file) {
          const data = file.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });

          const sheet = workbook.Sheets['테스트1'];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          console.log(jsonData);
        };
        reader.readAsBinaryString(file);
      }
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>전혀 느끼지 않았다</th>
            <th>조금 느꼈다</th>
            <th>상당히 느꼈다</th>
            <th>심하게 느꼈다</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1. 가끔씩 몸이 저리고 쑤시며 감각이 마비된 느낌을 받는다.</th>
            <td>
              <input type="radio" name="1" value={0} />
            </td>
            <td>
              <input type="radio" name="1" value={1} />
            </td>
            <td>
              <input type="radio" name="1" value={2} />
            </td>
            <td>
              <input type="radio" name="1" value={3} />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => createExcel()}>Excel</button>
      <input
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref={fileRef}
        onChange={handleFileUpload}
      />
    </>
  );
};

export default SurveyTable;

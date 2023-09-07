import * as XLSX from 'xlsx';
import './survey-table.scss';
import { useRef, useState } from 'react';
import { surveyData } from '../data/surveyData';

const SurveyTable = () => {
  const [responseData, setResponseData] = useState(surveyData.BAI.문항);

  const workbook = XLSX.utils.book_new();
  // console.log('@@', responseData);

  const worksheet = XLSX.utils.json_to_sheet(responseData);

  const createExcel = () => {
    XLSX.utils.book_append_sheet(workbook, worksheet, 'BAI');
    XLSX.writeFile(workbook, 'sheetjs-react-example.csv');
  };

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = () => {
    const fileInput = fileRef.current;
    if (fileInput) {
      const file = fileInput.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = file => {
          const result = file.target?.result;

          if (result) {
            const workbook = XLSX.read(result, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            console.log(jsonData);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const handleRadioButton = (score: number, no: number) => {
    const updateResponseData = [...responseData];

    updateResponseData[no].응답내용 = surveyData.BAI.응답방식[score];
    updateResponseData[no].응답점수 = `${score}`;

    setResponseData(updateResponseData);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            {Object.values(surveyData.BAI.응답방식).map((el, index) => (
              <th key={index}>{el}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {surveyData.BAI.문항.map(el => (
            <tr key={el.No}>
              <th>{`${el.No}. ${el.문항}`}</th>
              <td>
                <input
                  type="radio"
                  name={`${el.No}`}
                  value={0}
                  onChange={() => handleRadioButton(0, el.No - 1)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`${el.No}`}
                  value={1}
                  onChange={() => handleRadioButton(1, el.No - 1)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`${el.No}`}
                  value={2}
                  onChange={() => handleRadioButton(2, el.No - 1)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`${el.No}`}
                  value={3}
                  onChange={() => handleRadioButton(3, el.No - 1)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => createExcel()}>Excel</button>
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref={fileRef}
        onChange={handleFileUpload}
      />
    </>
  );
};

export default SurveyTable;

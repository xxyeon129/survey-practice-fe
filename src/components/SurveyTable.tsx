import * as XLSX from 'xlsx';
import './survey-table.scss';
import { useRef, useState } from 'react';
import { surveyData } from '../data/surveyData';
import { ResponseDataType } from '../shared/types/dataType';
import axios from 'axios';

const SurveyTable = () => {
  const [responseData, setResponseData] = useState<ResponseDataType[]>(surveyData.BAI.문항);

  const workbook = XLSX.utils.book_new();
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
            const jsonData: ResponseDataType[] = XLSX.utils.sheet_to_json(worksheet);

            handleApplyFile(jsonData);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const handleRadioButton = (score: string, no: number) => {
    const updateResponseData = [...responseData];

    updateResponseData[no].응답내용 = surveyData.BAI.응답방식[Number(score)];
    updateResponseData[no].응답점수 = `${score}`;

    setResponseData(updateResponseData);
  };

  const handleApplyFile = (data: ResponseDataType[]) => {
    setResponseData(data);
  };

  const sendFile = () => {
    XLSX.utils.book_append_sheet(workbook, worksheet, 'BAI');
    const wbout = XLSX.write(workbook, { bookType: 'csv', type: 'array' });

    const blob = new Blob([new Uint8Array(wbout)], { type: 'application/octet-stream' });
    const formdata = new FormData();
    formdata.append('file', blob, 'sendFileTest.csv');

    try {
      axios
        .post('http://localhost:4444/upload', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => console.log(res.data))
        .catch(error => console.error('파일 업로드 실패'));
    } catch (error) {
      console.error('파일 업로드 중 오류: ', error);
    }
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
            <tr key={el.No + 100}>
              <th>{`${el.No}. ${el.문항}`}</th>
              <td>
                <input
                  type="radio"
                  name={`${el.No}`}
                  value={0}
                  checked={
                    responseData[el.No - 1].응답점수 === '0' ||
                    responseData[el.No - 1].응답점수 === 0
                  }
                  onChange={() => handleRadioButton('0', el.No - 1)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`${el.No}`}
                  value={1}
                  checked={
                    responseData[el.No - 1].응답점수 === '1' ||
                    responseData[el.No - 1].응답점수 === 1
                  }
                  onChange={() => handleRadioButton('1', el.No - 1)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`${el.No}`}
                  value={2}
                  checked={
                    responseData[el.No - 1].응답점수 === '2' ||
                    responseData[el.No - 1].응답점수 === 2
                  }
                  onChange={() => handleRadioButton('2', el.No - 1)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`${el.No}`}
                  value={3}
                  checked={
                    responseData[el.No - 1].응답점수 === '3' ||
                    responseData[el.No - 1].응답점수 === 3
                  }
                  onChange={() => handleRadioButton('3', el.No - 1)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => createExcel()}>Excel 다운로드</button>
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref={fileRef}
        onChange={handleFileUpload}
      />
      <button onClick={() => sendFile()}>이메일 전송</button>
    </>
  );
};

export default SurveyTable;

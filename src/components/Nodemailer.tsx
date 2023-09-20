import axios from 'axios';
import { useRef } from 'react';

const Nodemailer = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sendFile = (formData: FormData) => {
    try {
      axios
        .post('http://localhost:4444/upload', formData, {
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

  const handleFileUpload = async () => {
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files) {
      const file = fileInput.files?.[0];

      const formData = new FormData();
      formData.append('file', file);

      sendFile(formData);
    }
  };

  return (
    <input
      type="file"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ref={fileInputRef}
      onChange={handleFileUpload}
    />
  );
};

export default Nodemailer;

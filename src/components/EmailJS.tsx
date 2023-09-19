import { useState } from 'react';
import emailjs from '@emailjs/browser';

const EmailJS = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const reader = new FileReader();
    file && reader.readAsDataURL(file);

    reader.onload = async e => {
      const serviceId = process.env.REACT_APP_SERVICE_ID;
      const templateId = process.env.REACT_APP_TEMPLATE_ID;
      const userId = process.env.REACT_APP_USER_ID;

      const emailParams = {
        to_name: '수신자aa',
        from_name: '발신자a',
        message: '전송 내용!!@!',
        file: reader.result,
      };

      serviceId &&
        templateId &&
        emailjs.send(serviceId, templateId, emailParams, userId).then(
          result => {
            console.log(result);
          },
          error => {
            console.log(error);
          }
        );
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h4>Attach File</h4>
        <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
      </label>
      <button type="submit">@Send Email</button>
    </form>
  );
};

export default EmailJS;

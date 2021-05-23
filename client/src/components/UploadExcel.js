import { Button, Upload, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useFilePicker } from "react-sage";

const UploadExcel = () => {
  const [file, setFile] = useState();
  const { files, onClick, errors, HiddenFileInput } = useFilePicker({});

  useEffect(() => {
    console.log(file);
  }, [file]);

  const processExcel = () => {};
  useEffect(() => {
    if (files[0]) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(files[0]);
      var workbook = XLSX.read();
      console.log(workbook);
    }
  }, [files]);

  return (
    <>
      <Button onClick={onClick} icon={<UploadOutlined />}>
        Click to Upload
      </Button>
      <HiddenFileInput accept=".xls" multiple={false} />
    </>
  );
};

export default UploadExcel;

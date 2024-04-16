import { useState, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";

const JsonToCsv = ({ data }) => {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("");

  const headers = [
    {
      label: "Class Name",
      key: "className",
    },
    {
      label: "Method Name",
      key: "methodName",
    },
    {
      label: "Is Cloud Blocker",
      key: "isCloudBlocker",
    },
    {
      label: "Why Cloud Blocker",
      key: "whyCloudBlocker",
    },
    {
      label: "Suggestion",
      key: "suggestion",
    },
  ];
  console.log("data", data);

  const createCsvFileName = () => {
    console.log("data in createCsvFileName", data);
    let file = data.filePath ? data.filePath.split("\\") : ["data"];
    console.log("file", file);
    let len = file.length;
    let tempFileName = file[len - 1];
    return tempFileName;
  };

  const correctJsonData = () => {
    console.log("data in correctJsonData", data);
    const dataset = data.responses;
    let correctData = [];
    for (let i = 0; i < dataset.length; i++) {
      let temp = {};
      for (let j = 0; j < dataset[i].methods.length; j++) {
        let methodData = dataset[i].methods;
        if (
          methodData[j].isCloudBlocker === true ||
          methodData[j].isCloudBlocker === "Yes"
        ) {
          temp = {
            className: dataset[i].className,
            methodName: methodData[j].methodName,
            isCloudBlocker: methodData[j].isCloudBlocker,
            whyCloudBlocker: methodData[j].whyCloudBlocker,
            suggestion: methodData[j].suggestion,
          };
          correctData.push(temp);
        }
      }
    }
    return correctData;
  };

  useEffect(() => {
    console.log("data in useeffect", data);
    if (data !== null && data !== undefined) {
      setCsvData(correctJsonData());
      setFileName(createCsvFileName());
    }
  }, []);

  return (
    <CSVLink
      data={csvData}
      headers={headers}
      filename={fileName}
      target="_blank"
      style={{ textDecoration: "none", outline: "none" }}
    >
      <div
        style={{
          background: "#00a2ed",
          border: "1px solid #00a2ed",
          padding: "0.2rem",
          color: "white",
          fontSize: "16px",
          height: "1.5rem",
          width: "5rem",
          textAlign: "center",
        }}
      >
        Export
      </div>
    </CSVLink>
  );
};

export default JsonToCsv;

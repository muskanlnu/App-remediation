import { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./HomePage.module.css";
import choose_icon from "../../resources/choose_icon.svg";
import BlockerChart from "../BlockerChart/BlockerChart";
import cancel_icon from "../../resources/cancel_icon.svg";
import { ClipLoader } from "react-spinners";
import Tile from "../../components/Tile/Tile";
import DataTable from "../../components/DataTable/DataTable";
import BlockerPage from "../BlockerPage/BlockerPage";
import JsonToCsv from "../../components/JsonToCsv/JsonToCsv";
import { useFetcher } from "react-router-dom";

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [selectedFilePath, setSelectedFilePath] = useState("");
  const [blockersData, setBlockersData] = useState(null);
  const [blocker, setBlocker] = useState(null);
  const [runs, setRuns] = useState(false);
  const [newRun, setNewRun] = useState(false);
  const [id, setId] = useState("");

  const selectedStyle = {
    borderLeft: "3px solid #00a2ed",
    color: "#00a2ed",
    fontWeight: 500,
  };

  const renderTab = (tabIndex) => {
    switch (tabIndex) {
      case 1:
        return (
          <FileSelectTab
            setSelectedItem={setSelectedItem}
            selectedFilePath={selectedFilePath}
            setSelectedFilePath={setSelectedFilePath}
            setBlockersData={setBlockersData}
          />
        );
      case 2:
        return (
          <ReviewTab
            setSelectedItem={setSelectedItem}
            selectedFilePath={selectedFilePath}
          />
        );
      case 3:
        return (
          <ResultTab
            setSelectedItem={setSelectedItem}
            selectedFilePath={selectedFilePath}
            blockersData={blockersData}
            id={id}
            setId={setId}
            setBlockersData={setBlockersData}
            newRun={newRun}
            setNewRun={setNewRun}
            setRuns={setRuns}
          />
        );
      case 4:
        return (
          <PreviousResultsTab
            setId={setId}
            setSelectedItem={setSelectedItem}
            setRuns={setRuns}
            newRun={newRun}
            setNewRun={setNewRun}
          />
        );
      case 5:
        return (
          <BlockerChart
            id={id}
            runs={runs}
            setId={setId}
            blockersData={blockersData}
            setSelectedItem={setSelectedItem}
            newRun={newRun}
          />
        );
      case 6:
        return (
          <DataTable
            id={id}
            setSelectedItem={setSelectedItem}
            setBlocker={setBlocker}
          />
        );
      case 7:
        return (
          <BlockerPage blocker={blocker} setSelectedItem={setSelectedItem} />
        );

      default:
        return <FileSelectTab setSelectedItem={setSelectedItem} />;
    }
  };

  return (
    <div className={styles.homepage_body}>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div
            className={styles.sidebar_item}
            style={selectedItem === 1 ? selectedStyle : null}
            onClick={() => setSelectedItem(1)}
          >
            Project Selection
          </div>
          <div
            className={styles.sidebar_item}
            style={selectedItem === 2 ? selectedStyle : null}
          >
            Review and Validation
          </div>
          <div
            className={styles.sidebar_item}
            style={selectedItem === 3 ? selectedStyle : null}
          >
            Cloud Blocker Analysis
          </div>
          <div
            className={styles.sidebar_item}
            style={selectedItem === 4 ? selectedStyle : null}
            onClick={() => setSelectedItem(4)}
          >
            Previous Runs Analysis
          </div>
        </div>
        {renderTab(selectedItem)}
      </div>
    </div>
  );
};

const FileSelectTab = ({
  setSelectedItem,
  selectedFilePath,
  setSelectedFilePath,
  setBlockersData,
}) => {
  useEffect(() => {
    setBlockersData(null);
  });
  const inputRef = useRef();

  const handleInputClick = (event) => {
    inputRef.current.click();
  };

  const handleFileSelection = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFilePath(
      selectedFile ? selectedFile.webkitRelativePath || selectedFile.name : ""
    );
  };

  const clearFileSelection = () => {
    setSelectedFilePath("");
    inputRef.current.value = "";
  };

  const handleInputChange = (event) => {
    console.log(event.target.value.trim());
    setSelectedFilePath(event.target.value.trim());
  };

  const disableBtnStyle = {
    color: "darkgrey",
    backgroundColor: "lightgrey",
  };

  return (
    <div className={styles.stage_content_1}>
      <div className={styles.title}>Choose Project for Analysis</div>
      <div className={styles.file_selector}>
        <div className={styles.input_tag}>Project File Path</div>
        <div className={styles.text_input}>
          <input
            type="text"
            placeholder="Enter the File Path"
            onChange={handleInputChange}
            ref={inputRef}
            value={selectedFilePath}
          />
          {selectedFilePath && (
            <div
              className={styles.remove_btn}
              onClick={() => {
                inputRef.current.value = "";
                setSelectedFilePath("");
              }}
            >
              <img src={cancel_icon} />
            </div>
          )}
        </div>
      </div>
      <div
        className={styles.sing_btn}
        style={!selectedFilePath ? disableBtnStyle : null}
        onClick={selectedFilePath ? () => setSelectedItem(2) : null}
      >
        Next
      </div>
    </div>
  );
};

const ReviewTab = ({ setSelectedItem, selectedFilePath }) => {
  return (
    <div className={styles.stage_content_2}>
      <div className={styles.title}>Review Selected Project Path</div>
      <div className={styles.description}>
        Ensure file path before moving to identify potential cloud blockers
      </div>
      <div className={styles.file_details}>
        File Path Selected:&nbsp;{" "}
        <strong>
          <i>{selectedFilePath}</i>
        </strong>
      </div>
      <div className={styles.btn_grp}>
        <div
          className={styles.btn1}
          onClick={() => {
            setSelectedItem(1);
          }}
        >
          Back
        </div>
        <div
          className={styles.btn2}
          onClick={() => {
            setSelectedItem(3);
          }}
        >
          Next
        </div>
      </div>
    </div>
  );
};

const ResultTab = ({
  setSelectedItem,
  selectedFilePath,
  id,
  setId,
  newRun,
  setRuns,
  setNewRun,
  blockersData,
  setBlockersData,
}) => {
  const encodedFilePath = encodeURIComponent(selectedFilePath);
  const url = "https://cloudblockers-web-backend.azurewebsites.net"
  const requestUrl = `${url}/cloudblockers/getblockers?filePath=${encodedFilePath}`;
  const postUrl = `${url}/cloudblockers/saveblockers`;
  const [apiData, setApiData] = useState(null);
  const [saved, setSaved] = useState(false);
  //const [jsonData, setJsonData] = useState(null);

  const getResults = async () => {
    const apiResponse = await fetch(requestUrl, {
      method: "GET",
    });
    const data = await apiResponse.json();
    console.log(data);
    setApiData(data);
  };

  useEffect(() => {
    setBlockersData(null);
    getResults();
  }, []);

  const handlePostRequest = async () => {
    try {
      const response = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers as needed
        },
        body: JSON.stringify({
          responses: apiData,
          filePath: selectedFilePath,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      setBlockersData(responseData);
      setSaved(true);

      // let jsonData = {
      //   filePath: selectedFilePath,
      //   responses: apiData,
      // };
      // setJsonData(jsonData);
    } catch (error) {
      console.error("Error during POST request:", error.message);
    }
  };
  console.log("Blocker data", blockersData);

  useEffect(() => {
    setRuns(false);
    setNewRun(true);

    if (apiData) {
      if (!saved) {
        handlePostRequest();
      }
    }
  }, [apiData]);

  return (
    <div className={styles.stage_content_3}>
      {/* <div className={styles.title}>Identified Cloud Blockers</div> */}
      {blockersData && saved ? (
        <BlockerChart
          id={blockersData.id}
          setId={setId}
          setSelectedItem={setSelectedItem}
          newRun={newRun}
        />
      ) : (
        <div className={styles.loader}>
          <ClipLoader
            color="#00a2ed"
            loading={blockersData === null}
            size={30}
          />
        </div>
      )}
      {/* <div className={styles.btn_grp}>
        {/* <div className={styles.btn2} onClick={handlePostRequest}>Save Data</div> */}
      {/* <div
          className={styles.btn1}
          onClick={() => {
            setSelectedItem(2);
          }}
        >
          Back */}
      {/* </div>  */}
      {/* {saved && <div className={styles.btn2}>
          <JsonToCsv data={blockersData}/>
        </div>}
      </div> */}

      {/* </div> */}
    </div>
  );
};

const PreviousResultsTab = ({
  setId,
  setSelectedItem,
  setRuns,
  newRun,
  setNewRun,
}) => {
  let fileName = [];
  let time = [];

  const [runData, setRunData] = useState(null);
  const url = "https://cloudblockers-web-backend.azurewebsites.net"
  const requestUrl = `${url}/cloudblockers/getallblockers`;

  const getResults = async () => {
    const apiResponse = await fetch(requestUrl, {
      method: "GET",
    });
    const data = await apiResponse.json();
    console.log(data);
    setRunData(data);
  };

  const onClickHandle = (id) => {
    setId(id);
    setRuns(true);
    setNewRun(false);
    setSelectedItem(5);
  };

  useEffect(() => {
    getResults();
  }, []);

  const getFileName = (i) => {
    let file = i.split("\\");
    let len = file.length;
    let fileName = file[len - 1];
    return fileName;
  };

  const getDateTime = (i) => {
    let date = i.split("T")[0];
    let time = i.split("T")[1].split(".")[0];
    return time + " " + date;
  };

  return (
    <>
      <div className={styles.chart_content}>
        <div className={styles.title}>Previous Runs Analysis</div>
        <div className={styles.result_content}>
          {runData ? (
            <table>
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Run time </th>
                </tr>
              </thead>
              <tbody>
                {runData.map((run) => {
                  return (
                    <tr
                      onClick={() => onClickHandle(run.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{getFileName(run.filePath)}</td>
                      <td>{getDateTime(run.timestamp)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className={styles.loader}>
              <ClipLoader
                color="#00a2ed"
                loading={runData === null}
                size={30}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;

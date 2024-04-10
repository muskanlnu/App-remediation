import React from "react";
import styles from "./BlockerChart.module.css";
import Tile from "../../components/Tile/Tile";
import Chart from "../../components/Chart/Chart";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import { useState } from "react";
import JsonToCsv from "../../components/JsonToCsv/JsonToCsv";

const BlockerChart = ({ id, setId, setSelectedItem, runs, newRun }) => {
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(false);

  let ClassNames = [];
  let ClassBlockerCount = [];
  let totalBlockerCount = 0;
  let fileName = "";

  console.log("id", id);

  const ID = id;
  setId(ID);
  const url = "https://cloudblockers-web-backend.azurewebsites.net"
  const requestUrl = `${url}/cloudblockers/getBlocker?id=${ID}`;

  const getResults = async () => {
    const apiResponse = await fetch(requestUrl, {
      method: "GET",
      
    });
    const data = await apiResponse.json();
    setData(data);
    setSaved(true);
    console.log("data in api call", data);
  };

  useEffect(() => {
    getResults();
  }, []);

  if (data !== null && data !== undefined) {
    console.log(data);

    let file = data.filePath ? data.filePath.split("\\") : ["file not found"];
    let len = file.length;
    fileName = file[len - 1];

    const responses = data.responses;

    for (let i = 0; i < responses.length; i++) {
      let classname = responses[i].className;
      ClassNames.push(classname);
    }

    console.log(ClassNames);

    let res = 0;

    for (let i = 0; i < responses.length; i++) {
      let count = 0;

      let methods = responses[i].methods;
      for (let j = 0; j < methods.length; j++) {
        if (
          methods[j].isCloudBlocker === true ||
          methods[j].isCloudBlocker === "Yes"
        ) {
          count++;
        }
      }
      res = res + count;
      ClassBlockerCount.push(count);
    }

    totalBlockerCount = res;

    console.log(ClassBlockerCount);
  }

  return (
    <div className={styles.stage_content_3}>
      {runs && (
        <div className={styles.title}> Run Analysis for : {fileName}</div>
      )}
      {newRun && <div className={styles.title}>Identified Cloud Blockers</div>}

      {data ? (
        <div className={styles.charts}>
          <div
            className={styles.blockerCount}
            onClick={() => setSelectedItem(6)}
          >
            <Tile title="Blockers" count={totalBlockerCount} />
          </div>

          <div className={styles.BarChart}>
            <Chart
              BlockerCounts={ClassBlockerCount}
              BlockerClasses={ClassNames}
            />
          </div>
          <div className={styles.vulCount}>
            <Tile title="Vulnerabilities" count="20" />
          </div>
        </div>
      ) : (
        <div className={styles.loader}>
          <ClipLoader color="#00a2ed" loading={data === null} size={30} />
        </div>
      )}

      <div className={styles.btn_grp}>
        {runs && (
          <div
            className={styles.btn1}
            onClick={() => {
              setSelectedItem(4);
            }}
          >
            Back
          </div>
        )}
        {newRun && (
          <div
            className={styles.btn1}
            onClick={() => {
              setSelectedItem(2);
            }}
          >
            Back
          </div>
        )}

        {saved && (
          <div className={styles.btn2}>
            <JsonToCsv data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockerChart;

import styles from "./DataTable.module.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const DataTable = ({ id, setSelectedItem, setBlocker }) => {
  const [data, setData] = useState([]);
  const blockersData = data.responses || null;
  const ID = id;
  const url = "https://cloudblockers-web-backend.azurewebsites.net"
  const requestUrl = `${url}/cloudblockers/getBlocker?id=${ID}`;

  const getResults = async () => {
    const apiResponse = await fetch(requestUrl, {
      method: "GET",
    });
    const data = await apiResponse.json();
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    getResults();
  }, []);

  const onClickHandle = (
    className,
    methodName,
    whyCloudBlocker,
    suggestion
  ) => {
    const blocker = {
      className: className,
      methodName: methodName,
      whyCloudBlocker: whyCloudBlocker,
      suggestion: suggestion,
    };

    setSelectedItem(7);
    setBlocker(blocker);
  };

  return (
    <div className={styles.stage_content_3}>
      <div className={styles.title}>Cloud Blockers</div>
      <div className={styles.result_content}>
        {blockersData ? (
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Method</th>
                <th>Why Cloud Blocker</th>
              </tr>
            </thead>
            <tbody>
              {blockersData.map((blockerClass) => {
                return blockerClass.methods.map((method) => {
                  return (
                    (method.isCloudBlocker === true ||
                      method.isCloudBlocker === "Yes") && (
                      <tr
                        onClick={() =>
                          onClickHandle(
                            blockerClass.className,
                            method.methodName,
                            method.whyCloudBlocker,
                            method.suggestion
                          )
                        }
                      >
                        <td>{blockerClass.className}</td>
                        <td>{method.methodName}</td>
                        <td>{method.whyCloudBlocker}</td>
                      </tr>
                    )
                  );
                });
              })}
            </tbody>
          </table>
        ) : (
          <div className={styles.loader}>
            <ClipLoader
              color="#00a2ed"
              loading={blockersData === null}
              size={30}
            />
          </div>
        )}
      </div>
      <div className={styles.btn_grp}>
        <div
          className={styles.btn1}
          onClick={() => {
            setSelectedItem(5);
          }}
        >
          Back
        </div>
      </div>
    </div>
  );
};

export default DataTable;

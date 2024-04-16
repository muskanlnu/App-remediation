import React from "react";
import styles from "./BlockerPage.module.css";

const BlockerDetail = ({
 blocker, setSelectedItem
}) => {
  return (
    <>
    <div className={styles.stage_content_3}>
    <div className={styles.title}> Blocker Detail</div>
     <div className={styles.card}>
        <div className={styles.class}>
          <div className={styles.title}>Class Name  </div>
          <div className={styles.data}>{blocker.className}</div>
        </div>
        <div className={styles.method}><div className={styles.title}>Method Name  </div>
        <div className={styles.data}>{blocker.methodName}</div>
         </div>
        <div className={styles.desc}><div className={styles.title}>Blocker </div>
        <div className={styles.data}>{blocker.whyCloudBlocker}</div></div>
        <div className={styles.sugg}><div className={styles.title}>Suggestion  </div>
        <div className={styles.data}>{blocker.suggestion}</div></div>
      </div>
      <button className={styles.btn_2} onClick={() => setSelectedItem(6)}>
        Back
      </button>
      </div>
    </>
  );
};

export default BlockerDetail;

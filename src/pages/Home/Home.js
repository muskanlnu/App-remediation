import * as React from "react";
import Tile from "../../components/Tile/Tile";
import styles from "./Home.module.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { Link } from "react-router-dom";

const chartSetting = {
  yAxis: [
    {
      label: "Blocker count",
    },
  ],
};
const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.charts}>
        <div className={styles.blockerCount}>
          <Link to ="/dataTable" style={{textDecoration : 'none'}}><Tile title="Blockers" count="10" /></Link>
        </div>
    
        <div className={styles.BarChart}>
          <div>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["calculatorClass", "testClass", "test2Class"],
              },
            ]}
            series={[{ data: [12, 10, 30],color: "#6456d1" }]}
            width={600}
            height={350}
            margin={{ top: 60, right: 20, bottom: 20, left: 40}}
            {...chartSetting}
          />
          </div>
        </div>
        <div className={styles.vulCount}>
          <Tile title="Vulnerabilities" count="20" />
        </div>
      </div>
    </div>
  );
};

export default Home;

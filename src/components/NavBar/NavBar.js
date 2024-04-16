import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const microsoftLogoURL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png";
const profileIconURL =
  "https://cdn-icons-png.flaticon.com/512/3106/3106773.png";

const NavBar = () => {
  return (
    <div className={styles.navbar_body}>
      <img src={microsoftLogoURL} className={styles.logo} />
      <span className={styles.divider_pipe}>|</span>
      <span className={styles.title}>
        App Remediation - Powered By Azure Open AI
      </span>
      <div className={styles.profile}>
        {/* <img src={profileIconURL} className={styles.icon} /> */}
      </div>
    </div>
  );
};

export default NavBar;

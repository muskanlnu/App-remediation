import styles from './Tile.module.css';

const Tile = ({ title, count }) => {
  return (
    <div className={styles.tile}>
      <div className={styles.count}>
        {count}
      </div>
      <div className={styles.title}>
        {title}
        </div>
    </div>
  )
}

export default Tile;
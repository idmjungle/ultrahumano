import styles from "@/styles/LoadingScreen.module.css";

export default function LoadingScreen({ready}) {

  return (
    <div className={styles.loader_main}>
      <div
        className={`${styles.loader} ${ready ? styles['slide-in-left'] : styles['slide-out-left']} ultra_reviews vh-100 d-flex justify-content-center`}
      >
        <img src={`${ready ? '/images/uh_loading.gif' : '/images/Empty.png' }`} className="position-absolute top-50" width="266px" height="146px"/>
      </div>
    </div>
  );
}

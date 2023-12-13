import styles from "@/styles/LoadingScreen.module.css";
import Image from "next/image";

export default function LoadingScreen({ready}) {

  return (
    <div className={styles.loader_main}>
      <div
        className={`${styles.loader} ${ready ? styles['slide-in-left'] : styles['slide-out-left']} ultra_reviews vh-100 d-flex justify-content-center`}
      >
        <Image src={`${ready ? '/images/uh_loading.gif' : '/images/Empty.png' }`} alt="" className="position-absolute top-50" width={266} height={146}/>
      </div>
    </div>
  );
}

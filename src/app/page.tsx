// Informação que vai ser atualizada => renderizar do lado do cliente
"use client";

import styles from "./page.module.css";
import Header from "./Header/header";
import Content from "./components/Content";
import Footer from "./Footer/footer";

export default function Home() {

  return (
    <div className={styles.main}>
      <Content />
    </div>
  );
}
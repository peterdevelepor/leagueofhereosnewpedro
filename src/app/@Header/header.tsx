import Link from 'next/link';
import styles from './header.module.css'; // Importando as classes do arquivo CSS

function Header(props: { my_name: string; project_name: string }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{props.project_name}</h1>
      <h3 className={styles.subtitle}>by {props.my_name}</h3>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="../dashboard/" className={styles.navLink}>
          Dashboard
        </Link>
      </nav>
    </header>
  );
}

export default Header;

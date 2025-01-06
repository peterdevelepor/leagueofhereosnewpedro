import styles from './footer.module.css'; // Ajuste o caminho conforme necessário

function Footer(props: { my_name: string; project_name: string }) {
  return (
    <footer className={styles.footer}>
      <a href="#" className={styles.footerLink}>
        {props.project_name} - Copyright © {new Date().getFullYear()} by {props.my_name}.
      </a>
    </footer>
  );
}

export default Footer;

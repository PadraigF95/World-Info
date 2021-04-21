import Head from "next/head";
import styles from "./Layout.module.css";
import Brightness6Rounded from "@material-ui/icons/Brightness6Rounded";
import {useState, useEffect} from "react";


const Layout = ({children, title = "Country Info"}) => {
    const [theme, setTheme] = useState("light");

    useEffect(() =>{
      document.documentElement.setAttribute(
        "data-theme", 
        localStorage.getItem("theme")
        );

      setTheme(localStorage.getItem("theme"));
    }, []);

    const switchTheme = () => {
      if (theme === 'light') {
        saveTheme("dark")
      } else {
        saveTheme("light");
      }
    }


    const saveTheme = (theme) =>{
      setTheme(theme);
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }

    return (
        <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className={styles.panel_themeSwitcher}>
      <button className={styles.themeSwitcher} onClick={switchTheme}>
        <Brightness6Rounded />
      </button>
      </div>
      <header className={styles.header}> 
     

      </header>

      <main className={styles.main}>{children}
       
      </main>

      <footer className={styles.footer}>
       Padraig Foran
      </footer>
    </div>
    )
}

export default Layout;
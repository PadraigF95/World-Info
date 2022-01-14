import styles from "./Country.module.css";
import Layout from "../../components/Layout/Layout";
import {useState, useEffect} from "react";
import Link from "next/link";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.com/rest/v3.1/alpha/${id}`);

    const country = await res.json();

    return country;
}

const Country = ({ country }) => {
const [borders, setBorders] = useState([]);

    const getBorders = async() => {
        const borders = await Promise.all(
            country.borders.map(border => getCountry(border))
        ); 

        setBorders(borders);
    };

    useEffect(() =>{
        getBorders()
    });

    

    
    return (
        <Layout title={country.name}>

        <header className={styles.header_panel}> 
        <Link href="/">
          <button className={styles.button_home}>
              <ArrowBackRoundedIcon color="inherit" />
            Home
          </button>
        </Link>

      </header>
        <div className={styles.container}>
            <div className={styles.container_left}>
            <div className={styles.overview_panel}>
                <img src={country.flag} alt={country.name} />

                <h1 className={styles.overview_name}>{country.name}</h1>
                <div className={styles.overview_region}>{country.region}</div>

                <div className={styles.overview_numbers}>
                    <div className={styles.overview_population}>
                        <div className={styles.overview_value}>{country.population}</div>
                        <div className={styles.overview_label}>Population</div>
                    </div>

                    <div className={styles.overview_area}>
                    <div className={styles.overview_value}>{country.area}</div>
                        <div className={styles.overview_label}>Area</div>
                    </div>
                </div>
            </div>
            </div>
            <div className={styles.container_right}>
            <div className={styles.details_panel}>
                <h4 className={styles.details_panel_heading}>Details</h4>

                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        Capital
                    </div>

                    <div className={styles.details_panel_value}>
                        {country.capital}
                    </div>
                </div>


                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        Subregion
                    </div>

                    <div className={styles.details_panel_value}>
                        {country.subregion}
                    </div>
                </div>

                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        Language
                    </div>

                    <div className={styles.details_panel_value}>
                        {country.languages.map(({name}) => name).join(", ")}
                    </div>
                </div>

                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        Currency
                    </div>

                    <div className={styles.details_panel_value}>
                        {country.currencies.map(({name}) => name).join(", ")}
                    </div>
                </div>

                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        Native Name
                    </div>

                    <div className={styles.details_panel_value}>
                        {country.nativeName}
                    </div>
                </div>

                <div className={styles.details_panel_borders}>
                    
                <div className={styles.details_panel_borders_label}> Border Countries</div>
                <div className={styles.details_panel_borders_container}> 
                {borders.map(({flag, name, alpha3Code}) => (
                        <Link href={`${alpha3Code}`}>
                    <div className={styles.details_panel_borders_country}>
                        <img src={flag} alt={name} />

                        <div className={styles.details_panel_borders_name}>
                            {name}
                            </div>
                    </div></Link> 
                    ))}
                
                    
                </div>

                    
                </div>

            </div>
            </div>
           
           
        </div>
        </Layout>
    );

   
};

export default Country;

export const getStaticPaths = async () => {

    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await res.json();

    const paths = countries.map(country => ({
        params: { id: country.alpha3Code},
    }));

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async ({params}) => {
    const country = await getCountry(params.id);
   

    return {
        props: {
            country,
            
            
        },
        
    };
};

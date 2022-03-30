import { GlobalMenuStore } from "../../data/menu-data/menu-context";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

export default function Layout({children, headerClass, footerClass}: any) {

    return (
        <>
            <GlobalMenuStore>
                <Header className={headerClass}/>  
                {children}
                <Footer className={footerClass}/>
            </GlobalMenuStore>
        </>
    )
}
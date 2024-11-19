import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout(){

    return(

        <div className="flex flex-col justify-between min-h-screen bg-gray-50 dark:bg-gray-900 pt-4">

            <div>
                <Header/>
                <Outlet/>
            </div>

        </div>

    );
}



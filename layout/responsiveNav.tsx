"use client"
import DesktopNav from "./desktopNav";
import MobileNav from "./mobileNav";


const ResponsiveNav = () =>{
    return (
        <div className="sticky top-0 z-50 px-4">
            <DesktopNav/>
            <MobileNav />
        </div>
    )
}

export default ResponsiveNav;
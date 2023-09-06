'use client'
import SideNavbar from "@/components/SideNavbar"
import HeadNavBar from "@/components/HeadNavBar"
import { usePathname } from "next/navigation"

export default function layout({ children }) {
    const pathname = usePathname();
    console.log(pathname)
    return (
        <>
            <div className="flex relative w-full h-fit">
                <SideNavbar />
                <div className='fixed w-full  mb-4 lg:ml-60 z-20' >
                    <HeadNavBar path={pathname} />
                </div>
                <div className="relative bg-white pr-10 p-5 z-10 w-full mt-16 ml-0 lg:ml-60"
                >
                    <main >
                        {children}
                    </main>

                </div >
            </div>

        </>
    )
}
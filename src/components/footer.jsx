import React from 'react'
import kapal from '/kapal.png'

const Footer = () => {
    return (
        <>
            <div className="bg-[#2992BE] w-screen h-16 bottom-0 md:fixed md:block hidden">
                <div className="relative h-full">
                    <img
                        src={kapal}
                        alt="kapal"
                        className="absolute bottom-0 right-0 transform"
                        height={100}
                    />
                </div>
                {/* <div className="relative h-full">
                    <img
                        src={kapal}
                        alt="kapal"
                        className="absolute bottom-14 left-0 scale-x-[-1] transform"
                        height={100}
                    />
                </div> */}
            </div>
        </>
    )
}

export default Footer

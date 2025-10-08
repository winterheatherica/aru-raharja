'use client';

import { useState } from 'react';
import Image from "next/image";

const ServicesTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabData = [
        {
            src: "/services/aru_digital.png",
            service: "digital",
            desc:"Layanan sistem informasi berbasis cloud yang menjadi solusi terbaik bagi seluruh kebutuhan bisnis Anda.",
            detail: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas."
        },
        {
            src: "/services/aru_digital.png",
            service: "healthcare",
            desc:"-",
            detail: "Iaculis massa nisl malesuada lacinia integer numero posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per combia nostra inceptos himenaeos."
        },
        {
            src: "/services/aru_digital.png",
            service: "contractor",
            desc:"-",
            detail: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor."
        },
        {
            src: "/services/aru_digital.png",
            service: "source",
            desc:"-",
            detail: "Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer numero posuere. Ut hendrerit semper vel class aptent taciti sociosqu."
        },
        {
            src: "/services/aru_digital.png",
            service: "solution",
            desc:"-",
            detail: "Ad litora torquent per combia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."
        },
        {
            src: "/services/aru_digital.png",
            service: "log",
            desc:"-",
            detail: "In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas."
        },
        {
            src: "/services/aru_digital.png",
            service: "trans",
            desc:"-",
            detail: "Iaculis massa nisl malesuada lacinia integer numero posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per combia nostra inceptos himenaeos."
        }
    ]

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 text-lg py-4 my-4 gap-x-6 gap-y-4 text-white">
                {tabData.map((tab, index) => (
                    <button
                        key={index}
                        className={`text-xl transition-colors duration-200 rounded-lg py-1 px-4 ${
                            activeTab === index
                                ? 'text-white bg-blue-600'
                                : 'text-black bg-white border-2 border-gray-300 hover:text-gray-900'
                        }`}
                        onClick={() => setActiveTab(index)}>
                        <span className="font-bold">ARU</span>
                        <span className="italic">{tab.service}</span>
                    </button>
                ))}
            </div>
            <h1 className="text-3xl text-start px-12">
                <span className="font-bold">ARU</span>
                <span className="italic">{tabData[activeTab].service}</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-stretch">
                <div className="flex flex-col bg-blue-600 w-[40vw] md:w-[25vw]">
                    <div className="flex relative w-full h-[20vw] md:h-[20vw]">
                        <Image src={tabData[activeTab].src} alt="service" fill />
                    </div>
                    <p className="p-4 text-white">
                        {tabData[activeTab].desc}
                    </p>
                </div>
                <div className="flex-1 relative align-top bg-blue-300 w-full rounded-xl p-4">
                    <p>{tabData[activeTab].detail}</p>
                </div>
            </div>
        </div>
    );
};

export default ServicesTabs;
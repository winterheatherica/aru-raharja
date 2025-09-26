'use client';

import { useState } from 'react';

const HistoryTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabData = [
        {
            year: '1960',
            content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.'
        },
        {
            year: '1988',
            content: 'Iaculis massa nisl malesuada lacinia integer numero posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per combia nostra inceptos himenaeos.'
        },
        {
            year: '1991',
            content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.'
        },
        {
            year: '1997',
            content: 'Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer numero posuere. Ut hendrerit semper vel class aptent taciti sociosqu.'
        },
        {
            year: '2005',
            content: 'Ad litora torquent per combia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.'
        },
        {
            year: '2010',
            content: 'In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.'
        },
        {
            year: '2024',
            content: 'Iaculis massa nisl malesuada lacinia integer numero posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per combia nostra inceptos himenaeos.'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-2">
            <div className="flex flex-row gap-x-12">
                <div className="flex flex-col text-center">
                    <h1 className="text-2xl font-bold text-blue-600 mt-2 px-12">Tahun</h1>
                    <div className="bg-gray-800 h-[1px] w-full my-4"/>
                    <div className={`flex flex-col gap-2 px-6`}>
                        {tabData.map((tab, index) => (
                            <button
                            key={index}
                            className={`font-medium text-xl transition-colors duration-200 rounded-lg py-1 px-4 ${
                                activeTab === index
                                    ? 'text-white bg-blue-600'
                                    : 'text-black bg-white border-2 border-gray-300 hover:text-gray-900'
                            }`}
                            onClick={() => setActiveTab(index)}>
                                {tab.year}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={`flex flex-col gap-y-6 w-full`}>
                    <h1 className="text-4xl font-bold">{tabData[activeTab].year}</h1>
                    <div className="w-full h-full bg-blue-200 rounded-xl p-4">
                        <p className="text-lg text-gray-600">
                            {tabData[activeTab].content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryTabs;
import React, { useState } from 'react';

interface MenuItem {
    name: string;
    desc: string;
    price: string;
}

type MenuData = {
    [key: string]: MenuItem[];
};

interface FullMenuProps {
    menuCategories: string[];
    menuData: MenuData;
}

const FullMenu: React.FC<FullMenuProps> = ({ menuCategories, menuData }) => {
    const [activeTab, setActiveTab] = useState('VEG');

    return (
        <section id="menu" className="py-10 md:py-24 px-2 md:px-6 bg-[#0f0f0f]">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Discover Our Full Menu</h2>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-2 mt-2 md:mt-8">
                        {menuCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-2 md:px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all border ${activeTab === cat
                                    ? 'bg-[#c5a059] border-[#c5a059] text-black'
                                    : 'border-white/10 text-gray-400 hover:border-[#c5a059]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-1 gap-6 animate-fadeIn px-2">
                    {(menuData as MenuData)[activeTab]?.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-end border-b border-white/5 pb-6 group hover:border-[#c5a059]/30 transition-all cursor-pointer"
                        >
                            <div className="flex-1">
                                <h4 className="text-xl font-serif text-white group-hover:text-[#c5a059] transition-colors">
                                    {item.name}
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                            </div>

                            <div className="w-24 text-right">
                                <span className="text-lg font-bold text-[#c5a059]">
                                    {item.price}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FullMenu;

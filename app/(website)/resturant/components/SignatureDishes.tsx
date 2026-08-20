import React from 'react';

interface Dish {
    name: string;
    price: string;
    img: string;
    desc: string;
}

interface SignatureDishesProps {
    vegItems: Dish[];
}

const SignatureDishes: React.FC<SignatureDishesProps> = ({ vegItems }) => {
    return (
        <section id="signature-dishes" className="py-24 px-2 md:px-6 overflow-visible">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <span className="text-[#c5a059] text-sm uppercase tracking-[0.3em] font-bold block mb-4">Chef&apos;s Recommendations</span>
                <h2 className="text-2xl md:text-5xl font-serif text-white">Signature Masterpieces</h2>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {vegItems?.map((dish, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-[#c5a059]/50 transition-all">
                        <div className="relative overflow-hidden w-fit h-fit">
                            <img src={dish.img} alt={dish.name} className=" object-contain group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-4 md:p-6 flex flex-col justify-between">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                                <h3 className="font-serif text-sm md:text-xl text-white font-semibold">{dish.name}</h3>
                                <span className="text-[#c5a059] font-bold mt-1 md:mt-0">{dish.price}</span>
                            </div>
                            <p className="text-xs md:text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">{dish.desc}</p>

                            <div className='w-full flex gap-2'>
                                <a href='https://www.swiggy.com/city/varanasi/masala-mist-sigra-rest1133630' target="_blank" rel="noopener noreferrer" className="w-full text-center py-2 border border-white/10 rounded-lg text-xs uppercase tracking-widest font-bold hover:bg-[#c5a059] hover:text-black transition-all">
                                    Swiggy
                                </a>
                                <a href='https://www.zomato.com/varanasi/masala-mist-sigra' target="_blank" rel="noopener noreferrer" className="w-full text-center py-2 border border-white/10 rounded-lg text-xs uppercase tracking-widest font-bold hover:bg-[#c5a059] hover:text-black transition-all">
                                    Zomato
                                </a>
                            </div>

                            <a href="#reserve" className="mt-2 block w-full text-center py-2 border border-white/10 rounded-lg text-xs uppercase tracking-widest font-bold hover:bg-[#c5a059] hover:text-black transition-all">
                                Book A Table
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SignatureDishes;

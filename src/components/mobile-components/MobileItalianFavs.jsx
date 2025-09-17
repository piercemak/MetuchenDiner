import React from 'react'

const MobileItalianFavs = ({ section }) => {
  return (
        <div className="px-1 pb-16 flex-col flex gap-6 max-w-[600px]">
            <span className="mx-3 -mb-3 mt-4 flex-1 border-b border-dotted border-black/20" />
            <div>
                <span className='flex -mb-1 justify-center text-red-900/90 text-[26px] outfit-font font-extralight'>PARMIGIANA</span>
                <span className='mb-4 flex justify-center text-[12px] lexendexa-font font-semibold'>served with Linguini, Penne, Angel Hair or Choice of Two Sides</span>
                {/* Parmigiana */}
                <div className='flex flex-col gap-y-1'>
                    <div className="flex justify-between items-baseline text-[20px]">
                        <div className='flex flex-col'>
                            <div className='flex flex-row gap-2'>
                                <span className="font-semibold text-black outfit-font tracking-tighter">Breast of Chicken Parmigiana</span>                       
                            </div>
                            <span className="text-[15px] font-light text-black/40 outfit-font tracking-tighter">Tender Breast of Chicken topped with Homemade Marinara Sauce & Melted Mozzarella Cheese</span>                        
                        </div>
                        <span className="text-[20px] font-semibold text-black/60 unbounded-font">20.50</span>                          
                    </div> 
                    <div className="flex justify-between items-baseline text-[20px]">
                        <div className='flex flex-col'>
                            <div className='flex flex-row gap-2'>
                                <span className="font-semibold text-black outfit-font tracking-tighter">Veal Cutlet Parmigiana</span>                       
                            </div>                       
                        </div>
                        <span className="text-[20px] font-semibold text-black/60 unbounded-font">20.95</span>                          
                    </div> 
                    <div className="flex justify-between items-baseline text-[20px]">
                        <div className='flex flex-col'>
                            <div className='flex flex-row gap-2'>
                                <span className="font-semibold text-black outfit-font tracking-tighter">Shrimp Parmigiana</span>                       
                            </div>                       
                        </div>
                        <span className="text-[20px] font-semibold text-black/60 unbounded-font">23.95</span>                          
                    </div> 
                    <div className="flex justify-between items-baseline text-[20px]">
                        <div className='flex flex-col'>
                            <div className='flex flex-row gap-2'>
                                <span className="font-semibold text-black outfit-font tracking-tighter">Eggplant Parmigiana</span>                       
                            </div>                       
                        </div>
                        <span className="text-[20px] font-semibold text-black/60 unbounded-font">19.50</span>                          
                    </div> 
                    <div className="flex justify-between items-baseline text-[20px]">
                        <div className='flex flex-col'>
                            <div className='flex flex-row gap-2'>
                                <span className="font-semibold text-black outfit-font tracking-tighter">Chicken & Eggplant Parmigiana</span>                       
                            </div>                       
                        </div>
                        <span className="text-[20px] font-semibold text-black/60 unbounded-font">19.95</span>                          
                    </div> 
                </div>

            </div>
            <span className="mx-3 flex-1 border-b border-dotted border-black/20" />

            {section.items?.map((item, ii) => (
            <div>
                <div key={ii} className="flex justify-between items-baseline text-[20px]">
                    <div className='flex flex-col'>
                        {/* Name */}
                        <div className='flex flex-row gap-2'>
                            <span className="font-semibold text-black outfit-font tracking-tighter">
                            {item.name}                      
                            </span>
                            {/* Description */}
                            {item.description && (
                                <span className="font-normal italic text-[14px] lexendexa-font">
                                {item.description}
                                </span>
                            )}                        
                        </div>
                        {/* Extra */} 
                        {item.extra && (
                        <span className="text-[15px] font-light text-black/40 outfit-font tracking-tighter">
                            {item.extra}
                        </span>
                        )}                         
                    </div>

                    {/* Prices */}
                    {item.price && (
                        <span className="text-[20px] font-semibold text-black/60 unbounded-font">
                        {item.price}
                        </span>
                    )}                           
                </div>                            
            </div>
            ))}
        </div>
  )
}

export default MobileItalianFavs
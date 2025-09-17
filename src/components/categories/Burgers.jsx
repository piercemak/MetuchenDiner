import React from 'react'

const Burgers = ({ section }) => {
  return (
        <div className="mt-10 pb-8 flex-col flex gap-6  max-w-[600px] 2xl:max-w-[100%] 2xl:pr-16">
            {section.items?.map((item, ii) => (
            <div>
                <div key={ii} className="flex justify-between items-baseline">
                    <div className='flex flex-col'>
                        {/* Name */}
                        <div className='flex flex-row items-center gap-2'>
                            <span className="font-semibold text-black outfit-font text-[20px] 2xl:text-[24px] tracking-tighter">
                            {item.name}                      
                            </span>
                            {/* Description */}
                            {item.description && (
                                <span className="font-normal italic text-[14px] outfit-font">
                                {item.description}
                                </span>
                            )}                        
                        </div>
                        {/* Extra */} 
                        {item.extra && (
                        <span className="text-[15px] 2xl:text-[18px] font-light text-black/40 outfit-font tracking-tighter">
                            {item.extra}
                        </span>
                        )}                         
                    </div>

                    {/* Prices */}
                    {item.price && item.deluxeprice && (
                    <div className="flex flex-row gap-8 relative bottom-2 text-black/60 unbounded-font">
                        {/* Regular price */}
                        <div className="flex flex-col items-center">
                        <span className="text-[11px] uppercase tracking-wide font-light">Classic</span>
                        <span>{item.price}</span>
                        </div>

                        {/* Deluxe price */}
                        <div className="flex flex-col items-center">
                        <span className="text-[11px] uppercase tracking-wide font-light">Deluxe</span>
                        <span>{item.deluxeprice}</span>
                        </div>
                    </div>
                    )}                            
                </div>                            
            </div>
            ))}
        </div>
  )
}

export default Burgers
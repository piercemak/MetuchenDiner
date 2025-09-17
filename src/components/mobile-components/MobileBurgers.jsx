import React from 'react'

const MobileBurgers = ({ section }) => {
  return (
        <div className="pb-8 px-1 flex-col flex gap-6 mt-4 max-w-[600px]">
            {section.items?.map((item, ii) => (
            <div>
                <div key={ii} className="flex justify-between items-baseline">
                    <div className='flex flex-col'>
                        {/* Name */}
                        <div className='flex flex-row items-center gap-2'>
                            <span className="font-semibold text-black outfit-font text-[20px] tracking-tighter">
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
                        <span className="text-[15px] font-light text-black/40 outfit-font tracking-tighter">
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

export default MobileBurgers
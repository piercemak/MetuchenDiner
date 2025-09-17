import React from 'react'

const SaladPlatters = ({ section }) => {
  return (
        <div className="mt-10 pb-8 flex-col flex gap-6  max-w-[600px] 2xl:max-w-[100%] 2xl:pr-16">
            {section.items?.map((item, ii) => (
            <div>
                <div key={ii} className="flex justify-between items-baseline">
                    <div className='flex flex-col'>
                        {/* Name */}
                        <div className='flex flex-row gap-2'>
                            <span className="font-semibold text-black text-[20px] 2xl:text-[24px] outfit-font tracking-tighter">
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
                        <span className="text-[15px] 2xl:text-[18px] font-light text-black/40 outfit-font tracking-tighter">
                            {item.extra}
                        </span>
                        )}                         
                    </div>

                    <span className="mx-3 flex-1 border-b border-dotted border-black/20" />

                    {/* Prices */}
                    {item.price && (
                        <span className="text-[20px] 2xl:text-[24px] font-semibold text-black/60 unbounded-font">
                        {item.price}
                        </span>
                    )}                           
                </div>                            
            </div>
            ))}
        </div>
  )
}

export default SaladPlatters
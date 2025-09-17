import React from 'react'

const MobileSandwiches = ({ section }) => {
  return (
        <div className="mt-10 pb-16 px-3 flex-col flex gap-6  max-w-[600px]">
            <span className="mx-3 flex-1 border-b border-dotted border-black/20" />
            <div className="max-w-3xl rounded-full bg-red-900/90 px-6 py-3 shadow-md flex items-center justify-center">
              <span className="text-[15px] text-white lexendexa-font font-semibold uppercase text-center leading-snug">
                On Your Choice of White, Wheat, Rye, Pita, Kaiser, Bagel, English Muffin or Hoagie Roll 
              </span>
            </div>
            <span className="mx-3 flex-1 border-b border-dotted border-black/20" />
            {section.items?.map((item, ii) => (
            <div>
                <div key={ii} className="flex justify-between items-baseline text-[20px]">
                    <div className='flex flex-col'>
                        {/* Name */}
                        <div className='flex flex-row gap-2 items-center'>
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

export default MobileSandwiches
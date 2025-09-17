import React from 'react'

const SeniorSpecials = ({ section }) => {
  return (
        <div className="mt-10 2xl:mt-18 pb-8 flex-col flex gap-6 max-w-[600px] 2xl:max-w-[100%] 2xl:pr-16">
            <span className="mx-3 flex-1 border-b border-dotted border-black/20" />
            <div className="mx-auto max-w-3xl rounded-full bg-red-900/90 px-6 py-3 shadow-md flex items-center justify-center">
              <span className="text-[15px] text-white lexendexa-font font-semibold uppercase text-center leading-snug">
                FOR OUR GUESTS 62 & OVER
              </span>
            </div>
            <span className="font-normal italic text-[14px] text-center lexendexa-font">
                ALL ENTREES ARE SERVED WITH BOWL OF SOUP OF THE DAY & CHOICE OF PUDDING, JELLO OR ICE CREAM
            </span>
            <span className='-mt-4 font-bold text-[14px] text-red-900/90 text-center lexendexa-font'>
                (SUB ANY DESSERT +2.50)
            </span>         
            <span className="mx-3 flex-1 border-b border-dotted border-black/20" />
            {section.items?.map((item, ii) => (
            <div>
                <div key={ii} className="flex justify-between items-baseline text-[20px] 2xl:text-[24px]">
                    <div className='flex flex-col'>
                        {/* Name */}
                        <div className='flex flex-row gap-2 items-center'>
                            <span className="font-semibold text-black outfit-font tracking-tighter">
                            {item.name}                      
                            </span>
                            {/* Description */}
                            {item.description && (
                                <span className="font-normal italic text-[14px] 2xl:text-[18px] lexendexa-font">
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

export default SeniorSpecials
import React from 'react'

const SteaksChopsRibs = ({ section }) => {
  return (
        <div className="mt-10 pb-16 flex-col flex gap-6 max-w-[600px] 2xl:max-w-[100%] 2xl:pr-16">
            {section.items?.map((item, ii) => (
            <div>
                <div key={ii} className="flex justify-between items-baseline">
                    <div className='flex flex-col'>
                        {/* Name */}
                        <div className='flex flex-row gap-2 items-center'>
                            <span className="font-semibold text-black outfit-font tracking-tighter text-[20px] 2xl:text-[24px]">
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

                    {/* Prices */}
                    {item.price && (
                        <span className="text-[20px] 2xl:text-[24px] font-semibold text-black/60 unbounded-font">
                        {item.price}
                        </span>
                    )}                           
                </div>                            
            </div>
            ))}

            {/* Sides */}
            <span className="mx-3 -mb-3 mt-4 flex-1 border-b border-dotted border-black/20" />
            <div>
                <span className='flex -mb-1 justify-center text-red-900/90 text-[28px] 2xl:text-[32px] outfit-font font-extralight'>SIDE SELECTIONS</span>
                <span className='mb-4 flex justify-center text-[11px] 2xl:text-[14px] lexendexa-font font-semibold'>Substitute Bowl of Soup with House Salad +2.25</span>
                <div className="p-4 grid grid-cols-3 gap-x-12 gap-y-2 max-w-[600px] 2xl:max-w-[100%] text-center font-semibold rounded-2xl border border-red-900/90 outfit-font text-[12px] 2xl:text-[16px] tracking-tighter">
                    <div className='rounded-2xl border bg-red-900/90 text-white'>French Fries</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Home Fries</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Mashed Potatoes</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Baked Potato</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Potato Pancakes</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Steamed Rice</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Applesauce</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Broccoli</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Corn</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Cole Slaw</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Potato Salad</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white'>Cranberry Sauce</div>
                    <div className='rounded-2xl border bg-red-900/90 text-white last:col-start-2'>Vegetable of the Day</div>
                </div> 
            </div>
            <span className="mx-3 flex-1 border-b border-dotted border-black/20" />
           
        </div>
  )
}

export default SteaksChopsRibs
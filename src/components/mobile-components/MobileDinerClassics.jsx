import React from 'react'

const MobileDinerClassics = ({ section }) => {
  return (
        <div className="pb-8 flex-col flex gap-6 max-w-[600px]">
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
                        <span className="text-[20px] pr-1 font-semibold text-black/60 unbounded-font">
                        {item.price}
                        </span>
                    )}                           
                </div>                            
            </div>
            ))}

            {/* Sides */}
            <span className="mx-3 -mb-3 mt-4 flex-1 border-b border-dotted border-black/20" />
            <div className='px-2'>
                {/* Category */}
                <span className='flex -mb-1 justify-center text-red-900/90 text-[24px] outfit-font font-extralight'>SIDE SELECTIONS</span>
                <span className='mb-4 flex justify-center text-[12px] lexendexa-font font-semibold'>Substitute Bowl of Soup with House Salad +2.25</span>

                {/* Items */}
                <div className='flex flex-row justify-between px-6'>
                    <div className="p-4 flex flex-col gap-2 max-w-[600px] items-center text-center font-semibold rounded-2xl border border-red-900/90 outfit-font text-[16px] tracking-tighter">
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Home Fries</div>
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Mashed Potatoes</div>
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Baked Potato</div>
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Potato Pancakes</div>
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Steamed Rice</div>
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Applesauce</div>
                    </div>
                    <div className="p-4 flex flex-col gap-2 max-w-[600px] items-center text-center font-semibold rounded-2xl border border-red-900/90 outfit-font text-[16px] tracking-tighter">
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Broccoli</div>
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Corn</div>
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Cole Slaw</div>
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Potato Salad</div>
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Cranberry Sauce</div>
                        <div className='rounded-2xl border bg-red-900/90 text-white px-2'>Vegetable of Day</div>
                    </div>   
                </div>              
            </div>
            <span className="mx-3 flex-1 border-b border-dotted border-black/20" />
           
        </div>
  )
}

export default MobileDinerClassics
import React from 'react'

const MobileBeverages = ({ section }) => {
  return (
    <div className="pb-8 px-1 grid grid-cols-2 gap-x-[5px] gap-y-2 max-w-[600px]">
        {section.items?.map((item, ii) => (
        <div>
            <div key={ii} className="flex items-baseline text-[20px]">
                {/* Name */}
                <span className="font-semibold text-black outfit-font tracking-tighter">
                {item.name}
                </span>

                <span className="mx-3 flex-1 border-b border-dotted border-black/20" />

                {/* Price */}
                {item.price && (
                <span className="text-black/60 font-semibold unbounded-font">
                    {item.price}
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
        ))}
    </div>
  )
}

export default MobileBeverages
import React from 'react'

const MobileBreakfastSides = ({ section }) => {
  return (
        <div className="pb-8 grid grid-cols-2 gap-x-8 px-1 gap-y-2 max-w-[600px]">
            {section.items?.map((item, ii) => (
            <div>
                <div key={ii} className="flex items-baseline">
                    {/* Name */}
                    <span className="font-semibold text-black outfit-font text-[20px] tracking-tighter">
                    {item.name}
                    </span>

                    {/* dotted leader (optional – remove this span if you don’t want dots) */}
                    <span className="mx-3 flex-1 border-b border-dotted border-black/20" />

                    {/* Price */}
                    {item.price && (
                    <span className="text-black/60 text-[20px] font-semibold unbounded-font">
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

export default MobileBreakfastSides
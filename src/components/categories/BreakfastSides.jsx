import React from 'react'

const BreakfastSides = ({ section }) => {
  return (
        <div className="mt-10 2xl:mt-14 pb-8 grid grid-cols-2 gap-x-12 gap-y-2 max-w-[600px] 2xl:max-w-[100%] 2xl:pr-16">
            {section.items?.map((item, ii) => (
            <div>
                <div key={ii} className="flex items-baseline">
                    {/* Name */}
                    <span className="font-semibold text-black outfit-font text-[20px] 2xl:text-[24px] tracking-tighter">
                    {item.name}
                    </span>

                    {/* dotted leader (optional – remove this span if you don’t want dots) */}
                    <span className="mx-3 flex-1 border-b border-dotted border-black/20" />

                    {/* Price */}
                    {item.price && (
                    <span className="text-black/60 text-[20px] 2xl:text-[24px] font-semibold unbounded-font">
                        {item.price}
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
            ))}
        </div>
  )
}

export default BreakfastSides
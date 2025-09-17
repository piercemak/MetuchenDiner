import React, { useState, useEffect } from 'react';
import MenuReveal from './MenuReveal'
import { motion, AnimatePresence } from "framer-motion";
import Menu from './Menu';
import Default from './Default';
import OrderNow from './OrderNow';

{/* Triangle */}
const righttriangle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 375 374.999991"
    height="500"
    preserveAspectRatio="xMidYMid meet"
    version="1.2"
    className="size-[600px]"
  >
    <defs>
      <clipPath id="d210f19874">
        <path d="M 0 288.824219 L 375 288.824219 L 375 375 L 0 375 Z M 0 288.824219 " />
      </clipPath>
    </defs>

    <g id="3b072c13e4">
      <g clipRule="nonzero" clipPath="url(#d210f19874)">
        <path
          d="M 375.035156 288.90625 L 375.035156 392.332031 L 0 392.332031 Z M 375.035156 288.90625 "
          // use an OBJECT for style in React
          style={{
            stroke: 'none',
            fillRule: 'nonzero',
            fill: 'currentColor',  
            fillOpacity: 1,
          }}
        />
      </g>
    </g>
  </svg>
);


{/* Pagination */}
const pages = [
  { label: "Home" },    
  { label: "Menu" },
  { label: "Order Now" },
  { label: "Contact Us" },
];

{/* Menu Toggle */}
const Path1 = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);
export const MenuToggle = ({ toggle }) => (
  <div onClick={toggle}>
    <svg className='size-6' viewBox="0 0 23 23">
      <Path1
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path1
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path1
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </div>
)


{/* Variants */}
const metuchenVariants = {
  hidden: { opacity: 0, y: -70 },   
  visible: {
    opacity: 1,
    y: 0, 
    skewY: -16,                          
    transition: {
      duration: 0.8, ease: "easeOut" },
  }
};
const dinerVariants = {
  hidden: { opacity: 0, y: 50 },   
  visible: {
    opacity: 1,
    y: 0, 
    skewY: -16,                          
    transition: {
      duration: 0.8, ease: "easeOut" },
  }
};

const Home = () => {
const [open, setOpen] = useState(false);
const [pageIndex, setPageIndex] = useState(() => {
   try {
    if (typeof window === "undefined") return 0; 
    const saved = window.localStorage.getItem("home.pageIndex");
    const n = saved === null ? NaN : Number(saved);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
   }
});
const metuchenColor = pageIndex >= 1 ? "text-black/70 font-light" : "text-white";
const dinerColor = pageIndex >= 1 ? "text-white font-light" : "text-red-900";

{/* PageIndex Location */}
useEffect(() => {
  localStorage.setItem("home.pageIndex", String(pageIndex));
}, [pageIndex]);



  return (
    <div className='fixed w-full h-dvh bg-black flex justify-center'>
        <MenuReveal 
            open={open} 
            onOpenChange={setOpen}
            items={pages.map(p => p.label)}
            pageIndex={pageIndex}
            onSelect={(idx) => {            
            setPageIndex(idx);
            setOpen(false);               
            }}            
        />
        <motion.span
          variants={metuchenVariants}
          initial="hidden"
          animate="visible"
          className={`absolute bottom-19 right-9 inline-block outfit-font z-10 -skew-y-16 ${
            pageIndex >= 1 ? "text-[48px]" : "text-[60px]"
          } ${metuchenColor}`}
        >
          METUCHEN
        </motion.span>

        <motion.span
          variants={dinerVariants}
          initial="hidden"
          animate="visible"
          className={`absolute bottom-14 right-7 inline-block outfit-font z-10 -skew-y-16 ${
            pageIndex >= 1 ? "text-[34px]" : "text-[48px]"
          } ${dinerColor}`}
        >
          DINER
        </motion.span>

        {/* Pages */}
        <div className="fixed inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="wait">
            <motion.div
                key={pageIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                className="w-full h-full grid place-items-center"
            >
                {pageIndex === 0 && (
                <Default />
                )}
                {pageIndex === 1 && (
                <Menu />
                )}
                {pageIndex === 2 && (
                <OrderNow />
                )}
                {pageIndex === 3 && (
                <div className="text-white/80 w-full h-dvh bg-yellow-500">Contact Us content here</div>
                )}                
            </motion.div>
            </AnimatePresence>
        </div>

        {/* Triangle */}
        <div className='absolute bottom-0 right-0 w-full flex items-end justify-end z-0 pointer-events-none'>
        {React.cloneElement(righttriangle, {
          className: `size-[600px] fill-current ${
            pageIndex >= 1 ? 'text-[#292222]' : 'text-white'
          }`
        })}
        </div>
    </div>
  )
}

export default Home
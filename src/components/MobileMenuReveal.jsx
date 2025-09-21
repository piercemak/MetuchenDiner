import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import styles from "./phonering.module.css"


{/* Pagination */}
const righttriangle = <svg width="420" height="420" viewBox="0 0 220 220" className=""> <polygon points="0,0 0,40 220,0" /></svg>

{/* Icons */}
const mapIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-8" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>

const emailIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-8" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/></svg>

const phoneIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-8" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>
const phoneHoverIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-outbound-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5"/></svg>

{/* Variants */}
const cardSizeVariants = {
  collapsed: { width: 200 },         
  expanded:  { width: 320 },         
};
const rowVariants = {
  hidden: { y: 8, opacity: 0 },
  show:   { y: 0, opacity: 1 },
};
const linkRevealVariants = {
  collapsed: { opacity: 0, x: -6, filter: "blur(3px)" },
  expanded:  { opacity: 1, x: 0,  filter: "blur(0px)"  },
};

{/* Panel Expand */}
function RevealLinkRow({ icon, href, children }) {
  return (
    <motion.div
      className="flex items-center rounded-lg px-2 py-1"
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={rowVariants}
      onClick={e => e.stopPropagation()}
    >
      <span className="text-red-900/90">{icon}</span>
      <motion.a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
        className="text-red-900/90 overflow-hidden whitespace-nowrap"
        variants={linkVariants}
        transition={{
          width: { type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.2 },
          filter: { duration: 0.2 }
        }}
      >
        {children}
      </motion.a>
    </motion.div>
  );
}

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
export const MenuToggle = ({ open, onClick, className = "", strokeColor = "hsl(0, 0%, 18%)"  }) => (
  <motion.svg
    onClick={onClick}
    className={`size-10 cursor-pointer ${className}`}
    viewBox="0 0 23 23"
    initial={false}
    animate={open ? "open" : "closed"}
  >
    <Path1
      stroke={strokeColor}
      variants={{
        closed: { d: "M 2 2.5 L 20 2.5" },
        open:   { d: "M 3 16.5 L 17 2.5" },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
    <Path1
      stroke={strokeColor}
      d="M 2 9.423 L 20 9.423"
      variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
      transition={{ duration: 0.1 }}
    />
    <Path1
      stroke={strokeColor}
      variants={{
        closed: { d: "M 2 16.346 L 20 16.346" },
        open:   { d: "M 3 2.5 L 17 16.346" },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  </motion.svg>
);


{/* Drop Down Nav */}
export default function MobileMenuReveal({ open, onOpenChange, children, items=[], pageIndex=0, onSelect=()=>{} }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onOpenChange?.(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);
const toggleOpen = () => onOpenChange?.(!open);

{/* Page Index Styling */}  
const slideColor = pageIndex >=1 ? "bg-[#292222] text-white" : "bg-white";
const lineColor = pageIndex >= 1 ? "bg-white/30" : "bg-black/20"
const contactboxColor = pageIndex >=1 ? "bg-[#292222] text-white" : "bg-red-900/90";

{/* Contact Us Container */}
const [contactOpen, setContactOpen] = useState(false);
const contactRef = useRef(null);
useEffect(() => {
  function onDocClick(e) {
    if (!contactRef.current) return;
    if (!contactRef.current.contains(e.target)) setContactOpen(false);
  }
  function onEsc(e) {
    if (e.key === "Escape") setContactOpen(false);
  }
  document.addEventListener("mousedown", onDocClick);
  document.addEventListener("keydown", onEsc);
  return () => {
    document.removeEventListener("mousedown", onDocClick);
    document.removeEventListener("keydown", onEsc);
  };
}, []);

const [isHover, setIsHover] = React.useState(false);

  return (
    <div className="">
      <MenuToggle
        open={open}
        onClick={toggleOpen}
        strokeColor={pageIndex >= 1 ? "white" : "hsl(0, 0%, 18%)"}
        className="absolute left-4 top-4 z-50 text-white"
      />
      <motion.button
        aria-label={open ? "Close menu" : "Open menu"}
        className="absolute left-0 top-0 z-20 pointer-events-none"
        initial={false}
        animate={open ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >

        {React.cloneElement(righttriangle, {
          className: `fill-current ${
            pageIndex >= 1 ? 'text-[#292222]' : 'text-white'
          }`
        })}

      </motion.button>

      {/* Sliding panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="panel"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0, transition:{ delay: 0.2 } }}
            transition={{ stiffness: 220, damping: 24, delay: 0.4 }}
            className={`fixed left-0 top-0 z-30 h-[100%] w-full  backdrop-blur border-r border-black/10 shadow-xl ${slideColor}`}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            {/* Panel content */}
            <div className="h-dvh flex items-center py-10">
              <div className={`h-[90%] bg-black/20 w-[1px] ml-16 ${lineColor}`} />
              <div className="h-[90%] flex flex-col ml-4 items-start outfit-font text-[44px] font-extralight group">
                {(items.length ? items : ["Menu", "Order Now", "Contact Us"]).map((label, idx) => {
                  const active = pageIndex === idx;
                  return (
                    <div
                      key={label}
                      className="relative  items-center"
                      ref={label === "Contact Us" ? contactRef : undefined}
                    >
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1.0, transition:{ type:"spring", stiffness:300, damping:10 }}}
                        onClick={() => {
                          if (label === "Contact Us") {
                            setContactOpen(v => !v);                
                          } else {
                            onSelect(idx);
                            onOpenChange?.(false);
                            setContactOpen(false);                  
                          }
                        }}
                        className={[
                          "cursor-pointer transition-colors duration-300 hover:text-red-900/90",
                          active ? "text-red-900/90 font-medium" : "",
                        ].join(" ")}
                      >
                        {label}
                      </motion.span>

                      {/* Dropdown Panel */}
                      <AnimatePresence>
                        {label === "Contact Us" && contactOpen && (
                          <motion.div
                            className=" z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <motion.div
                              variants={{
                                hidden: {
                                  x: -12,
                                  rotateY: -12,
                                  filter: "blur(8px)",
                                  clipPath: "inset(0 100% 0 0 round 14px)", 
                                },
                                show: {
                                  x: 0,
                                  rotateY: 0,
                                  filter: "blur(0px)",
                                  clipPath: "inset(0 0% 0 0 round 14px)",
                                },
                                exit: {
                                  x: -10,
                                  rotateY: -8,
                                  filter: "blur(6px)",
                                  clipPath: "inset(0 100% 0 0 round 14px)",
                                },
                              }}
                              initial="hidden"
                              animate="show"
                              exit="exit"
                              transition={{
                                default: { type: "spring", stiffness: 520, damping: 32, mass: 0.6 },
                                clipPath: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                                filter: { duration: 0.25 },
                              }}
                              style={{ willChange: "transform, clip-path, filter" }}
                              className={`filter-sheet w-65 rounded-2xl bg-red-900/90 shadow-xl ring-1 ring-black/10 overflow-hidden ${contactboxColor}`}
                              onClick={(e) => e.stopPropagation()}
                              role="dialog"
                              aria-label="Contact details"
                            >
                              {/* Body with staggered items */}
                              <motion.div
                                variants={{
                                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                                }}
                                className="px-4 py-3 text-[16px]"
                              >
                                <motion.div className="flex flex-row items-center justify-start gap-2" variants={{ hidden:{y:8,opacity:0}, show:{y:0,opacity:1} }}>
                                  <motion.span 
                                    className="text-white cursor-pointer"                                   
                                  >
                                    {phoneIcon}
                                  </ motion.span>
                                  <a href="tel:+18482600526" className="text-white hover:underline font-bold tracking-wider">
                                    (848) 260-0526
                                  </a>
                                </motion.div>

                                <div className="w-full h-[1px] bg-white/20 my-2 rounded-full"></div>

                                <motion.div className="flex flex-row items-center justify-start gap-2" variants={{ hidden:{y:8,opacity:0}, show:{y:0,opacity:1} }}>
                                 <span className="text-white cursor-pointer">{emailIcon}</span>
                                  <a
                                    href="mailto:mikeanastasi7@gmail.com"
                                    target="_blank" rel="noreferrer"
                                    className="rounded-lg text-white font-bold tracking-wider"
                                  >
                                    Email
                                  </a>
                                </motion.div>

                                <div className="w-full h-[1px] bg-white/20 my-2 rounded-full"></div>

                                <motion.div className="flex flex-row items-center justify-start gap-2" variants={{ hidden:{y:8,opacity:0}, show:{y:0,opacity:1} }}>
                                  <motion.span 
                                    className="text-white cursor-pointer"                                 
                                  >
                                    {mapIcon}
                                  </motion.span>
                                  <a
                                    href="https://maps.google.com/?q=Metuchen+Diner"
                                    target="_blank" rel="noreferrer"
                                    className="rounded-lg text-white font-bold tracking-wider"
                                  >
                                    Open in Maps
                                  </a>
                                </motion.div>
                                
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <div className="flex flex-col pt-2">
                    <div className="bg-red-900/40 w-[150px] h-[2px]"></div>
                    <span className="text-[16px] pt-2 michroma">848-260-0526</span>
                    <span className="text-[16px] py-2 michroma">338 Lake Ave, Metuchen</span>
                    <div className="bg-red-900/40 w-[150px] h-[2px]"></div>
                    <span className="text-[16px] pt-2 michroma">Monday - Sunday</span>
                    <span className="text-[16px] py-1 michroma">6 AM - 9 PM</span>
                    <div className="bg-red-900/40 w-[150px] h-[2px]"></div>                    
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange?.(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


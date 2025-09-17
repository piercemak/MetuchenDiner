import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import styles from "./phonering.module.css"


{/* Pagination */}
const righttriangle = <svg width="420" height="420" viewBox="0 0 220 220" className=""> <polygon points="0,0 0,40 220,0" /></svg>

{/* Icons */}
const mapIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-8" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>
const mapfillIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-8" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>

const emailIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-8" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/></svg>
const emailfillIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-8" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/></svg>

const phoneIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-8" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>
const phonefillIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-8" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>

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
export default function MenuReveal({ open, onOpenChange, children, items=[], pageIndex=0, onSelect=()=>{} }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onOpenChange?.(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);
const toggleOpen = () => onOpenChange?.(!open);

{/* Page Index Styling */}  
const slideColor = pageIndex >=1 ? "bg-[#292222] text-white" : "bg-white";
const lineColor = pageIndex >= 1 ? "bg-white/30" : "bg-black/20"
const contactboxColor = pageIndex >=1 ? "bg-[#292222] text-white" : "bg-white text-red-900/90";
const contactlineColor = pageIndex >= 1 ? "bg-white/30" : "bg-black/20"


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

{/* Contact Content */}
const [phonehovered, setphoneHovered] = useState(false);
const [emailhovered, setemailHovered] = useState(false);
const [maphovered, setmapHovered] = useState(false);


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
            className={`fixed left-0 top-0 z-30 h-dvh w-[360px] max-w-[88vw] backdrop-blur border-r border-black/10 shadow-xl ${slideColor}`}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            {/* Panel content */}
            <div className="h-[100%] flex items-center py-10">
              <div className={`h-[90%] bg-black/20 w-[1px] ml-16 ${lineColor}`} />
              <div className="h-[90%] flex flex-col ml-4 items-start outfit-font text-[28px] font-extralight group">
                {(items.length ? items : ["Menu", "Order Now", "Contact Us"]).map((label, idx) => {
                  const active = pageIndex === idx;
                  return (
                    <div
                      key={label}
                      className="relative inline-flex items-center"
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
                            className="absolute left-70 ml-3 top-1/2 -translate-y-1/2 z-50"
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
                              className={`filter-sheet w-50 rounded-2xl shadow-xl ring-1 ring-black/10 overflow-hidden ${contactboxColor}`}
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
                                <motion.div 
                                  onHoverStart={() => setphoneHovered(true)}
                                  onHoverEnd={() => setphoneHovered(false)}                                  
                                  className="flex flex-row items-center justify-start gap-2 cursor-pointer" 
                                  variants={{ hidden:{y:8,opacity:0}, show:{y:0,opacity:1} }}
                                >
                                  <motion.button
                                    className="relative inline-flex items-center justify-center"
                                  >
                                    <AnimatePresence initial={false} mode="wait">
                                      {phonehovered ? (
                                        <motion.span
                                          key="on"
                                          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
                                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                          exit={{ opacity: 0, scale: 0.9, rotate: 8 }}
                                          transition={{ duration: 0.18 }}
                                          aria-hidden={!phonehovered}
                                        >
                                          {phonefillIcon}
                                        </motion.span>
                                      ) : (
                                        <motion.span
                                          key="off"
                                          initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
                                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                          exit={{ opacity: 0, scale: 0.9, rotate: -8 }}
                                          transition={{ duration: 0.18 }}
                                          aria-hidden={phonehovered}
                                        >
                                          {phoneIcon}
                                        </motion.span>
                                      )}
                                    </AnimatePresence>
                                  </motion.button>
                                  <a 
                                    onClick={() => window.open("tel:+18482600526", "_self")}  
                                    className="hover:underline hover:font-bold transition-all tracking-wider"
                                  >
                                    (848) 260-0526
                                  </a>
                                </motion.div>

                                <div className={`w-full h-[.1px] bg-black/20 my-2 rounded-full ${contactlineColor}`}></div>

                                <motion.div 
                                  className="flex flex-row items-center justify-start gap-2 cursor-pointer" 
                                  onHoverStart={() => setemailHovered(true)}
                                  onHoverEnd={() => setemailHovered(false)}                                     
                                  variants={{ hidden:{y:8,opacity:0}, show:{y:0,opacity:1} }}
                                >
                                  <motion.button
                                    className="relative inline-flex items-center justify-center"
                                  >
                                    <AnimatePresence initial={false} mode="wait">
                                      {emailhovered ? (
                                        <motion.span
                                          key="on"
                                          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
                                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                          exit={{ opacity: 0, scale: 0.9, rotate: 8 }}
                                          transition={{ duration: 0.18 }}
                                          aria-hidden={!emailhovered}
                                        >
                                          {emailfillIcon}
                                        </motion.span>
                                      ) : (
                                        <motion.span
                                          key="off"
                                          initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
                                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                          exit={{ opacity: 0, scale: 0.9, rotate: -8 }}
                                          transition={{ duration: 0.18 }}
                                          aria-hidden={emailhovered}
                                        >
                                          {emailIcon}
                                        </motion.span>
                                      )}
                                    </AnimatePresence>
                                  </motion.button>
                                  <a
                                    onClick={() => window.open("mailto:mikeanastasi7@gmail.com", "_self")}  
                                    target="_blank" rel="noreferrer"
                                    className="rounded-lg hover:font-bold transition-all tracking-wider"
                                  >
                                    Email
                                  </a>
                                </motion.div>

                                <div className={`w-full h-[.1px] bg-black/20 my-2 rounded-full ${contactlineColor}`}></div>

                                <motion.div 
                                  onHoverStart={() => setmapHovered(true)}
                                  onHoverEnd={() => setmapHovered(false)}                                     
                                  className="flex flex-row items-center justify-start gap-2 cursor-pointer" 
                                  variants={{ hidden:{y:8,opacity:0}, show:{y:0,opacity:1} }}
                                >
                                  <motion.button
                                    className="relative inline-flex items-center justify-center"
                                  >
                                    <AnimatePresence initial={false} mode="wait">
                                      {maphovered ? (
                                        <motion.span
                                          key="on"
                                          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
                                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                          exit={{ opacity: 0, scale: 0.9, rotate: 8 }}
                                          transition={{ duration: 0.18 }}
                                          aria-hidden={!maphovered}
                                        >
                                          {mapfillIcon}
                                        </motion.span>
                                      ) : (
                                        <motion.span
                                          key="off"
                                          initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
                                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                          exit={{ opacity: 0, scale: 0.9, rotate: -8 }}
                                          transition={{ duration: 0.18 }}
                                          aria-hidden={maphovered}
                                        >
                                          {mapIcon}
                                        </motion.span>
                                      )}
                                    </AnimatePresence>
                                  </motion.button>
                                  <a
                                    onClick={() => window.open("https://maps.google.com/?q=Metuchen+Diner", "_self")}  
                                    target="_blank" rel="noreferrer"
                                    className="rounded-lg hover:font-bold transition-all tracking-wider"
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
                <div className="flex flex-col py-2">
                    <div className="bg-red-900/40 w-[150px] h-[2px]"></div>
                    <span className="text-[12px] pt-2 michroma">848-260-0526</span>
                    <span className="text-[12px] py-2 michroma">338 Lake Ave, Metuchen</span>
                    <div className="bg-red-900/40 w-[150px] h-[2px]"></div>
                    <span className="text-[12px] pt-2 michroma">Monday - Sunday</span>
                    <span className="text-[12px] py-1 michroma">6 AM - 9 PM</span>
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


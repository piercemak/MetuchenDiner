import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useAnimate, stagger } from "framer-motion";
import MobileBreakfastSides from './mobile-components/MobileBreakfastSides';
import MobileBeverages from './mobile-components/MobileBeverages';
import MobileSaladSides from "./mobile-components/MobileSaladSides";
import MobileBurgers from "./mobile-components/MobileBurgers";
import MobileBurgerAddon from "./mobile-components/MobileBurgerAddon";
import MobileSandwiches from "./mobile-components/MobileSandwiches";
import MobileSandwichAddon from "./mobile-components/MobileSandwichAddon";
import MobileSaladPlatters from "./mobile-components/MobileSaladPlatters";
import MobileDinerClassics from "./mobile-components/MobileDinerClassics";
import MobileSides from "./mobile-components/MobileSides";
import MobileItalianFavs from "./mobile-components/MobileItalianFavs";
import MobileSteaksChopsRibs from "./mobile-components/MobileSteaksChopsRibs";
import MobileSeniorSpecials from "./mobile-components/MobileSeniorSpecials";

import { supabase } from "../supabaseClient";


{/* Icons */}
const filterIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 16 16"><path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/> </svg>
const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-10" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>

{/* Variants */}
const foodCategoryVariants = {
  hidden: { opacity: 0, y: 50 },   
  visible: {
    opacity: 1,
    y: 0, 
    skewY: -10,                          
    transition: {
      duration: 0.8, ease: "easeOut" },
  }
};

{/* Menu Images */}
const MENU_IMAGES = {
  breakfast: "images/DinerMedia/breakfast/metuchendiner_frenchtoast2.jpg",
  lunch: "images/DinerMedia/entree/metuchendiner_cubano2.jpg",
  dinner: "images/DinerMedia/entree/metuchendiner_ribs1.jpg",
  kids: "images/DinerMedia/breakfast/metuchendiner_avocado1.jpg",
  dessert: "images/DinerMedia/dessert/metuchendiner_cake1.jpg",
};

{/* Excluded Categories */}
const excludedCategories = ["BREAKFAST SIDES", "BEVERAGES", "COLD SALAD PLATTERS", "SALAD TOPPINGS", "BURGERS", "BURGER ADD ONS","SANDWICHES", "SANDWICH ADD ONS", "DINER CLASSICS", "SIDES", "ITALIAN FAVORITES", "STEAKS, CHOPS, & RIBS", "SENIOR SPECIALS"];

{/* Filter Button */}
const staggerMenuItems = stagger(0.08, { startDelay: 0.12 });
function useFilterMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    // wait until the scope has a DOM node
    if (!scope.current) return;

    // Animate the sheet
    animate(
      ".filter-sheet",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 12px)"
          : "inset(10% 50% 90% 50% round 12px)",
      },
      { type: "spring", bounce: 0, duration: 0.5 }
    );

    // Animate the items
    animate(
      ".filter-item",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.95, filter: "blur(8px)" },
      { duration: 0.25, delay: isOpen ? stagger(0.08, { startDelay: 0.12 }) : 0 }
    );
  }, [isOpen, animate, scope]);

  return scope; // <- attach this directly to a parent container
}

const MobileMenu = () => {

  {/* Filter Button */}
  const [filterOpen, setFilterOpen] = useState(false);
  const filterScopeRef = useFilterMenuAnimation(filterOpen);

const [menuKey, setMenuKey] = useState("breakfast");
const [menuData, setMenuData] = useState([]);
const [loading, setLoading] = useState(true);
const [err, setErr] = useState(null);

// fetch the JSON for the selected menu
useEffect(() => {
  let active = true;
  setLoading(true);
  setErr(null);
  supabase
    .from("menus")
    .select("data")
    .eq("key", menuKey)
    .single()
    .then(({ data, error }) => {
      if (!active) return;
      if (error) setErr(error.message);
      else setMenuData(Array.isArray(data?.data) ? data.data : []);
    })
    .finally(() => active && setLoading(false));

  return () => { active = false; };
}, [menuKey]);
useEffect(() => {
  const channel = supabase
    .channel("menus-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "menus", filter: `key=eq.${menuKey}` },
      (payload) => setMenuData(Array.isArray(payload.new?.data) ? payload.new.data : [])
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, [menuKey]);


  {/* Category Picker */}
    const categoryRefs = useMemo(() => {
    const refs = {};
    (menuData || []).forEach((section) => {
        if (section.category) refs[section.category] = React.createRef();
    });
    return refs;
    }, [menuData]);

  {/* Tabs */}
  const tabBase = "text-[18px] 2xl:text-[28px] cursor-pointer transition-colors";
  const tabActive = "text-white";
  const tabInactive = "text-white/70 hover:text-white";

  {/* Category Name Filter */}
  const [selectedCats, setSelectedCats] = useState(new Set());
    const categories = useMemo(() => {
    const set = new Set(menuData.map(s => s.category).filter(Boolean));
    return Array.from(set);
  }, [menuData]);
  function toggleCategory(cat) {
    setSelectedCats(prev => {
        const copy = new Set(prev);
        if (copy.has(cat)) copy.delete(cat);
        else copy.add(cat);
        return copy;
    });
  }

  useEffect(() => { setSelectedCats(new Set()); }, [menuKey]);  

  {/* Scroll Reset */}
    const scrollRef = useRef(null);
    function setScrollRef(el) {
        scrollRef.current = el;
    }        
    useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, [menuKey]);

  {/* Return to Top */}
  const [scrollPct, setScrollPct] = useState(0);
  function handleScroll(e) {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setScrollPct(max > 0 ? el.scrollTop / max : 0);
  }


const snapRef = React.useRef(null);





  return (
    <div className="w-full min-h-dvh flex flex-col overflow-y-scroll overflow-x-hidden scrollbar-hidden">
        {/* Blurred Background */}
        <AnimatePresence>
            {filterOpen && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setFilterOpen(false)} 
                />
            )}
        </AnimatePresence>
        {/* Category Image */}
        <div className="relative h-[34vh] w-full z-10 bg-red-900/90 items-end flex">
            <AnimatePresence mode="wait">
                <motion.div
                key={menuKey} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${MENU_IMAGES[menuKey]})` }}
                />
            </AnimatePresence>
            {/* Meal Selection */}
            <div className="absolute w-full bg-red-900/60 text-white lexendexa-font tracking-tight scrollbar-hidden">
                <div className="relative py-3">
                    {/* scrollable track */}
                    <div
                    ref={snapRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
                    >
                    {/* Page 1 */}
                    <section className="w-full shrink-0 snap-center flex justify-center gap-6">
                        <span
                        className={`${tabBase} ${menuKey === 'breakfast' ? tabActive : tabInactive}`}
                        onClick={() => setMenuKey('breakfast')}
                        >
                        BREAKFAST
                        </span>
                        <span
                        className={`${tabBase} ${menuKey === 'lunch' ? tabActive : tabInactive}`}
                        onClick={() => setMenuKey('lunch')}
                        >
                        LUNCH
                        </span>
                        <span
                        className={`${tabBase} ${menuKey === 'dinner' ? tabActive : tabInactive}`}
                        onClick={() => setMenuKey('dinner')}
                        >
                        DINNER
                        </span>
                    </section>

                    {/* Page 2 */}
                    <section className="w-full shrink-0 snap-center flex justify-center gap-6">
                        <span
                        className={`${tabBase} ${menuKey === 'kids' ? tabActive : tabInactive}`}
                        onClick={() => setMenuKey('kids')}
                        >
                        KIDS
                        </span>
                        <span
                        className={`${tabBase} ${menuKey === 'dessert' ? tabActive : tabInactive}`}
                        onClick={() => setMenuKey('dessert')}
                        >
                        DESSERT
                        </span>
                    </section>
                    </div>

                    {/* Optional arrows that programmatically snap to next page */}
                    <button
                    className="absolute left-2 top-[45%] -translate-y-1/2 px-2 py-1 rounded-lg text-[30px]"
                    onClick={() => snapRef.current?.scrollBy({ left: -snapRef.current.clientWidth, behavior: 'smooth' })}
                    >
                    ‹
                    </button>
                    <button
                    className="absolute right-2 top-[45%] -translate-y-1/2 px-2 py-1 rounded-lg text-[30px]"
                    onClick={() => snapRef.current?.scrollBy({ left: snapRef.current.clientWidth, behavior: 'smooth' })}
                    >
                    ›
                    </button>
                </div>
            </div>
        </div>


        {/* Menu Content */}
        <div onScroll={handleScroll} ref={setScrollRef} className="bg-white flex flex-col pb-24">
        {/* Scroll to Top */}
        <AnimatePresence>
            {scrollPct > 0.02 && (
                    <motion.button
                    key="backToTop"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.05}}
                    whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}                      
                    onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                    className="absolute left-0 rounded-full bg-red-900/90 text-white shadow-lg px-4 py-2 text-sm hover:bg-red-900 transition-colors cursor-pointer"
                    >
                    ↑
                    </motion.button>
            )}
        </AnimatePresence>   

        {/* Top Label */}
        <div className="flex flex-col gap-2 py-8 px-2">
            <div className="flex flex-row justify-between items-center">
            {/* Menu Filter */}
            <div className="" ref={filterScopeRef}>
                <motion.button
                    type="button"
                    onClick={() => setFilterOpen((v) => !v)}
                    aria-expanded={filterOpen}
                    aria-controls="menu-filter-sheet"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}
                    className="size-8 bg-red-900/90 rounded-lg flex items-center justify-center cursor-pointer text-white z-60"
                >
                    {filterIcon}
                </motion.button>

                {/* Filter Content (centered & responsive) */}
                <div className={`fixed inset-0 z-50 flex items-center justify-center ${filterOpen ? '' : 'pointer-events-none'}`}>
                {/* Card */}
                <div
                    id="menu-filter-sheet"
                    role="dialog"
                    aria-modal="true"
                    className="filter-sheet w-[96%] max-w-[420px] bg-white/95 backdrop-blur shadow-xl ring-1 ring-black/10 rounded-xl overflow-hidden max-h-[80vh]"
                    style={{
                    clipPath: "inset(10% 50% 90% 50% round 12px)",
                    pointerEvents: filterOpen ? "auto" : "none",
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-3">
                    <button
                        onClick={() => setFilterOpen(v => !v)}
                        className="hover:text-red-900/90 hover:scale-110 transition-all"
                        aria-label="Close"
                    >
                        {closeIcon}
                    </button>
                    <div className="filter-item opacity-0">
                        <span className="text-[20px] text-black michroma">
                        {menuKey.toUpperCase()} CATEGORIES
                        </span>
                    </div>
                    </div>

                    <div className="h-px bg-black/10" />

                    {/* Body (scrolls if tall) */}
                    <ul className="p-3 overflow-y-auto max-h-[60vh] grid grid-cols-2 gap-4">
                    {categories.map((cat) => (
                        <li key={cat} className="filter-item opacity-0 scale-95">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}
                            className="flex justify-center w-full px-2 py-1 rounded-lg bg-red-900/90 text-white hover:bg-red-900 transition-colors"
                            onClick={() => {
                            setFilterOpen(false);
                            categoryRefs[cat]?.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            });                           
                            }}
                        >
                            <span className="truncate outfit-font font-semibold">{cat}</span>
                        </motion.button>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>

                </div>

                    <span className="text-black michroma flex justify-end">{menuKey.toUpperCase()}</span>
                </div>
            <div className="w-[600px] h-[1px] bg-red-900/60" />
        </div>
            <AnimatePresence mode="wait">
            <motion.div
                key={menuKey} 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
            >              
                {menuData.map((section, si) => (
                    <React.Fragment key={si}>
                        {/* Category Title */}
                        {section.category && (
                            <div ref={categoryRefs[section.category]} className='flex flex-col scroll-mt-18'>
                                <motion.span
                                variants={foodCategoryVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-red-900/90 text-[34px] 2xl:text-[54px] inline-block z-10 outfit-font font-extralight pl-2"
                                >
                                {section.category}
                                </motion.span>
                                <div 
                                className={`flex flex-row items-center justify-between pl-2 ${
                                    section.categoryfootnote ? "pt-12 pb-4" : "pt-6"
                                }`}
                                >
                                {section.categoryfootnote && (
                                    <span className="text-[12px] lexendexa-font font-semibold 2xl:text-[16px]">
                                    {section.categoryfootnote}
                                    </span>
                                )}
                                </div>
                                <div className="w-full flex justify-center pt-4 px-10 pb-4">
                                    {section.categoryextra && (
                                    <span className="text-[9px] text-center lexendexa-font font-semibold bg-red-900/90 text-white px-4 py-2 rounded-full">
                                        {section.categoryextra}
                                    </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Items (All Items minus the excluded) */}
                        {!excludedCategories.includes(section.category) && (
                            <div className="flex flex-col gap-6 pb-14 pl-2">
                                {section.items?.map((item, ii) => (
                                <div
                                    key={ii}
                                    className="flex flex-col gap-1 text-black outfit-font font-semibold text-[20px] 2xl:text-[24px] tracking-tighter"
                                >
                                    <div className="flex items-center gap-2">
                                    {/* Name */}
                                    {item.name && <span>{item.name}</span>}

                                    {/* Description */}
                                    {item.description && (
                                        <span className="font-normal outfit-font italic text-[18px]">
                                        {item.description}
                                        </span>
                                    )}

                                    {/* Price */}
                                    {item.price && (
                                        <span className="ml-auto pr-1 text-black/60 unbounded-font">
                                        {item.price}
                                        </span>
                                    )}
                                    </div>

                                    {/* Extra */}
                                    {item.extra && (
                                    <div className="flex flex-col gap-1 text-[15px] 2xl:text-[18px] font-light text-black/40 pr-5 2xl:pr-8">
                                        <span>
                                        {item.extra}
                                        </span>
                                        {item.extraoverflow && (
                                        <span >
                                            {item.extraoverflow}
                                        </span>
                                        )}
                                    </div>
                                    )}
                                </div>
                                ))}
                            </div>
                        )}
                        {section.category === "BREAKFAST SIDES" && (<MobileBreakfastSides section={section}/>)}
                        {section.category === "BEVERAGES" && (<MobileBeverages section={section}/>)} 
                        {section.category === "COLD SALAD PLATTERS" && <MobileSaladPlatters section={section} />}
                        {section.category === "SALAD TOPPINGS" && <MobileSaladSides section={section} />}
                        {section.category === "BURGERS" && <MobileBurgers section={section} />}   
                        {section.category === "BURGER ADD ONS" && <MobileBurgerAddon section={section} />}
                        {section.category === "SANDWICHES" && <MobileSandwiches section={section} />}       
                        {section.category === "SANDWICH ADD ONS" && <MobileSandwichAddon section={section} />}
                        {section.category === "DINER CLASSICS" && <MobileDinerClassics section={section} />}
                        {section.category === "SIDES" && <MobileSides section={section} />}
                        {section.category === "ITALIAN FAVORITES" && <MobileItalianFavs section={section} />}
                        {section.category === "STEAKS, CHOPS, & RIBS" && <MobileSteaksChopsRibs section={section} />}
                        {section.category === "SENIOR SPECIALS" && <MobileSeniorSpecials section={section} />}                          
                    </React.Fragment>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
    </div>
  )
}

export default MobileMenu
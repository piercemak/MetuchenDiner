import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SocialLinks.module.css"

const MobileOrderNow = () => {

{/* Logos */}
const instagramLogo = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6  2xl:size-10" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>

{/* Variants */}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
    },
  },
};
const logoVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
const sectionVariants = {
  hidden: { opacity: 0, x: 150 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },    
}


  return (
    <div className='w-dvw h-dvh bg-white'>
        <div className='flex flex-col items-center pt-24 pb-[calc(env(safe-area-inset-bottom)+120px)]'>
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"                 
                className="pb-6 pr-4 gap-2 w-full flex flex-col items-center"
            >
                <motion.span variants={sectionVariants} className='text-[20px] michroma '>PLACE ORDER WITH</motion.span>
                <motion.div variants={sectionVariants} className="w-[80%] h-[1px] bg-red-900/90" ></motion.div>
            </motion.div>
            
            <div className='grid grid-cols-2 gap-5 w-full px-4 justify-items-center'>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="contents cursor-pointer"
                >
                    <motion.img 
                        variants={logoVariants} 
                        whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}                          
                        src="images/logos/DoordashLogo.svg" 
                        className='w-[clamp(120px,42vw,160px)] aspect-square rounded-2xl object-cover shadow-lg' 
                        onClick={() => window.open("https://www.doordash.com/store/metuchen-diner-metuchen-1510711/?utm_campaign=gpa&pickup=true&rwg_token=ACgRB3fHkq7ayqkvkf1zU-d4p0xtVn99VN4u1xCKZrZZ70pMO-W0z7_9Vac0HzkDqjEBnpEVGce3uTs0J0dGnWtliBOQcOXRiw%3D%3D", "_self")}
                    />
                    <motion.img 
                        variants={logoVariants}
                        whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}                           
                        src="images/logos/UberEatsLogo2.svg" 
                        className='w-[clamp(120px,42vw,160px)] aspect-square rounded-2xl object-cover shadow-lg' 
                        onClick={() => window.open("https://www.ubereats.com/store/metuchen-diner/2zx6gLH7UoG_6U6Zp7Bwfg?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas", "_self")}                        
                    />
                    <motion.img 
                        variants={logoVariants} 
                        whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}                          
                        src="images/logos/GrubHubLogo.svg" 
                        className='w-[clamp(120px,42vw,160px)] aspect-square rounded-2xl object-cover shadow-lg'
                        onClick={() => window.open("https://www.grubhub.com/restaurant/metuchen-diner-338-lake-ave-metuchen/3054935?utm_source=google&utm_medium=organic&utm_campaign=place-action-link&pickup=true&rwg_token=ACgRB3e0YScxWzM9scTbSxmJepOkwYpws_p0Suf39CH6PyP1Hdqq6qCJQCEcv6MBLHfuSYPke-7oCB7mE-QC_bGFb1xzyjPbqg%3D%3D", "_self")}                         
                    />
                    <motion.img 
                        variants={logoVariants} 
                        whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}                          
                        src="images/logos/PostmatesLogo.svg"
                        className='w-[clamp(120px,42vw,160px)] aspect-square rounded-2xl object-cover shadow-lg' 
                        onClick={() => window.open("https://www.postmates.com/store/metuchen-diner/2zx6gLH7UoG_6U6Zp7Bwfg?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas", "_self")}  
                    />
                    <motion.img 
                        variants={logoVariants}
                        whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}                          
                        src="images/logos/SeamlessLogo.svg" 
                        className='w-[clamp(120px,42vw,160px)] aspect-square rounded-2xl object-cover shadow-lg' 
                        onClick={() => window.open("https://www.seamless.com/menu/metuchen-diner-338-lake-ave-metuchen/3054935?utm_source=google&utm_medium=organic&utm_campaign=place-action-link&pickup=true&rwg_token=ACgRB3caLOglv6HUzZoN_tasIlTj0clErfHiCxZcTQxTEPhG4RjCJN9YjpjY8VyH0fb8_gbjEtjRuGgDUGNvDMVFdyxNDI5SRg%3D%3D", "_self")}  
                    />
                    <motion.img 
                        variants={logoVariants} 
                        whileHover={{ scale: 1.05, boxShadow: "0 4px 20px #000000",}}
                        whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}                      
                        src="images/logos/OnlineOrderingLogo.svg" 
                        className='w-[clamp(120px,42vw,160px)] aspect-square rounded-2xl object-cover shadow-lg' 
                        onClick={() => window.open("https://order.online/store/-1510711/?pickup=true&hideModal=true&utm_source=gfo&rwg_token=ACgRB3fTdz0izZOR1tPs4gZwVwk9PfEgnn-4yddsltba8HI8fTt6EQ90MxfWV0K8YJoOfzLxqJ5bVWG4ZSJO1lQoRLd4OE-nCA%3D%3D", "_self")}  
                    />
                </motion.div>               
            </div>

            <div className="absolute w-[60%] bottom-2 left-2 flex flex-col gap-2 items-start outfit-font text-black/60 text-[14px] 2xl:text-[18px]">
                <motion.span
                    className="cursor-pointer 2xl:relative"
                    whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 700, damping: 10 } }}   
                    onClick={() => window.open("https://www.instagram.com/metuchen_diner", "_self")}                        
                >
                    {instagramLogo}
                </motion.span>
                <span>© 2025 Metuchen Diner</span>                    
            </div>
        </div> 
    </div>
  )
}

export default MobileOrderNow
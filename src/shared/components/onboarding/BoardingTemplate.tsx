// "use client";

// import React from "react";
// import Image from "next/image";
// import { motion, Variants } from "framer-motion";
// import Karakter from "@/assets/img/onboarding/karakter.png";
// import Star from "@/assets/img/onboarding/star.png";
// import Planets from "@/assets/img/planets.svg";

// interface BoardingTemplateProps {
//   children: React.ReactNode;
// }

// // Animation variants with proper typing
// const slideInLeft: Variants = {
//   hidden: { x: "-100%", opacity: 0 },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       type: "tween",
//       duration: 0.8,
//       ease: "easeOut",
//       delay: 0.1,
//     },
//   },
// };

// const slideInRight: Variants = {
//   hidden: { x: "100%", opacity: 0 },
//   visible: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       type: "tween",
//       duration: 0.8,
//       ease: "easeOut",
//       delay: 0.3,
//     },
//   },
// };

// const fadeInUp: Variants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "tween",
//       duration: 0.6,
//       ease: "easeOut",
//       delay: 0.8,
//     },
//   },
// };

// const breathingFloat: Variants = {
//   animate: {
//     y: [0, -4, 2, -3, 0],
//     scale: [1, 1.02, 1],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

// const starBreathing: Variants = {
//   animate: {
//     filter: [
//       "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
//       "drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))",
//       "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
//     ],
//     scale: [1, 1.03, 1],
//     rotate: [0, 5, -3, 4, -2, 0],
//     transition: {
//       duration: 3.5,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

// const planetBreathing: Variants = {
//   animate: {
//     filter: [
//       "drop-shadow(0 0 12px rgba(100, 149, 237, 0.5))",
//       "drop-shadow(0 0 20px rgba(100, 149, 237, 0.8))",
//       "drop-shadow(0 0 12px rgba(100, 149, 237, 0.5))",
//     ],
//     scale: [0.75, 0.77, 0.75],
//     rotate: [0, 4, -2, 3, -1, 0],
//     transition: {
//       duration: 4,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

// const BoardingTemplate: React.FC<BoardingTemplateProps> = ({ children }) => {
//   return (
//     <section className="bg-[#171F74] md:bg-gradient-to-b md:py-20 lg:py-10 from-[#030D35] relative to-[#19217C] min-h-screen">
//       <div className="flex items-center h-full mycontainer pt-16 sm:pt-18 md:pt-20 lg:pt-22 xl:pt-24 font-white">
//         {/* Left Panel */}
//         <motion.div
//           variants={slideInLeft}
//           initial="hidden"
//           animate="visible"
//           className="h-full w-full bg-[#171F74] 
//                      md:h-[85vh] lg:h-[88vh] xl:h-[90vh]
//                      md:rounded-l-2xl md:border-4 border-[#3F5DAA] 
//                      md:shadow-[-8px_0_20px_-8px_rgba(100,149,237,0.4),_0_8px_20px_-4px_rgba(100,149,237,0.4),_0_-8px_20px_-4px_rgba(100,149,237,0.4)]"
//         >
//           {children}
//         </motion.div>

//         {/* Right Panel */}
//         <motion.div
//           variants={slideInRight}
//           initial="hidden"
//           animate="visible"
//           className="hidden md:flex md:w-full 
//                      h-[85vh] lg:h-[88vh] xl:h-[90vh]
//                      bg-[#3F5DAA] rounded-r-2xl border-4 border-[#3F5DAA] 
//                      flex-col items-center justify-center gap-2 lg:gap-4
//                      md:shadow-[8px_0_20px_-8px_rgba(100,149,237,0.4),_0_8px_20px_-4px_rgba(100,149,237,0.4),_0_-8px_20px_-4px_rgba(100,149,237,0.4)]"
//         >
//           <div className="flex w-full h-1/2 justify-center items-center">
//             <div className="relative w-[25vh] md:w-[26vh] lg:w-[32vh] xl:w-[38vh] 2xl:w-[42vh] h-full">
//               {/* Main Character with breathing and floating */}
//               <motion.div
//                 variants={breathingFloat}
//                 animate="animate"
//                 className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
//               >
//                 <Image
//                   className="w-full h-auto max-w-[180px] md:max-w-[200px] lg:max-w-[280px] xl:max-w-[320px]"
//                   alt="robot onboarding"
//                   src={Karakter}
//                   draggable={false}
//                   priority
//                 />
//               </motion.div>

//               {/* Bottom Star with breathing glow and wiggle */}
//               <motion.div
//                 variants={starBreathing}
//                 animate="animate"
//                 className="absolute bottom-1 md:bottom-2 left-2 md:left-4"
//               >
//                 <Image
//                   className="w-16 md:w-20 lg:w-24 xl:w-28 h-auto"
//                   width={100}
//                   height={100}
//                   alt="robot onboarding"
//                   src={Star}
//                   draggable={false}
//                 />
//               </motion.div>

//               {/* Top Star with breathing glow and wiggle */}
//               <motion.div
//                 variants={starBreathing}
//                 animate="animate"
//                 className="absolute top-1 md:top-2 left-6 md:left-8 lg:left-10 z-0 scale-50 md:scale-60 lg:scale-75"
//               >
//                 <Image
//                   className="w-16 md:w-20 lg:w-24 xl:w-28 h-auto"
//                   width={100}
//                   height={100}
//                   alt="robot onboarding"
//                   src={Star}
//                   draggable={false}
//                 />
//               </motion.div>

//               {/* Planets with breathing glow and tiny wiggle */}
//               <motion.div
//                 variants={planetBreathing}
//                 animate="animate"
//                 className="absolute top-1 md:top-2 -right-1 md:-right-2 z-0"
//               >
//                 <Image
//                   className="w-28 md:w-32 lg:w-40 xl:w-48 h-auto"
//                   width={100}
//                   height={100}
//                   alt="robot onboarding"
//                   src={Planets}
//                   draggable={false}
//                 />
//               </motion.div>
//             </div>
//           </div>

//           {/* Text content with fade in animation */}
//           <motion.div
//             variants={fadeInUp}
//             initial="hidden"
//             animate="visible"
//             className="space-y-1 md:space-y-2 lg:space-y-3 xl:space-y-4 text-center px-4"
//           >
//             <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-changa">
//               Welcome to ITFEST!
//             </h2>
//             <p className="text-sm md:text-base lg:text-lg xl:text-xl font-changa leading-relaxed">
//               Compete, Collaborate, and Win <br /> Together!
//             </p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default BoardingTemplate;

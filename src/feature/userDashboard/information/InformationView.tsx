// import { motion } from "framer-motion";
// import { TeamProfileResponse } from "../types/teamProfile";
// import { stackUpStagger } from "../lib/motionVarians";
// import Deadline from "./information/Deadline";
// import Guidebook from "./information/Guidebook";
// import TeamProfile from "./information/TeamProfile";
// import Announcement from "./information/Announcement";

// interface InformationViewProps {
//   teamData: TeamProfileResponse;
//   isNotRegistered: boolean;
// }

// export const InformationView = ({
//   teamData,
//   isNotRegistered,
// }: InformationViewProps) => {
//   return (
//     <motion.div key="info" initial="hidden" animate="visible" exit="hidden">
//       <div className="flex w-full flex-col gap-6 lg:flex-row">
//         <motion.section
//           className="w-full lg:w-1/2"
//           variants={stackUpStagger}
//           custom={2}
//         >
//           <Deadline deadline={teamData.deadline} />
//         </motion.section>
//         <motion.section
//           className="w-full lg:w-1/2"
//           variants={stackUpStagger}
//           custom={3}
//         >
//           <Guidebook competitionCategory={teamData.competition_category} />
//         </motion.section>
//       </div>

//       {!isNotRegistered && (
//         <div className="mt-6 flex flex-col gap-6 lg:flex-row">
//           <motion.section
//             className="w-full lg:w-2/3"
//             variants={stackUpStagger}
//             custom={4}
//           >
//             <TeamProfile profile={teamData} />
//           </motion.section>
//           <motion.section
//             className="w-full lg:w-1/3"
//             variants={stackUpStagger}
//             custom={5}
//           >
//             <Announcement />
//           </motion.section>
//         </div>
//       )}
//     </motion.div>
//   );
// };

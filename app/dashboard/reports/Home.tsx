// "use client";
// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import Report from "./Report";
// import MostRead from "./MostRead";
// import AddReport from "./create-report/AddReport";
// import Link from "next/link";
// import { useSession } from "next-auth/react";

// const Home = () => {
//   const { data: session } = useSession();
//   const token = session?.user?.accessToken;
//   const [showReports, setShowReports] = useState<boolean>(true);

//   return (
//     <div className="py-4 reportsPage">
//       <div className="leftReportsPanel">
//         {showReports ? (
//           <>
//             <div className="border border-[#0000001F] p-4 rounded-md">
//               <h3 className="text-sm font-medium">Research & Reports</h3>
//               <div className="mt-4 flex justify-between items-center gap-[2rem]">
//                 <div className="flex items-center gap-1 text-xs">
//                   <p>View:</p>
//                   <button>Latest Reports</button>
//                   <button>Top Reports</button>
//                 </div>
//                 <div className="border border-[#0000004d] p-[0.25rem] rounded-[0.2rem] flex gap-1 items-center flex-1">
//                   <Search color="#00000099" size={12} />
//                   <input
//                     type="text"
//                     placeholder="Search Tags. E.g., AGO, Petrol"
//                     className="text-sm text-[#00000099] flex-1 h-[25px] outline-none placeholder:text-sm"
//                   />
//                 </div>
//                 <button
//                   className="bg-[#000000] px-4 rounded-md text-white text-xs h-[33px]"
//                   onClick={() => setShowReports(false)}
//                 >
//                   Add New Report
//                 </button>
//               </div>
//             </div>

//             <div className="mt-4 flex-col flex gap-4">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <Link href={"/dashboard/reports/report"} key={i}>
//                   <Report key={i} recent={false} />
//                 </Link>
//               ))}
//             </div>
//           </>
//         ) : (
//           <AddReport
//             setShowAddReport={setShowReports}
//             showReports={showReports}
//           />
//         )}
//       </div>
//       <div className="rightReportsPanel">
//         <MostRead />
//       </div>
//     </div>
//   );
// };

// export default Home;

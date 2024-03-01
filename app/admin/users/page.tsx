// import React from "react";
// import ClientComponent from "./ClientComponent";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/utils/auth";

// async function getDataAnalysts(header: string, limit: string) {
//   try {
//     const res = await fetch(
//       `https://petrodata.zainnovations.com/api/v1/user/retrieve?flag=analysts&batch=1&limit=${
//         limit || "10"
//       }`,
//       {
//         headers: {
//           Authorization: `Bearer ${header}`,
//         },
//       }
//     );
//     return res.json();
//   } catch (error: any) {
//     console.log(error);
//     return [];
//   }
// }

// async function getDatafield(header: string, limit: string) {
//   try {
//     const res = await fetch(
//       `https://petrodata.zainnovations.com/api/v1/user/retrieve?flag=field_agents&batch=1&limit=${
//         limit || "10"
//       }`,
//       {
//         headers: {
//           Authorization: `Bearer ${header}`,
//         },
//       }
//     );
//     return res.json();
//   } catch (error: any) {
//     console.log(error);
//     return [];
//   }
// }

// async function getDataclient(header: string, limit: string) {
//   try {
//     const res = await fetch(
//       `https://petrodata.zainnovations.com/api/v1/user/retrieve?flag=clients&batch=1&limit=${
//         limit || "10"
//       }`,
//       {
//         headers: {
//           Authorization: `Bearer ${header}`,
//         },
//       }
//     );
//     return res.json();
//   } catch (error: any) {
//     console.log(error);
//     return [];
//   }
// }

// const Page = async ({ searchParams }: any) => {
//   console.log(searchParams);
//   const user = await getServerSession(authOptions);
//   const analyst = await getDataAnalysts(
//     `${user?.user.accessToken}`,
//     searchParams.rows
//   );
//   const field = await getDatafield(
//     `${user?.user.accessToken}`,
//     searchParams.rows
//   );
//   const client = await getDataclient(
//     `${user?.user.accessToken}`,
//     searchParams.rows
//   );

//   return (
//     <div>
//       <ClientComponent
//         data={analyst?.data?.result}
//         field={field?.data?.result}
//         client={client.data?.result}
//       />
//     </div>
//   );
// };

// export default Page;

import React from "react";
import Home from "./Home";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

const page = async () => {
  const user = await getServerSession(authOptions);

  console.log(user);
  return (
    <>
      <Home token={user?.user.accessToken} />
    </>
  );
};

export default page;

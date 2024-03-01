"use client";
import React, { useState, useEffect } from "react";
import ClientComponent from "./ClientComponent";
import { authOptions } from "@/utils/auth";
import { useSession } from "next-auth/react";

interface HomeProps {
  token?: string;
}
const Home: React.FC<HomeProps> = ({ token }) => {
  const { data: session } = useSession();
  // const token = session?.user.accessToken;

  const [batch, setBatch] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [analyst, setAnalyst] = React.useState<any>();
  const [field, setField] = React.useState<any>();
  const [client, setClient] = React.useState<any>();
  async function getDataAnalysts() {
    try {
      const res = await fetch(
        `https://petrodata.zainnovations.com/api/v1/user/retrieve?flag=analysts&batch=${batch}&limit=${
          limit || "10"
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAnalyst(data);
    } catch (error: any) {
      console.log(error);
      return [];
    }
  }

  async function getDatafield() {
    try {
      const res = await fetch(
        `https://petrodata.zainnovations.com/api/v1/user/retrieve?flag=field_agents&batch=${batch}&limit=${
          limit || "10"
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setField(data);
    } catch (error: any) {
      console.log(error);
      return [];
    }
  }

  async function getDataclient() {
    try {
      const res = await fetch(
        `https://petrodata.zainnovations.com/api/v1/user/retrieve?flag=clients&batch=${batch}&limit=${
          limit || "10"
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setClient(data);
    } catch (error: any) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    getDataAnalysts();
    getDatafield();
    getDataclient();
  }, [batch, limit]);

  return (
    <div>
      <ClientComponent
        data={analyst?.data?.result}
        field={field?.data?.result}
        client={client?.data?.result}
        setBatch={setBatch}
        setLimit={setLimit}
        batch={batch}
        limit={limit}
      />
    </div>
  );
};

export default Home;

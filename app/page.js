"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const CheckUser = async () => {
    const result = await createUser({
      userName: user?.fullName,
      email: user?.primaryEmailAddress.emailAddress,
      imageUrl: user?.imageUrl
     
    });
    console.log(result);
  }
  useEffect(() => {
   if(user)  CheckUser();
  }, [user])

  return (
    <div>
      Hola
      <Button>
        Suscribe
      </Button>
      <UserButton />
    </div>
  );
}

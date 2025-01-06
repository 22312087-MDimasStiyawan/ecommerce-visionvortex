import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const setUpPage = () => {
  return (
    <div className="p-4">
        <UserButton></UserButton>
    </div>

  );
}

export default setUpPage

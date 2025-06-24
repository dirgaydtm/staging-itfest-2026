import React from "react";
import PageIndex from "../PageIndex";
import { Button } from "@/shared/components/ui/Button";
import InformartionSucces from "./InformartionSucces";
import { useRouter } from "next/navigation";

interface SuccesFormProps {
  teamName: string;
  competitionType: string;
}

const PendaftaranSelesaiForm: React.FC<SuccesFormProps> = ({
  teamName,
  competitionType,
}) => {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  const handleGoToHome = () => {
    router.push("/home");
  };

  return (
    <section className="flex flex-col items-center justify-between h-full  ">
      <PageIndex index={5} title="Selesai" />
      <InformartionSucces />
      <div className="flex flex-col items-center justify-center w-full space-y-2">
        <Button
          type="button"
          size="normal"
          className="w-full text-base"
          onClick={handleGoToDashboard}
        >
          Lihat Dashboard
        </Button>

        <Button
          type="button"
          size="normal"
          variant="tertiary"
          className="w-full text-sm"
          onClick={handleGoToHome}
        >
          Kembali ke Beranda
        </Button>
      </div>
    </section>
  );
};

export default PendaftaranSelesaiForm;

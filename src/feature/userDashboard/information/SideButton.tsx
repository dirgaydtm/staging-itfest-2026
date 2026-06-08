import clsx from "clsx";

interface Props {
  active: "info" | "submit";
  onChange: (type: "info" | "submit") => void;
  disabledSubmit?: boolean;
}

const SideButtons = ({ active, onChange, disabledSubmit }: Props) => {
  return (
    <section className="flex lg:flex-col flex-row gap-4 w-full">
      <button
        onClick={() => onChange("info")}
        className={clsx(
          "p-6 font-changa font-bold md:text-xl text-base rounded-3xl transition w-full flex justify-center items-center",
          active === "info"
            ? "bg-purple-300 text-glow"
            : "bg-purple-400 hover:bg-purple-500"
        )}
      >
        Information
      </button>

      <button
        onClick={() => onChange("submit")}
        disabled={disabledSubmit}
        className={clsx(
          "p-6 font-changa font-bold md:text-xl text-base rounded-3xl transition w-full  flex justify-center items-center truncate",
          disabledSubmit
            ? "bg-gray-800 cursor-not-allowed text-gray-400"
            : active === "submit"
              ? "bg-purple-300 text-glow"
              : "bg-purple-400 hover:bg-purple-500"
        )}
      >
        Submit Your Work
      </button>
    </section>
  );
};

export default SideButtons;

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useNavigate } from "react-router-dom";
export function Hero() {
  const words = [
    {
      text: "Track",
    },
    {
      text: "your",
    },
    {
      text: "fitness",
    },
    {
      text: "and",
    },
    {
      text: "achieve",
    },
    {
      text: "greatness",
    },
    {
      text: "with",
    },
    {
      text: "LiftNote.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Trackworkout");
  };
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Your journey to strength and progress begins here.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Login
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
        <button
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
          onClick={handleButtonClick}
        >
          Track Workout
        </button>
      </div>
    </div>
  );
}

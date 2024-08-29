import { m } from "framer-motion";

const MotionPlusSign = ({
  isActive = true,
  numberPlus = 1,
  x,
  y,
  type = "plus",
  layoutId,
}: {
  isActive: boolean;
  numberPlus: number;
  x: number;
  y: number;
  type?: "plus" | "dot";
  layoutId?: string;
}) => {
  return (
    <m.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 99,
        willChange: "transform, opacity"
      }}
      layoutId={layoutId}
      initial={{ scale: 0.5, opacity: 1 }}
      animate={{ scale: 1, y: -100, opacity: 0 }}
      exit={{ y: -(y + 50), opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {type === "plus" && isActive ? (
        <span className="text-5xl font-bold text-white pointer-events-none">
          +{numberPlus}
        </span>
      ) : (
        <div className="w-[20px] h-[20px] bg-white rounded-full"></div>
      )}
    </m.div>
  );
};

export default MotionPlusSign;

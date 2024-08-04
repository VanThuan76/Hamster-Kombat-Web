import { m } from "framer-motion";

const MotionPlusSign = ({ numberPlus = 1, x, y, type = 'plus' }: { numberPlus: number; x: number; y: number, type?: 'plus' | 'dot' }) => {
    return (
        <m.div
            style={{ position: 'absolute', left: x, top: y, zIndex: 99 }}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1, y: -100, opacity: 0 }}
            exit={{ scale: 0, opacity: 0.3 }}
            transition={{ duration: 1 }}
        >
            {type === 'plus' ? (
                <span className="text-5xl text-white font-bold pointer-events-none">+{numberPlus}</span>
            ) : (
                <div className="w-[20px] h-[20px] bg-white rounded-full"></div>
            )}
        </m.div>
    );
};

export default MotionPlusSign;

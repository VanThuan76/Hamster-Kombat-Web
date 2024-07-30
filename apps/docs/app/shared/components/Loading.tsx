import Image from "next/image";
import { cn } from "@ui/lib/utils"

const Loading = ({ className }: { className?: string }) => {
    return (
        <div className={cn('fixed bottom-0 left-0 right-0 top-0 z-[1000000] w-full h-full flex items-center justify-center bg-black', className)}>
            <div className='flex items-center justify-center gap-2'>
                <Image src="/project/icon_ava_user.png" alt="@icon_loading" width={24} height={24} className="animate-bounce [animation-delay:-0.3s]" />
                <Image src="/project/icon_ava_user.png" alt="@icon_loading" width={24} height={24} className="animate-bounce [animation-delay:-0.2s]" />
                <Image src="/project/icon_ava_user.png" alt="@icon_loading" width={24} height={24} className="animate-bounce [animation-delay:-0.1s]" />
            </div>
        </div>
    );
};

export default Loading;

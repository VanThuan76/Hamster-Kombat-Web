import { cn } from "@ui/lib/utils";

type TypographySmallProps = {
    text: string;
    className?: string;
};

export default function TypographySmall({ text, className = "" }: TypographySmallProps) {
    return (
        <small className={cn(`text-sm font-medium leading-none ${className}`)}>
            {text}
        </small>
    );
}


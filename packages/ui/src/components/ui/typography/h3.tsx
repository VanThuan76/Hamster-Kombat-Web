import { cn } from "@ui/lib/utils";

type TypographyH3Props = {
    text: string;
    className?: string;
};

export default function TypographyH2({ text, className = "" }: TypographyH3Props) {
    return (
        <h3 className={cn(`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`)}>
            {text}
        </h3>
    );
}


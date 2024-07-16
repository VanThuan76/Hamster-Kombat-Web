import { cn } from "@ui/lib/utils";

type TypographyH1Props = {
    text: string;
    className?: string;
};

export default function TypographyH1({ text, className = "" }: TypographyH1Props) {
    return (
        <h1 className={cn(`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`)}>
            {text}
        </h1>
    );
}

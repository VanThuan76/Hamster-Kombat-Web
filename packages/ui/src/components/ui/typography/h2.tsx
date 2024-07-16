import { cn } from "@ui/lib/utils";

type TypographyH2Props = {
    text: string;
    className?: string;
};

export default function TypographyH2({ text, className = "" }: TypographyH2Props) {
    return (
        <h2 className={cn(`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`)}>
            {text}
        </h2>
    );
}


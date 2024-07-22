'use client'

import React from 'react';
import TypographyLarge from "@ui/components/typography/large";

interface MemoTypographyLargeProps {
    text: string;
    className?: string
}

const MemoTypographyLarge: React.FC<MemoTypographyLargeProps> = React.memo(({ text, className }) => {
    return <TypographyLarge text={text} className={className} />;
});

export default MemoTypographyLarge;

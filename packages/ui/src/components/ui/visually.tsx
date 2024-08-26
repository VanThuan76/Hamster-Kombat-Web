"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import React from "react";

export default function VisuallyHiddenCpn({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VisuallyHidden.Root>{children}</VisuallyHidden.Root>;
}

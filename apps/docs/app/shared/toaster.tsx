"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@ui/components/toast";
import { useToast } from "./hooks/useToast";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, variant, ...props }) {
                return (
                    <Toast key={id} className="flex max-w-[350px] h-[36px] relative box-border bg-[rgba(39,42,47,0.9)] border border-[rgba(39,42,47,0.9)] rounded-[16px] shadow-[0_0_transparent] min-w-[calc(100vw_-_32px)] items-center select-none touch-none" {...props}>
                        {variant === 'success' ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" fill="#82F88E" className="w-[18px] h-[18px]">
                                <path d="M6,-0c-3.308,-0 -6,2.692 -6,6c-0,3.308 2.692,6 6,6c3.308,-0 6,-2.692 6,-6c-0,-3.308 -2.692,-6 -6,-6Zm3.123,3.989l-3.877,4.616c-0.086,0.102 -0.213,0.162 -0.346,0.164l-0.008,0c-0.131,0 -0.256,-0.055 -0.343,-0.153l-1.662,-1.846c-0.081,-0.085 -0.126,-0.199 -0.126,-0.316c0,-0.254 0.209,-0.462 0.462,-0.462c0.135,0 0.263,0.059 0.35,0.161l1.307,1.451l3.536,-4.209c0.087,-0.101 0.215,-0.159 0.349,-0.159c0.253,-0 0.461,0.208 0.461,0.461c0,0.107 -0.036,0.21 -0.103,0.292Z"></path>
                            </svg>
                            : variant === 'destructive' ? <svg className="animate-spin w-[18px] h-[18px]" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="400" cy="400" r="320" fill="none" stroke="#272a2f" strokeWidth="48" />
                                <circle cx="400" cy="400" r="320" fill="none" stroke="#ffffff" strokeWidth="48" strokeDasharray="1000" strokeDashoffset="250" transform="rotate(90 400 400)" />
                            </svg> : variant === 'error' ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" fill="currentColor" className="w-[18px] h-[18px]">
                                <path d="M6,-0c-3.308,-0 -6,2.692 -6,6c-0,3.308 2.692,6 6,6c3.308,-0 6,-2.692 6,-6c-0,-3.308 -2.692,-6 -6,-6Zm-0,9.228c-0.316,0 -0.577,-0.26 -0.577,-0.577c0,-0.316 0.261,-0.577 0.577,-0.577c0.316,0 0.577,0.261 0.577,0.577c-0,0.317 -0.261,0.577 -0.577,0.577Zm0.627,-5.802l-0.166,3.519c-0,0.253 -0.208,0.462 -0.462,0.462c-0.253,-0 -0.461,-0.209 -0.461,-0.462l-0.166,-3.518l0,-0.001c-0,-0.009 -0,-0.018 -0,-0.027c-0,-0.344 0.283,-0.627 0.627,-0.627c0.344,0 0.627,0.283 0.627,0.627c-0,0.009 -0,0.018 -0.001,0.027l0.002,-0Z"></path>
                            </svg> : <></>
                        }
                        {title && <ToastTitle className="flex-1 text-[12px] text-white font-extralight">{title}</ToastTitle>}
                        {description && <ToastDescription className="text-[12px] font-extralight">{description}</ToastDescription>}
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}

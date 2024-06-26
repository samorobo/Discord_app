"use client"

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useState, useEffect } from "react";

export const Modalprovider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null;
    }
     return (
        <>
        <CreateServerModal />
        </>
    )
}
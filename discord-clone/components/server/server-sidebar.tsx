import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";
import { Router } from "lucide-react";
import { ServerHeader } from "./server-header";
import { currentProfile } from "@/lib/current-profile";

interface ServerSideProps  {
    serverId: string;
}

export const ServerSidebar = async ({
    serverId
}: ServerSideProps) => {
    const profile = await currentProfile()
    

    if(!profile){
         return redirect("/")
        //return router.push("/")
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include:{
                    profile: true,
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    })

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
    //This is used to filter out our own profile hence the "!=="
    const member = server?.members.filter((member) => member.profileId !== profile.id)

    //Ensure to comback later to fix this error in this IF statement that 
    //causing Throtting navigation error to enter a loop


    if(!server){
        return redirect("/")
    }

    const role = server?.members.find((member) => member.profileId === profile.id)?.role

    return (
        <div className="flex flex-col h-full  text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader server={server} role={role} />
        </div>
    )
}
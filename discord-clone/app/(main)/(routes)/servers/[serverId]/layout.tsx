import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/server-sidebar";
import { useRouter } from "next/router";


const ServerIdLayout = async ({
children,
params,
}: {
children: React.ReactNode;
params: { serverId: string};
}) => {
    const profile = await currentProfile();
    if(!profile) {
        return redirect("/");
    }
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    //Ensure to comback later to fix this error in this IF statement that 
    //causing Throtting navigation error to enter a loop

     if(!server){
         return redirect("/")
     }
    return (
        <div className="h-full">
            <div className="hidden bg-green-500 md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
               <ServerSidebar serverId={params.serverId}/>
            </div>  
            <main className="h-full md:pl-60">
            {children}
            </main>  
        </div>
    )
}
export default ServerIdLayout

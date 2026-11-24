'use client'


import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import DropdownMenu from "./DropdownMenu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface IUser {
    name: string
    email: string
    image?: string | null
}
export default function ProfileMenuSheet({ user }: { user: IUser }) {
    return (
        <Sheet>
            <Tooltip >


                <TooltipTrigger
                    render={

                        <SheetTrigger
                            render={
                                <button
                                    className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white p-0.5 pr-2 shadow-sm transition-all duration-200 hover:border-amber-400 hover:bg-amber-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-amber-500/50 dark:hover:bg-gray-800 cursor-pointer"
                                >

                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full">
                                        <Avatar className="size-10 overflow-hidden border-2 border-white shadow-sm dark:border-gray-800">
                                            {user.image && (
                                                <AvatarImage
                                                    src={user.image}
                                                    alt={user.name}
                                                    className="size-full object-cover"
                                                />
                                            )}
                                            <AvatarFallback className="bg-amber-100 font-semibold text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                                                {user.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                </button>
                            } />
                    }
                />
                <TooltipContent>
                    {user.name}
                </TooltipContent>
            </Tooltip>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{user?.name}</SheetTitle>
                    <SheetDescription>
                        {user.email}
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-6 px-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex sm:hidden pl-2">Home</div>
                        <DropdownMenu />
                        <div className="flex sm:hidden pl-2">About</div>
                        <div className="flex sm:hidden pl-2">Contact</div>
                    </div>
                </div>
                <SheetFooter>
                    <Button type="button">Log Out</Button>
                    {/* <SheetClose render={<Button variant="outline">Close</Button>} /> */}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

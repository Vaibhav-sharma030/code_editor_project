"use client"

import { Button } from '@/components/ui/button';
import React from 'react';
import { toast } from "sonner";
import { StarIcon , StarOffIcon } from 'lucide-react';
import { useState , useEffect , forwardRef } from 'react';
import { toggleStarMarked } from '../actions';


interface MarkedToggleButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
    markedForRevision: boolean
    id: string
}


export const MarkedToggleButton = forwardRef<HTMLButtonElement, MarkedToggleButtonProps>(
    ({ markedForRevision, id, onClick, className, children, ...props}, ref) => {
        const [isMarked, setIsMarked] = useState(markedForRevision)

        useEffect(() => {
            setIsMarked(markedForRevision)
        }, [markedForRevision])

        const handleToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
            // call the original onClick if provided by the parent (DropDownMenuItem)
            onClick?.(event)

            const newMarkedState = !isMarked
            setIsMarked(newMarkedState)

            try {
                const res = await toggleStarMarked(id, newMarkedState)
                const {success, error, isMarked} = res;

                // if isMarked true then show marked successfully otherwise show start over
                if(isMarked && !error && success){
                    toast.success("Added to Favourites successfully")
                }
                else{
                    toast.success("Removed from favourites successfully")
                }
            } 
            catch (error) {
                console.error("Failed to toggle mark for revision", error)
                setIsMarked(!newMarkedState) // revert state if update fails
            }
        }

        return (
            <Button
            ref={ref}
            variant="ghost"
            className={`flex items-center justify-start w-full px-2 py-1.5 text-sm rounded-md cursor-pointer ${className}`}
            onClick={handleToggle}
            {...props}
            >
                {isMarked ? (
                    <StarIcon size={16} className='text-red-500 mr-2'/>
                ) : (
                    <StarOffIcon size={16} className='text-gray-500 mr-2'/>
                )}
                {children || (isMarked ? "Remove Favourite" : "Add to Favourite")}
            </Button>
        )
    },
)


MarkedToggleButton.displayName = "MarkedToggleButton"
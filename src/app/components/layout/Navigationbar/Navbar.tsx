"use client"


import { NavigationMenu } from "radix-ui";
import {CaretDownIcon} from "@radix-ui/react-icons"

//Sidebar

import {
    Button,
    Typography,
    Navbar,
    List,
    ListItem,
} from "@material-tailwind/react"

    ;


import * as Tooltip from '@radix-ui/react-tooltip';

//Icons
import {
    NavArrowDown,
} from "iconoir-react"


type Sections = {
    title: string;
    items: string[];
}

const sections: Sections[] = [
    { title: 'Header Title 1', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
    { title: 'Header Title 2', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
    { title: 'Header Title 3', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
    { title: 'Header Title 4', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
    { title: 'Header Title 5', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
    { title: 'Header Title 6', items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'] },
]







const MenuItem_Custom = ({ label }: { label: string }) => (
    <a
        href="#"
        className="block  text-left m-1 hover:text-green-600 transition-colors"
    >
        {label}
    </a>
);
export default function Nav_bar_layout(){

    return (
        <div className="w-full bg-[#CC291F]">
            <NavigationMenu.Root className="relative z-10 flex w-screen justify-center text-white">
                <NavigationMenu.List className="center m-0 flex list-none rounded-md  p-1 ">
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5
                        rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                            Products
                            <CaretDownIcon
                                className="relative top-px text-violet10 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                                aria-hidden
                            />
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="left-0 top-10 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto">
                            <NavigationMenu.Link/>
                            <ul className="m-0 grid list-none gap-x-1.5 p-[22px] sm:w-[800px] sm:grid-flow-col sm:grid-rows-1 bg-gray-50">
                               <div className="w-full grid grid-cols-2 ">
                                   <div>
                                       <ListItem className="h-full text-black">
                                           <li className="mr-5">
                                               <img className="w-[50px] h-[50px]" src={"/icons/brands/Apple_logo.svg"} alt="Apple" />
                                           </li>
                                           <Typography  className="font-bold">IPhone 17 für nur 99,- pro Monat</Typography>
                                       </ListItem>

                                   </div>
                                   <div className="text-black">
                                       <ListItem className="">
                                           <li>
                                               First list
                                           </li>
                                       </ListItem>
                                       <ListItem className="">
                                           <li>
                                               First list
                                           </li>
                                       </ListItem>
                                       <ListItem className="">
                                           <li>
                                               First list
                                           </li>
                                       </ListItem>
                                   </div>

                               </div>
                           </ul>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>


                        <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5
                        rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                            Smart Home
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>


                        <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5
                        rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                            Camera and Drone
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>


                        <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5
                        rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                            Impressum
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>


                        <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5
                        rounded px-3 py-2 text-[15px] font-medium leading-none text-violet11 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-violet7">
                            Mein konto
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                    <NavigationMenu.Indicator className="NavigationMenuIndicator" />
                    <NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
                        <div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-[#CC291F]" />
                    </NavigationMenu.Indicator>
                </NavigationMenu.List>
                <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
                    <NavigationMenu.Viewport className="shadow-xl border-2 relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
                </div>

            </NavigationMenu.Root>
        </div>

/*
        <div className=" p-0 m-0 w-full bg-red-100">

            <Navbar className="mx-auto w-full bg-gray-800 rounded-none border-0">
                <div className="flex items-center justify-center">
                    <div className="hidden lg:block">
                        <List className="mt-4 flex flex-col gap-10 lg:mt-0 lg:flex-row lg:items-center">
                            <Tooltip.Provider>
                                <Tooltip.Root delayDuration={0}>
                                    <Tooltip.Trigger asChild>
                                        <Button
                                            className={`inline-flex items-center justify-center group border-none`}>
                                            <Typography className="cursor-pointer" variant="h5">Products</Typography>
                                            <NavArrowDown className={'group-data-[state=delayed-open]:rotate-180'}/>
                                        </Button>
                                    </Tooltip.Trigger>
                                    <Tooltip.Content sideOffset={30} side="bottom" className=" rounded bg-gray-800 px-2 py-1 text-white z-[49]">
                                        <div className="p-4  min-w-[1200px] rounded-lg shadow-lg">
                                            <div className="w-full grid grid-cols-3 gap-x-12">
                                                {sections.map((section, index) => (
                                                    <div key={index}>
                                                        <h1 className=" text-left m-1 font-semibold">
                                                            {section.title}
                                                        </h1>
                                                        {section.items.map((item, idx) => (
                                                            <MenuItem_Custom key={idx} label={item} />
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <Tooltip.Arrow />
                                    </Tooltip.Content>
                                </Tooltip.Root>
                            </Tooltip.Provider>
                            <Button className="text-xl border-none">Service</Button>
                            <Button className="text-xl border-none">MyTemplate</Button>
                            <Button className="text-xl border-none">Impressum</Button>
                        </List>
                    </div>
                </div>
            </Navbar>
        </div>
*/
    );
}
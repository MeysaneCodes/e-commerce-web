export default function CustomStepper ({stepperIndex}){


    return (

        <div className="w-full  items-center justify-center ml-10">
            <ol className="flex justify-center items-center w-full">
                <li className={`flex w-full items-center ${stepperIndex === 0 ? "dark:after:border-black after:border-black":"dark:after:border-red-500 after:border-red-500" } text-white dark:text-white after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block`}>
        <span
            className={`flex items-center justify-center w-10 h-10  bg-red-500 rounded-full lg:h-12 lg:w-12 dark:bg-red-500 shrink-0`}>
            <div>
                0
            </div>
        </span>
                </li>


                <li className={`flex w-full items-center ${stepperIndex > 1 ? "dark:after:border-red-500 after:border-red-500"  : "dark:after:border-black after:border-black"} text-white dark:text-white after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block`}>
        <span
            className={`flex items-center justify-center w-10 h-10  ${stepperIndex >= 1 ? "dark:after:bg-red-500 after:bg-red-500 bg-red-500" : "dark:after:bg-black after:bg-black bg-black" } rounded-full lg:h-12 lg:w-12  shrink-0`}>
           <div>1</div>
        </span>
                </li>
                <li className="flex items-center w-full">
        <span
            className={` flex items-center justify-center w-10 h-10 text-white ${stepperIndex === 2 ? "dark:after:bg-red-500 after:bg-red-500 bg-red-500" : "dark:after:bg-black after:bg-black bg-black" } rounded-full lg:h-12 lg:w-12  shrink-0`}>
            <div>2</div>
        </span>
                </li>
            </ol>
        </div>
    )
}
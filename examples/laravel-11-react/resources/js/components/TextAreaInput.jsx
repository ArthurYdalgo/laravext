import { forwardRef, useEffect, useRef, useState } from "react";

export default forwardRef(function TextAreaInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        initialValue = "",
        ...props
    },
    ref
) {
    const input = ref ? ref : useRef();

    const [value, setValue] = useState(initialValue ?? '');

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        // <input
        //     type={type}
        //     className={
        //         "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
        //         className
        //     }
        //     ref={input}
        //     value={value}
        //     onChange={(e) => setValue(e.target.value)}
        //     {...props}
        // />

        <textarea
            className={
                "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
                className
            }
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...props}
        ></textarea>
    );
});



const Form = ({ children }) => {
    return (
        <div className="flex justify-start space-x-4">
            {children}
        </div>
    )
}

const Field = ({ children, outerDivProps, innerDivProps }) => {
    return (
        <div className="group max-w-[20em] min-w-0 grow mb-4 data-[disabled]:select-none data-[disabled]:opacity-50 text-base formkit-outer" {...outerDivProps}>
            <div className="flex flex-col items-start justify-start mb-1.5 last:mb-0 formkit-wrapper" {...innerDivProps}>
                {children}
            </div>
        </div>
    )
}

const Input = ({ type, inputProps, divProps }) => {
    return (
        <div className="text-base flex items-center w-full py-2 px-3 rounded border border-neutral-400 bg-white focus-within:ring-1 focus-within:!ring-blue-500 focus-within:!border-blue-500 group-data-[invalid]:border-red-500 group-data-[invalid]:ring-1 group-data-[invalid]:ring-red-500 group-data-[disabled]:bg-neutral-100 group-data-[disabled]:!cursor-not-allowed shadow group-[]/repeater:shadow-none group-[]/multistep:shadow-none dark:bg-transparent dark:border-neutral-500 dark:group-data-[disabled]:bg-neutral-800/5 dark:group-data-[invalid]:border-red-500 dark:group-data-[invalid]:ring-red-500 formkit-inner" {...divProps}>
            <input className={"appearance-none [color-scheme:light] dark:[color-scheme:dark] selection:text-neutral-700 group-data-[has-overlay]:selection:!text-transparent text-base text-neutral-700 min-w-0 min-h-[1.5em] grow outline-none bg-transparent selection:bg-blue-100 placeholder:text-neutral-400 group-data-[disabled]:!cursor-not-allowed dark:placeholder-neutral-400/50 dark:text-neutral-300 border-none p-0 focus:ring-0 formkit-input "} type={type} {...inputProps} />
        </div>
    )
}

const Label = ({ children, ...props }) => {
    return (
        <label className={"block text-neutral-700 text-sm font-bold dark:text-neutral-300 mb-1 formkit-label "} {...props}>
            {children}
        </label>
    )
}

Form.Field = Field
Form.Input = Input
Form.Label = Label

export default Form
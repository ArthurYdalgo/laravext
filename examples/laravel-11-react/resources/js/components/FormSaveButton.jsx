export default ({ children, loading = false, ...props }) => {

    if (loading) {
        return (<div className="group max-w-[20em] min-w-0 grow mb-4 data-[disabled]:select-none text-base data-[disabled]:opacity-100 formkit-outer" data-family="button" data-type="submit" data-empty="true" data-disabled="true">
            <div className="group-data-[disabled=true]:grayscale formkit-wrapper">
                <button {...props} className="appearance-none [color-scheme:light] dark:[color-scheme:dark] selection:bg-blue-100 selection:text-neutral-700 group-data-[has-overlay]:selection:!text-transparent font-bold rounded outline-none flex  px-7 py-3 items-center mb-1.5  ring-offset-2 ring-blue-500 focus-visible:ring-2 group-data-[disabled]:!cursor-not-allowed shadow group-data-[prefix-icon]:pl-5 group-data-[suffix-icon]:pr-5 border border-blue-600  group-[]/repeater:shadow-sm group-[]/multistep:shadow-sm dark:border-blue-500 bg-blue-600 active:text-blue-100 active:bg-blue-700 hover:bg-blue-700 disabled:border-neutral-400 disabled:bg-neutral-400 disabled:text-neutral-100 dark:disabled:border-neutral-100 dark:disabled:bg-neutral-500 dark:disabled:text-neutral-200 dark:text-white dark:ring-offset-blue-500 before:transition-all group-data-[loading=true]/form:before:content[''] group-data-[loading=true]/form:before:block group-data-[loading=true]/form:before:animate-spin group-data-[loading=true]/form:before:w-5 group-data-[loading=true]/form:before:h-5 group-data-[loading=true]/form:before:rounded-full group-data-[loading=true]/form:before:mr-3 group-data-[loading=true]/form:before:-ml-1.5 group-data-[loading=true]/form:before:border-2 group-data-[loading=true]/form:before:border-solid group-data-[loading=true]/form:before:border-white group-data-[loading=true]/form:before:border-r-transparent formkit-input text-white" type="submit" name="submit_2" id="input_1" disabled="">
                    <div className="mini-loader mr-3 ml-[-5px]"></div>
                    {children}
                </button>
            </div>
        </div>)
    }

    return (
        <div className="group max-w-[20em] min-w-0 grow mb-4 data-[disabled]:select-none text-base data-[disabled]:opacity-100 formkit-outer" data-family="button" data-type="submit" data-empty="true">
            <div className="group-data-[disabled=true]:grayscale formkit-wrapper">
                <button {...props} className="appearance-none [color-scheme:light] dark:[color-scheme:dark] selection:bg-blue-100 selection:text-neutral-700 group-data-[has-overlay]:selection:!text-transparent font-bold rounded outline-none flex px-7 py-3 items-center mb-1.5 ring-offset-2 ring-blue-500 focus-visible:ring-2 group-data-[disabled]:!cursor-not-allowed shadow group-data-[prefix-icon]:pl-5 group-data-[suffix-icon]:pr-5 border border-blue-600  group-[]/repeater:shadow-sm group-[]/multistep:shadow-sm dark:border-blue-500 bg-blue-600 text-white active:text-blue-100 active:bg-blue-700 hover:bg-blue-700 disabled:border-neutral-400 disabled:bg-neutral-400 disabled:text-neutral-100 dark:disabled:border-neutral-100 dark:disabled:bg-neutral-500 dark:disabled:text-neutral-200 dark:text-white dark:ring-offset-blue-500 before:transition-all group-data-[loading=true]/form:before:content[''] group-data-[loading=true]/form:before:block group-data-[loading=true]/form:before:animate-spin group-data-[loading=true]/form:before:w-5 group-data-[loading=true]/form:before:h-5 group-data-[loading=true]/form:before:rounded-full group-data-[loading=true]/form:before:mr-3 group-data-[loading=true]/form:before:-ml-1.5 group-data-[loading=true]/form:before:border-2 group-data-[loading=true]/form:before:border-solid group-data-[loading=true]/form:before:border-white group-data-[loading=true]/form:before:border-r-transparent formkit-input" type="submit" name="submit_2" id="input_1">
                    {children}
                </button>
            </div>
        </div>
    )

}
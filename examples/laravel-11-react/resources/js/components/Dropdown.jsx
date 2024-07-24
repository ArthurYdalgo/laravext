import { useState, createContext, useContext, Fragment } from "react";
import { Transition } from "@headlessui/react";
import DropdownButton from "./DropdownButton";
import { visit } from "@laravext/react/router";

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                ></div>
            )}
        </>
    );
};

const Link = ({ children, href = null, routeName = null, ...props }) => {
    const { setOpen } = useContext(DropDownContext);

    const resolvedHref = href
        ? href
        : routeName != null && route().has(routeName)
        ? route(routeName)
        : "";

    return (
        <DropdownButton
            onClick={(e) => {
                e.preventDefault();
                visit(resolvedHref);
                setOpen(false);
            }}
        >
            {children}
        </DropdownButton>
    );
};

const Content = ({
    align = "right",
    width = "48",
    contentClasses = "py-1 bg-white dark:bg-gray-700",
    children,
}) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = "origin-top";

    if (align === "left") {
        alignmentClasses = "origin-top-left left-0";
    } else if (align === "right") {
        alignmentClasses = "origin-top-right right-0";
    }

    let widthClasses = "";

    if (width === "48") {
        widthClasses = "w-48";
    }

    if (width == "24") {
        widthClasses = "w-24";
    }

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacitd:\laragon\www\slackChaves\resources\js\Components\ResponsiveNavLink.jsxy-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <div
                        className={
                            `rounded-md ring-1 ring-black ring-opacity-5 ` +
                            contentClasses
                        }
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = Link;

export default Dropdown;

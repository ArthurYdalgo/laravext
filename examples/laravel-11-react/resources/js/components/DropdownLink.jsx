import DropdownButton from "./DropdownButton";
import Link from "./Link";

export default ({ children, href = null, routeName = null, ...props }) => {
    return (
        <Link href={href} routeName={routeName}>
            <DropdownButton>{children}</DropdownButton>
        </Link>
    );
};

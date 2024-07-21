export const currentRouteIs = (name) => {
    if (name == null) {
        return false;
    }

    if (typeof name == "string") {
        return route().has(name) && route().current(name);
    }

    if (Array.isArray(name)) {
        return name.some((n) => route().has(n) && route().current(n));
    }

    return false;
};
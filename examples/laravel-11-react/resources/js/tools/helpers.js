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

export const tagHexColor = (tag) => {
    let slug = typeof tag === "string" ? tag : tag.slug;

    const hash = slug.split("").reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const color = `#${((hash & 0x00ffffff) | 0x1000000)
        .toString(16)
        .substring(1)}`;

    return color;
};

export const currentRouteIs = (name) => {

    if(name == null){
        return false;
    }

    return (route().has(name) && route().current(name));
}
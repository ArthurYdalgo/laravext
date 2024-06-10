export default  ({ routeName, href, classes = '', children }) => {
  let resolvedHref = href ? href : (routeName && route().has(routeName) ? route(routeName) : '');

  return (
    <a href={resolvedHref} className={classes}>
      {children}
    </a>
  );
};

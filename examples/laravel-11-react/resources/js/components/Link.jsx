export default  ({ routeName, href, className = '', children }) => {
  let resolvedHref = href ? href : (routeName && route().has(routeName) ? route(routeName) : '');

  return (
    <a href={resolvedHref} className={className}>
      {children}
    </a>
  );
};

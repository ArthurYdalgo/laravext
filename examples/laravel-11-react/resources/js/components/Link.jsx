import { visit } from '@laravext/react/router';

export default  ({ routeName, href, className = '', children }) => {
  let resolvedHref = href ? href : (routeName && route().has(routeName) ? route(routeName) : '');

  return (
    <a href={resolvedHref} onClick={(e) =>{
      e.preventDefault();
      visit(resolvedHref);
    }

    } className={className}>
      {children}
    </a>
  );
};

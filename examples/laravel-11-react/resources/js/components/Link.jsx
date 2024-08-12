import {currentRouteIs} from '@/tools/helpers';
import {Link} from '@laravext/react';

export default  ({ routeName, href, className = '', children , classNameWhenIsCurrentRoute = ''}) => {
  let resolvedHref = href ? href : (routeName != null && route().has(routeName) ? route(routeName) : '');

  if (currentRouteIs(routeName)) {
    className += ' ' + classNameWhenIsCurrentRoute;
  }

  return (
    <Link
      href={resolvedHref}
      className={className}
      preserveScroll={true}
      >
      {children}
    </Link>
  );
};

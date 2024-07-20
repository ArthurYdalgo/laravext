import {currentRouteIs} from '@/tools/helpers';
import { visit } from '@laravext/react/router';

export default  ({ routeName, href, className = '', children , classNameWhenIsCurrentRoute = ''}) => {
  let resolvedHref = href ? href : (routeName != null && route().has(routeName) ? route(routeName) : '');

  if (currentRouteIs(routeName)) {
    className += ' ' + classNameWhenIsCurrentRoute;
  }

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

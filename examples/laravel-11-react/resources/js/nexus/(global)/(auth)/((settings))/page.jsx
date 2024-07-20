import { visit } from '@laravext/react/router';

export default () => {
    visit(route('settings.profile'));
    return null;
}
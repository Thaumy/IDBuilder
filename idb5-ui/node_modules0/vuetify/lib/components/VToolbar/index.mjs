// Components
import VToolbar from "./VToolbar.mjs"; // Utilities

import { createSimpleFunctional } from "../../util/index.mjs";
const VToolbarTitle = createSimpleFunctional('v-toolbar__title');
const VToolbarItems = createSimpleFunctional('v-toolbar__items');
export { VToolbar, VToolbarItems, VToolbarTitle };
export default {
  $_vuetify_subcomponents: {
    VToolbar,
    VToolbarItems,
    VToolbarTitle
  }
};
//# sourceMappingURL=index.mjs.map
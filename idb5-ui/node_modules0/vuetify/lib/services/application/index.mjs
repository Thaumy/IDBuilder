function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-nocheck

/* eslint-disable */
// Extensions
import { Service } from "../service/index.mjs"; // Types

export class Application extends Service {
  constructor() {
    super(...arguments);

    _defineProperty(this, "bar", 0);

    _defineProperty(this, "top", 0);

    _defineProperty(this, "left", 0);

    _defineProperty(this, "insetFooter", 0);

    _defineProperty(this, "right", 0);

    _defineProperty(this, "bottom", 0);

    _defineProperty(this, "footer", 0);

    _defineProperty(this, "application", {
      bar: {},
      top: {},
      left: {},
      insetFooter: {},
      right: {},
      bottom: {},
      footer: {}
    });
  }

  register(uid, location, size) {
    this.application[location] = {
      [uid]: size
    };
    this.update(location);
  }

  unregister(uid, location) {
    if (this.application[location][uid] == null) return;
    delete this.application[location][uid];
    this.update(location);
  }

  update(location) {
    this[location] = Object.values(this.application[location]).reduce((acc, cur) => acc + cur, 0);
  }

}

_defineProperty(Application, "property", 'application');
//# sourceMappingURL=index.mjs.map
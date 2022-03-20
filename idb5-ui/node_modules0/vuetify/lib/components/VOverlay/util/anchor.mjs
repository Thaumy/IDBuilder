const block = ['top', 'bottom'];
const inline = ['start', 'end'];

/** Parse a raw anchor string into an object */
export function parseAnchor(anchor) {
  let [side, align] = anchor.split(' ');

  if (!align) {
    align = side === 'top' || side === 'bottom' ? 'start' : side === 'start' || side === 'end' ? 'top' : 'center';
  }

  return {
    side,
    align
  };
}
/** Get an anchor directly opposite, with the same alignment */

export function oppositeAnchor(anchor) {
  return {
    side: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      start: 'end',
      end: 'start'
    }[anchor.side],
    align: anchor.align
  };
}
/** Convert start/end into left/right */

export function physicalAnchor(anchor, el) {
  var _map$side, _map$align;

  const {
    side,
    align
  } = anchor;
  const {
    direction
  } = window.getComputedStyle(el);
  const map = direction === 'ltr' ? {
    start: 'left',
    end: 'right'
  } : {
    start: 'right',
    end: 'left'
  };
  return ((_map$side = map[side]) != null ? _map$side : side) + ' ' + ((_map$align = map[align]) != null ? _map$align : align);
}
//# sourceMappingURL=anchor.mjs.map
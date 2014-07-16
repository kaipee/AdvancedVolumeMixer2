// vi: et sw=2 fileencoding=utf8
//

const AVM2 = imports.misc.extensionUtils.getCurrentExtension();
const Lib = AVM2.imports.lib;

const Position = {
  LEFT: 0,
  CENTER: 1,
  RIGHT: 2,
  MENU: 3
};

let gsettings;

function init() {
  gsettings = Lib.getSettings(AVM2);
}

// extension.js
// vi: et sw=2
//
// Advanced Volume Mixer 2
// Control programs' volume from gnome volume mixer applet.
//
// Original Author: Harry Karvonen <harry.karvonen@gmail.com>
// Forked by: Keith Patton <kaipee@kaipee.co.uk>
//

const Main = imports.ui.main;
const Lang = imports.lang;

const AVM2 = imports.misc.extensionUtils.getCurrentExtension();
const Settings = AVM2.imports.settings;
const Panel = AVM2.imports.panel;
const Mixer = AVM2.imports.mixer;

let menu;
let advMixer2;
let orgIndicator;

function init() {
  menu = null;
  advMixer2 = null;
  orgIndicator = null;

  Settings.init();
  Settings.gsettings.connect("changed::", function() {
    disable();
    enable();
  });
}


function enable() {
  advMixer2 = new Mixer.AdvancedVolumeMixer2();

  orgIndicator = Main.panel.statusArea.aggregateMenu._volume;
  orgIndicator._volumeMenu.actor.hide();

  let pos = Settings.gsettings.get_enum("position");

  if (pos <= 2) {
    orgIndicator._primaryIndicator.hide();
    menu = new Panel.AdvancedVolumeMixer2StatusButton(advMixer2);

    if (pos == 0) {
      Main.panel.addToStatusArea("AdvancedVolumeMixer2", menu, 999, 'left');
    } else if (pos == 1) {
      Main.panel.addToStatusArea("AdvancedVolumeMixer2", menu, 999, 'center');
    } else {
      Main.panel.addToStatusArea("AdvancedVolumeMixer2", menu);
    }
  } else {
    advMixer2.separatorLastItem(true);

    orgIndicator.menu.addMenuItem(advMixer2);
  }

}


function disable() {
  if (orgIndicator) {
    orgIndicator._volumeMenu.actor.show();
    orgIndicator._primaryIndicator.show();
    orgIndicator = null;
  }

  if (advMixer2) {
    advMixer2.destroy();
    advMixer2 = null;
  }

  if (menu) {
    menu.destroy();
    menu = null;
  }
}


with import <nixpkgs> { };

let
  libraries = with pkgs; [
    gtk3
    cairo
    glib
    dbus
    webkitgtk
    openssl_3
    gdk-pixbuf
  ];

  packages = with pkgs; [
    dbus
    glib
    gtk3
    libsoup
    webkitgtk
    openssl_3
    pkg-config
    appimagekit
  ];

  corepack = stdenv.mkDerivation {
    name = "corepack";
    buildInputs = with pkgs; [ nodejs-18_x ];
    phases = [ "installPhase" ];
    installPhase = ''
      mkdir -p $out/bin
      corepack enable --install-directory=$out/bin
    '';
  };
in pkgs.mkShell {
  buildInputs = packages ++ [ corepack ];

  shellHook = ''
    export LD_LIBRARY_PATH=${
      pkgs.lib.makeLibraryPath libraries
    }:$LD_LIBRARY_PATH
  '';
}

#!/usr/bin/env sh

main () {
    command -v emulator 1>/dev/null || no_emulator
    if [ $# -lt 1 ]; then usage && exit 1; fi

    clear
    printf "Emulating AVD: %s\n\n" "$1"

    # with acceleration:
    emulator -avd "$1" -accel on -gpu host -verbose -show-kernel #-wipe-data

    # without:
    #emulator -avd "$1" -accel off -gpu swiftshader_indirect -verbose -show-kernel #-wipe-data
}

usage () {
    printf "Usage:\n"
    printf "%s avd_name\n\n" "$0"
    printf "Run:\n"
    printf "emulator -list-avds\n"
    printf "To see what options you have set up\n"
}

no_emulator() {
    printf "Couldn't find the pathname of emulator\n"
    printf "Try adding <pathToYourInstallation>/Android/Sdk/emulator to path\n"

    exit 1
}

main "$@"

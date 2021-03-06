/*
* Copyright (c) 2012, Liferay Inc. All rights reserved.
* Code licensed under the BSD License:
* https://github.com/liferay/alloy-ui/blob/master/LICENSE.txt
*
* @author Eduardo Lundgren <eduardo.lundgren@liferay.com>
*/

exports.COMMAND = {
    options: {},
    shorthands: {},
    description: 'Show help.'
};

// -- Yogi Alloy Header --------------------------------------------------------
var YOGI_ALLOY_PATH = __dirname + '/../../';

var base = require(YOGI_ALLOY_PATH + '/lib/base');

// -- Requires -----------------------------------------------------------------

var path = require('path'),
    clc = require('cli-color'),
    file = base.requireAlloy('lib/file');

// -- Command ------------------------------------------------------------------
exports.run = function(options) {
    var dir = path.resolve(YOGI_ALLOY_PATH, 'lib/cmds'),
        commands = file.find(dir, /\.js$/),
        banner = file.read(YOGI_ALLOY_PATH + 'lib/cmds/assets/help.txt'),
        help = [
            banner,
            '\t\t\t      Welcome to Yogi Alloy!\n',
            'Syntax: yogi alloy [' + clc.red('command') + '] [' + clc.blue('--flags') + ']. List of available commands:'
        ];

    for (var i = 0; i < commands.length; i++) {
        var instance = require(path.join(dir, commands[i])),
            command = path.basename(commands[i], path.extname(commands[i])),
            commandHelp = [],
            knownOptions = Object.keys(instance.COMMAND.options),
            shorthands = Object.keys(instance.COMMAND.shorthands);

        commandHelp.push('  ');
        commandHelp.push(clc.red(command));

        if (knownOptions.length) {
            knownOptions.unshift('');
            commandHelp.push(' [', clc.blue(knownOptions.join(' --')), ' ]');
        }

        commandHelp.push(' ➔ ', instance.COMMAND.description);

        if (shorthands.length) {
            shorthands.unshift('');
            commandHelp.push(' (aliases: [', clc.blue(shorthands.join(' -')), ' ])');
        }

        help.push(commandHelp.join(''));
    }

    console.log(help.join('\n'));
};
const _ = require('lodash');
const lib = require('../lib/achievements_library');
const self = module.exports;

const HELP_TEXT = '!award @player achievement'

exports.config = {
    enabledRoles: ['First Officer', 'Officer', 'Devs']
};

exports.help = {
    name: 'award',
    category: 'Achievements',
    description: 'Awards a player with an achievement.',
    usage: HELP_TEXT + '\n\n' + "Use !achievements to see a list of valid achievents."
};

exports.run = (client, message, args) => {
    
    if (args && args.length == 2) {       

        if (!lib.validatePlayerArg(client, message, args, HELP_TEXT))
            return;

        var achievement = lib.getAchievement(args[1]);

        if (achievement === null) {
            return message.channel.send('I dont know that achievement, try one of these...\n\n' + lib.getAchievementsText());
        }

        let memberId = args[0].replace("<@","").replace(">","").replace("!", "");
        let member = message.guild.members.find((x) => {
            return x.id === memberId;
        });
    
        if (!member) {
            return message.channel.send('Who?! Never heard of them...');
        }

        if (member.id === message.member.user.id) {
            return message.channel.send("Hey! You can't award yourself.");
        }

        var name = member.nickname || member.user.username;
        
        lib.addAchievement(client.db, member.id, name, achievement.id);

        return message.react(`👌`);
    } else {
        message.channel.send('Nope, try again.\n' + HELP_TEXT + '\n\n' + lib.getAchievementsText());
    }
};
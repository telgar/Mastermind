const self = module.exports;

exports.config = {
    enabled: true
};

exports.help = {
    name: 'destroy',
    description: 'Destroy stuff',
    usage: 'destroy [something]'
};

exports.run = (client, message, args) => {
    if (message.member.user.username === 'Paligan') {
        message.channel.send(`No, sorry, have some cake instead.`);
    } else {
        message.channel.send(`Done, ${args[0]} is gone! Are you happy?`);
    }
};

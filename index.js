const { Client, Intents, MessageEmbed } = require('discord.js');
const ua = require('universal-analytics');
require('dotenv').config();

const 봇 = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

봇.once('ready', () => {
    console.log('커~져라! 봇 실행 완료!');
});

봇.on('messageCreate', async 메시지 => {
    const { content: 내용, member: 회원, author: 글쓴이, guild: 길드, channel: 채널 } = 메시지;

    if (내용[0] !== '<') {
        return;
    }

    const 분할배열 = 내용.split('>');

    if (분할배열.length !== 2 || 분할배열[1] !== '') {
        return;
    }

    let 분할내용 = 분할배열[0];

    const 파싱배열 = 분할내용.split(':');

    if (파싱배열.length !== 3) {
        return;
    }

    if (Number.isNaN(Number(파싱배열[2]))) {
        return;
    }

    let 이미지링크 = null;

    if (파싱배열[0] === '<a') {
        이미지링크 = 'https://cdn.discordapp.com/emojis/' + 파싱배열[2] + '.gif?v=1';
    } else {
        이미지링크 = 'https://cdn.discordapp.com/emojis/' + 파싱배열[2] + '.png?v=1';
    }

    const 임베드메시지 = new MessageEmbed();

    임베드메시지.setAuthor({
        name: 회원.nickname ? 회원.nickname : 글쓴이.username,
        iconURL: 회원.avatar ? 회원.avatarURL() : 글쓴이.avatar ? 글쓴이.avatarURL() : 글쓴이.defaultAvatarURL,
    });

    임베드메시지.setColor(회원.displayHexColor);

    임베드메시지.setImage(이미지링크);

    let 처리오류 = null;

    try {
        await Promise.all([
            메시지.delete(),
            채널.send({
                embeds: [임베드메시지],
            }),
        ]);
    } catch (오류) {
        처리오류 = 오류;
    }

    if (process.env.GA_ENABLE !== 'true') {
        return;
    }

    // 구글 애널리틱스 전송
    const 방문자 = ua(process.env.GA_TRACKING_ID, {
        uid: 회원.id,
    });

    방문자
        .screenview('이모지 변환', '커~져라!', process.env.npm_package_version ?? require('./package.json')?.version)
        .event('길드', 길드.id, 길드.name)
        .event('채널', 채널.id, 채널.name)
        .event('이모지', 파싱배열[2], 파싱배열[1])
        .send();

    if (처리오류) {
        방문자.exception(처리오류).send();
    }
});

봇.login(process.env.DISCORD_TOKEN);

# 커~져라! 봇

> 이모티콘한테 커~져라!를 써주는 봇이에요!

디스코드 메시지로 커스텀 이모티콘을 하나만 보내면 커다란 Embed 메시지로 바꿔주는 아주 단순한 봇입니다.

## 초대

[초대 링크](https://discord.com/api/oauth2/authorize?client_id=944208956899856414&permissions=139586889792&scope=bot)를 통해 커~져라! 봇을 초대할 수 있습니다.

## 설치

만약 봇을 직접 실행하고 싶다면 최신 버전의 [Node.js](https://nodejs.org)가 필요합니다. 이후 `npm`을 통해 필요한 종속성을 설치할 수 있습니다.

```bash
npm install
```

디스코드 연동을 위해 환경변수 `DISCORD_TOKEN`를 설정하거나, [`.env.sample`](.env.sample) 파일을 참고하여 `.env` 파일에 디스코드 봇의 토큰을 설정해주세요. 토큰은 [디스코드 개발자 포털](https://discord.com/developers/applications/)에서 어플리케이션을 생성한 후 봇으로 등록할 수 있습니다.

## 실행

```bash
npm run start
```

## 통계

구글 애널리틱스와 연동하여 봇의 사용 통계를 수집하는 기능이 있습니다. 이 기능은 환경변수 `GA_ENABLE`과 `GA_TRACKING_ID`를 통해 활성화할 수 있습니다. Tracking ID에는 UA 태그가 사용됩니다.

## 라이선스

[MIT License](LICENSE)

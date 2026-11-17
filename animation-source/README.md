# Исходники анимированных OBS-баннеров

Remotion-проект генерирует четыре прозрачных WebM-файла:

- `AngelMicro360x90` и `AngelMicro240x60` — micro-баннеры с тремя сценами и усиленными переходами;
- `AngelObs1920x180` и `AngelObs1280x120` — широкие баннеры.

Запуск превью:

```bash
npm install
npm run dev
```

Экспорт рекомендуемого micro-варианта:

```bash
npx remotion render src/index.ts AngelMicro360x90 out.webm --image-format=png --pixel-format=yuva420p --codec=vp9
```

Готовые файлы для OBS уже находятся в каталоге `../banners/`; устанавливать зависимости партнёру не требуется.

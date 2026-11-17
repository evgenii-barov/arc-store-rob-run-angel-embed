# Исходники анимированных OBS-баннеров

Remotion-проект генерирует четыре прозрачных WebM-файла:

- `AngelCompact720x90` и `AngelCompact480x60` — компактные баннеры со сменой текста;
- `AngelObs1920x180` и `AngelObs1280x120` — широкие баннеры.

Запуск превью:

```bash
npm install
npm run dev
```

Экспорт компактного варианта:

```bash
npx remotion render AngelCompact720x90 out.webm --image-format=png --pixel-format=yuva420p --codec=vp9
```

Готовые файлы для OBS уже находятся в каталоге `../banners/`; устанавливать зависимости партнёру не требуется.

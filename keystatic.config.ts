import { config, fields, singleton } from "@keystatic/core";

type TextOptions = {
  description?: string;
  multiline?: boolean;
};

const requiredText = (
  label: string,
  { description, multiline = false }: TextOptions = {},
) =>
  fields.text({
    label,
    description,
    multiline,
    validation: { isRequired: true },
  });

const editableImage = (label: string, description?: string) =>
  fields.image({
    label,
    description,
    directory: "public",
    publicPath: "/",
    validation: { isRequired: true },
  });

const section = (
  key: string,
  label: string,
  schema: Record<
    string,
    | ReturnType<typeof requiredText>
    | ReturnType<typeof editableImage>
    | ReturnType<typeof fields.array>
    | ReturnType<typeof fields.object>
  >,
) =>
  singleton({
    label,
    path: `src/content/sections/${key}`,
    format: { data: "json" },
    schema,
  });

export default config({
  storage: {
    kind: "local",
  },
  locale: "ru-RU",
  singletons: {
    site: section("site", "00. Сайт, шапка и подвал", {
      seoTitle: requiredText("SEO-заголовок", {
        description: "Заголовок вкладки браузера и поисковой выдачи.",
      }),
      seoDescription: requiredText("SEO-описание", {
        multiline: true,
        description: "Краткое описание сайта для поисковых систем.",
      }),
      socialImage: editableImage(
        "Изображение для соцсетей",
        "Используется при публикации ссылки на сайт.",
      ),
      headerLogo: editableImage("Логотип в шапке"),
      footerLogo: editableImage("Логотип в подвале"),
      location: requiredText("Город", {
        description: "Показывается на первом экране и в подвале сайта.",
      }),
      hours: requiredText("Время работы", {
        description:
          "Показывается на первом экране, в контактах и в подвале сайта.",
      }),
      phoneDisplay: requiredText("Телефон — как показывать на сайте"),
      phoneHref: requiredText("Телефон — ссылка", {
        description: "Формат: tel:+79000000000",
      }),
      navServices: requiredText("Меню: услуги"),
      navPrices: requiredText("Меню: цены"),
      navGallery: requiredText("Меню: работы"),
      navReviews: requiredText("Меню: отзывы"),
      navContact: requiredText("Меню: контакты"),
      headerPhoneButton: requiredText("Кнопка телефона в шапке"),
      mobilePhoneButton: requiredText("Кнопка телефона в мобильном меню"),
      stickyPhoneButton: requiredText("Плавающая кнопка на телефоне"),
      footerTagline: requiredText("Текст в подвале"),
      footerBusinessName: requiredText("Название в копирайте"),
    }),

    hero: section("hero", "01. Первый экран", {
      eyebrow: requiredText("Надпись над заголовком"),
      heading: requiredText("Заголовок"),
      paragraph: requiredText("Абзац", { multiline: true }),
      primaryButton: requiredText("Основная кнопка"),
      secondaryButton: requiredText("Вторая кнопка"),
      bookingNote: requiredText("Уточнение о записи"),
      mainImage: editableImage("Главное изображение"),
      secondaryImage: editableImage("Маленькое изображение"),
      floatingNote: requiredText("Надпись на фотографии"),
      tickerItems: fields.array(requiredText("Услуга"), {
        label: "Бегущая строка",
        itemLabel: (props) => props.value || "Новая услуга",
        validation: { length: { min: 1 } },
      }),
    }),

    services: section("services", "02. Услуги", {
      eyebrow: requiredText("Надпись над заголовком"),
      heading: requiredText("Заголовок"),
      paragraph: requiredText("Абзац", { multiline: true }),
      cards: fields.array(
        fields.object({
          title: requiredText("Название карточки"),
          image: editableImage("Изображение"),
          items: fields.array(requiredText("Услуга"), {
            label: "Список услуг",
            itemLabel: (props) => props.value || "Новая услуга",
            validation: { length: { min: 1 } },
          }),
        }),
        {
          label: "Карточки услуг",
          itemLabel: (props) => props.fields.title.value || "Новая карточка",
          validation: { length: { min: 1 } },
        },
      ),
    }),

    beforeAfter: section("before-after", "03. До и после", {
      eyebrow: requiredText("Надпись над заголовком"),
      heading: requiredText("Заголовок"),
      paragraph: requiredText("Абзац", { multiline: true }),
      beforeLabel: requiredText("Подпись на фото «до»"),
      afterLabel: requiredText("Подпись на фото «после»"),
      slides: fields.array(
        fields.object({
          label: requiredText("Название пары", {
            description: "Видно только в редакторе.",
          }),
          beforeImage: editableImage("Фотография до"),
          afterImage: editableImage("Фотография после"),
        }),
        {
          label: "Пары фотографий",
          itemLabel: (props) => props.fields.label.value || "Новая пара",
          validation: { length: { min: 1 } },
        },
      ),
    }),

    benefits: section("benefits", "04. Преимущества", {
      eyebrow: requiredText("Надпись над заголовком"),
      heading: requiredText("Заголовок"),
      items: fields.array(
        fields.object({
          title: requiredText("Заголовок преимущества"),
          paragraph: requiredText("Описание", { multiline: true }),
        }),
        {
          label: "Преимущества",
          itemLabel: (props) =>
            props.fields.title.value || "Новое преимущество",
          validation: { length: { min: 1 } },
        },
      ),
    }),

    pricing: section("pricing", "05. Цены", {
      eyebrow: requiredText("Надпись над заголовком"),
      heading: requiredText("Заголовок"),
      audience: requiredText("Метка над ценой"),
      priceLabel: requiredText("Подпись перед ценой"),
      price: requiredText("Цена"),
      paragraph: requiredText("Абзац", { multiline: true }),
      button: requiredText("Текст кнопки"),
    }),

    gallery: section("gallery", "06. Галерея", {
      eyebrow: requiredText("Надпись над заголовком"),
      heading: requiredText("Заголовок"),
      paragraph: requiredText("Абзац", { multiline: true }),
      images: fields.array(
        fields.object({
          image: editableImage("Фотография"),
        }),
        {
          label: "Фотографии",
          itemLabel: (props) =>
            props.fields.image.value ? "Фотография" : "Новая фотография",
          validation: { length: { min: 1 } },
        },
      ),
    }),

    reviews: section("reviews", "07. Отзывы", {
      eyebrow: requiredText("Надпись над заголовком"),
      heading: requiredText("Заголовок"),
      testimonials: fields.array(
        fields.object({
          quote: requiredText("Отзыв", { multiline: true }),
          author: requiredText("Подпись"),
        }),
        {
          label: "Отзывы",
          itemLabel: (props) => props.fields.author.value || "Новый отзыв",
          validation: { length: { min: 1 } },
        },
      ),
    }),

    process: section("process", "08. Как всё проходит", {
      eyebrow: requiredText("Надпись над заголовком"),
      heading: requiredText("Заголовок"),
      steps: fields.array(
        fields.object({
          title: requiredText("Заголовок шага"),
          paragraph: requiredText("Описание", { multiline: true }),
        }),
        {
          label: "Шаги",
          itemLabel: (props) => props.fields.title.value || "Новый шаг",
          validation: { length: { min: 1, max: 3 } },
        },
      ),
    }),

    faq: section("faq", "09. Вопросы и ответы", {
      eyebrow: requiredText("Надпись над заголовком"),
      heading: requiredText("Заголовок"),
      items: fields.array(
        fields.object({
          question: requiredText("Вопрос"),
          answer: requiredText("Ответ", { multiline: true }),
        }),
        {
          label: "Вопросы",
          itemLabel: (props) => props.fields.question.value || "Новый вопрос",
          validation: { length: { min: 1 } },
        },
      ),
    }),

    contact: section("contact", "10. Контакты", {
      eyebrow: requiredText("Надпись над заголовком"),
      heading: requiredText("Заголовок"),
      paragraph: requiredText("Абзац", { multiline: true }),
      phoneLabel: requiredText("Подпись телефона"),
      addressLabel: requiredText("Подпись адреса"),
      address: requiredText("Адрес", { multiline: true }),
    }),
  },
});

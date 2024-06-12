const DEFAULT_LANGUAGE_CODE =
  navigator.language?.substring(0, 2) ||
  navigator.userLanguage?.substring(0, 2) ||
  "ru-RU";

const LANGUAGE_SELECTOR_BUTTON_SELECTED = "LanguageSelector__language__selected";
const TRANSLATABLE_CONTENTS = {
  "page title": {
    "ru": "Требуется внимание!",
    "en": "Attention Required!"
  },
  "abuse message": {
    "ru": `
<p>
  Сайт, который вы использовали злоупотребляет публичный API сервиса
  «<a href="https://cobalt.tools">кобальт</a>» для получения прибыли
  с рекламы.
</p>

<p>
  Для контекста, разработчики «<a href="https://cobalt.tools">кобальт</a>»
  держится на одни лишь пожертвованиях и спонсорстве с небольшим хостинг-провайдером.
</p>

<p>
  <b>Это просто нечестно!</b>
</p>

<p>
  Мало того, так и они используют не только <a href="https://cobalt.tools">cobalt.tools</a>,
  но и публичные инстанции энтузиастов, в том числе, и <a href="https://co.tskau.team">наш</a>.
</p>

<p>
  <b>Просьба перейти с подобных неблагоприятных сайтов на «<a href="https://cobalt.tools">кобальт</a>»!</b>
</p>
`,
    "en": `
<p>
  The website that you're using is abusing the <a href="https://cobalt.tools">cobalt</a>'s API
  for earning money from the ads.
</p>

<p>
  For context, <a href="https://cobalt.tools">cobalt</a> is surviving
  on donations and sponsorship with their current hosting.
</p>

<p>
  <b>It's just not fair!</b>
</p>

<p>
  Moreover, they use not only <a href="https://cobalt.tools">cobalt.tools</a>,
  but also public community instances, including <a href="https://co.tskau.team">our</a>.
</p>

<p>
  <b>Please don't use such unfavorable sites! Use <a href="https://cobalt.tools">cobalt</a> instead!</b>
</p>
`,
  },
}

function LanguageSelector() {
  const languageSelectorButtons = [...document.getElementsByClassName("LanguageSelector__language")];

  function updateTranslatableElements() {
    const translatableElements = [...document.querySelectorAll('[data-translatable="true"]')];
    translatableElements.map(
      function (translatableElement) {
        const languageCode = localStorage.getItem("language code");
        const translatableElementName = translatableElement.getAttribute("data-translatable-name");

        if (
          TRANSLATABLE_CONTENTS.hasOwnProperty(translatableElementName) &&
          TRANSLATABLE_CONTENTS?.[translatableElementName]?.hasOwnProperty(languageCode)
        ) {
          translatableElement.innerHTML = TRANSLATABLE_CONTENTS[translatableElementName][languageCode];
        }
      }
    )
  }

  languageSelectorButtons.map(
    function (languageSelectorButton) {
      function onLanguageSelectorButtonClick(event) {
        languageSelectorButtons.map(function (languageSelectorButton) {
          if (languageSelectorButton.classList.contains(LANGUAGE_SELECTOR_BUTTON_SELECTED)) {
            languageSelectorButton.classList.remove(LANGUAGE_SELECTOR_BUTTON_SELECTED);
          } else {
            languageSelectorButton.classList.add(LANGUAGE_SELECTOR_BUTTON_SELECTED);
          }
        });

        localStorage.setItem(
          "language code",
          event.target.getAttribute("data-language-code")
        );
        updateTranslatableElements();
      }

      languageSelectorButton.addEventListener("click", onLanguageSelectorButtonClick);
    }
  )

  if (localStorage.getItem("language code") === null) {
    localStorage.setItem("language code", DEFAULT_LANGUAGE_CODE);
  }

  updateTranslatableElements();
}

function DOMContentLoaded() {
  LanguageSelector();
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);

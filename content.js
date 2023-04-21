const IKEA_SELECTORS = {
  PRODUCTS: "pip-product-compact__bottom-wrapper",
  BUTTON_CONTAINER: "pip-product-compact__buttons-container",
  TITLE: "pip-header-section__title--small",
  DESCRIPTION: "pip-header-section__description-text",
};

const PROVIDER = {
  WALLAPOP: "wallapop",
  MILANUNCIOS: "milanuncios",
};

const PROVIDER_CONFIG = {
  [PROVIDER.WALLAPOP]: {
    ICON: "https://es.wallapop.com/images/icons/favicon.ico",
    URL: "https://es.wallapop.com/app/search?keywords=",
  },
  [PROVIDER.MILANUNCIOS]: {
    ICON: "https://scm-milanuncios-frontend-pro.milanuncios.com/statics/images/favicon.ico",
    URL: "https://www.milanuncios.com/anuncios/?s=",
  },
};

const WALLAPOP_ICON = "https://es.wallapop.com/images/icons/favicon.ico";
const MILANUNCIOS_ICON =
  "https://scm-milanuncios-frontend-pro.milanuncios.com/statics/images/favicon.ico";

const createButton = ({ provider, keywords }) => {
  const icon = document.createElement("img");
  icon.src = PROVIDER_CONFIG[provider].ICON;
  icon.style.borderRadius = "50%";
  icon.style.width = "40px";
  icon.style.height = "40px";
  const button = document.createElement("a");
  button.className = `${provider}-button`;
  const url = `${PROVIDER_CONFIG[provider].URL}${keywords}`;
  button.setAttribute("href", url);
  button.setAttribute("target", "_blank");
  button.appendChild(icon);
  button.style.display = "inline";
  button.style.marginRight = "8px";
  return button;
};

const getProductTitle = ({ product, selector }) => {
  return product.getElementsByClassName(selector)[0]?.innerText;
};

const getButtonConatinerElement = ({ product, selector }) => {
  return product.getElementsByClassName(selector)[0];
};

const getProductDescription = ({ product, selector }) => {
  return product
    .getElementsByClassName(selector)[0]
    ?.innerText?.replaceAll(",", "");
};

const setProviderButtonsForIKEAProducts = ({ provider }) => {
  const ikeaProductList = document.getElementsByClassName(
    IKEA_SELECTORS.PRODUCTS
  );
  if (ikeaProductList.length > 0) {
    for (let index = 0; index < ikeaProductList.length; index++) {
      const ikeaProduct = ikeaProductList[index];
      const buttonContainer = getButtonConatinerElement({
        product: ikeaProduct,
        selector: IKEA_SELECTORS.BUTTON_CONTAINER,
      });
      const title = getProductTitle({
        product: ikeaProduct,
        selector: IKEA_SELECTORS.TITLE,
      });
      const description = getProductDescription({
        product: ikeaProduct,
        selector: IKEA_SELECTORS.DESCRIPTION,
      });
      const keywords = `${title} ${description}`;
      const button = createButton({ provider, keywords });
      buttonContainer.appendChild(button);
    }
  }
};

const removeProviderButtonsForIKEAProducts = ({ provider }) => {
  const ikeaProductList = document.getElementsByClassName(
    IKEA_SELECTORS.PRODUCTS
  );
  if (ikeaProductList.length > 0) {
    for (let index = 0; index < ikeaProductList.length; index++) {
      const ikeaProduct = ikeaProductList[index];
      const buttonContainer = getButtonConatinerElement({
        product: ikeaProduct,
        selector: IKEA_SELECTORS.BUTTON_CONTAINER,
      });
      const button = buttonContainer.getElementsByClassName(
        `${provider}-button`
      )[0];
      buttonContainer.removeChild(button);
    }
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.enabled) {
    setProviderButtonsForIKEAProducts({ provider: request.provider });
  } else {
    removeProviderButtonsForIKEAProducts({ provider: request.provider });
  }
});

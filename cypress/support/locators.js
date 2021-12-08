const locators = {
  LOGIN: {
    USER: '[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN_LOGIN: '.btn'
  },
  MENU: {
    SETTINGS: '[data-test=menu-settings]',
    ACCOUNT: '[href="/contas"]'
  },
  ACCOUNT: {
    NAME: '[data-test=nome]',
    BTN_SAVE: '.btn',
    XP_BTN_UPDATE: "//table//td[contains(.,'Account Antonio')]/..//i[@class='far fa-edit']"
  },
  MESSAGE: '.toast-message'
}
export default locators;
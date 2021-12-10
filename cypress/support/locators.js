const locators = {
  LOGIN: {
    USER: '[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN_LOGIN: '.btn'
  },
  MENU: {
    SETTINGS: '[data-test=menu-settings]',
    ACCOUNT: '[href="/contas"]',
    RESET: '[href="/reset"]',
    TRANSACTION: '[data-test= "menu-movimentacao"]'
  },
  ACCOUNT: {
    NAME: '[data-test=nome]',
    BTN_SAVE: '.btn',
    XP_BTN_UPDATE: "//table//td[contains(.,'Account Antonio')]/..//i[@class='far fa-edit']"
  },
  TRANSACTION: {
    DESCRIPTION: '[data-test=descricao]',
    VALUE: '[data-test=valor]',
    RELATED: '[data-test=envolvido]',
    BTN_SAVE: '.btn-primary'
  },
  MESSAGE: '.toast-message'
}
export default locators;
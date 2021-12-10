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
    TRANSACTION: '[data-test= "menu-movimentacao"]',
    LOGOUT: '[href="/logout"]'
  },
  ACCOUNT: {
    NAME: '[data-test=nome]',
    BTN_SAVE: '.btn',
    FN_XP_BTN_UPDATE: accountName => `//table//td[contains(.,'${accountName}')]/..//i[@class='far fa-edit']`,
    FN_XP_BTN_DELETE: accountNameUpdated => `//table//td[contains(.,'${accountNameUpdated}')]/..//i[@class='far fa-trash-alt']`
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
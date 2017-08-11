import { browser, by, element, protractor, $, $$ } from 'protractor';

let globalConfigs = require("../../tix.global-config.json");
let data = require("../../" + globalConfigs.loginUserType + "/resources/tix." + globalConfigs.envName + "-config.json");

export class LoginPage {
  private loginCredentials: any = data.loginCredentials;
  private defaultSpecDelayTime: number = globalConfigs.defaultSpecDelayTime;

  constructor() {
    this.navigateTo();
  }

  navigateTo() {
    browser.ignoreSynchronization = true;
    return browser.driver.get(data.appUrl);
  }

  delayAfterActionForVisibility() {
    return browser.sleep(this.defaultSpecDelayTime);
  }

  getEmailAddressField() {
    return $("#emailAddress");
  }

  getPasswordField() {
    return $("#password");
  }

  setEmailAddress() {
    return this.getEmailAddressField().sendKeys(this.loginCredentials.username).then(() => {
      return this.delayAfterActionForVisibility().then(() => {
          return true;
      });
    });;
  }

  setPassword() {
    return this.getPasswordField().sendKeys(this.loginCredentials.password).then(() => {
      return this.delayAfterActionForVisibility().then(() => {
        return true;
      });
    });
  }

  clickLoginButton() {
    return $("#login-button").click();
  }

  submitLoginForm() {
    return $("form.login-form").submit();
  }

  pressEnterButton() {
    return browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }

  performLoginAction() {
    return this.clickLoginButton().then(() => {
      return $("app-root main").isPresent().then((result) => {
        return result;
      });
    })
  }

}

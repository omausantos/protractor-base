import { browser, by, element, protractor } from 'protractor';
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

/**
  Utilidades para testes e2e
*/
export class UtilsPage {
  public car = 'toyota-corolla-altis-20-flex-16v-aut-2017-azul-flex-0-mcn-16071809';
  /**
  * Adquiri o url de uma página
  *
  * @returns browser url
  */
  getUrl() {
    return browser.getCurrentUrl();
  }

  /**
  * Retorna as classes que o elemento possui
  *
  * @param {el} elemento
  * @param {cls} classe
  *
  * @returns classes do elemento fornecido.
  */
  hasClass(el, cls) {
    return el.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
    });
  }

  /**
   * Converte os preços dos veículos para decimal
   * @param list lista de preços
   * @returns preços convertidos
   */
  convertPrices(list) {
    let current;
    const prices = [];
    for (let i = 2; i < 10; i++) {
      current = list[i].replace('R$ ', '').replace('.', '').replace(',', '.');
      prices.push(+current);
    }
    return prices;
  }

  /**
   * Limpa os prints de um determinado diretório
   * @param directory caminho do diretório
   */
  cleanScreenShots(directory: string) {
    fs.readdir(directory, (err, files) => {
      if (err) {
        throw err;
      }
      for (const file of files) {
        if (file !== '.gitkeep') {
          fs.unlink(path.join(directory, file), erro => {
            if (erro) {
              throw erro;
            }
          });
        }
      }
    });
  }

    /**
  * Espera de tempo de execução
  * @param s tempo em segundos
  */
  sleep(s: number) {
    browser.sleep(s * 1000);
  }

  /**
  * Metodo alternativo para sleep()
  * @param s tempo em segundos
  */
  wait(s: number) {
    browser.sleep(s * 1000);
  }

  /**
   * Recuperar um elemento pela nome da tag
   * @param tagName
   * @returns ElementFinder
   */
  getByTagName(tagName: string) {
    return element(by.tagName(tagName));
  }

  /**
   * Recuperar um elemento pelo id
   * @param id
   * @returns ElementFinder
   */
  getById(id: string) {
    return element(by.id(id));
  }

  /**
   * Move a pagina ate um determinado elemento e retorna o elemento
   */
  moveToElement(id) {
    const elem = element(by.id(id));
    browser.actions().mouseMove(elem).perform();
    return elem;
  }

  /**
   * Move a pagina ate um determinado elemento e retorna o elemento
   */
  moveToElementByClassName(className) {
    const elem = element(by.className(className));
    browser.actions().mouseMove(elem).perform();
    return elem;
  }

  /**
   * Realiza a rolagem da pagina ate o fim
   */
  scrollToEndPage() {
    for (let i = 0; i < 20; i++) {
      browser.actions().sendKeys(protractor.Key.END).perform();
    }
  }

  changeTab(tab) {
    browser.getAllWindowHandles().then(function (handles) {
      const newWindowHandle = handles[tab];
      browser.switchTo().window(newWindowHandle);
    });
    browser.sleep(1000);
  }

  /**
   * Realiza o slide de algum elemento para qualquer posicao na horizontal
   * @param elem elemento a ser movido
   * @param x coordenada x
   * @param y coordenada y
   */
  sliderHorizontal(elem, x, y) {
    browser.actions()
      .mouseDown(elem)
      .mouseMove({ x, y })
      .mouseUp()
      .perform();
  }
}

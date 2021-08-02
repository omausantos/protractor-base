import { browser, by, element } from 'protractor';

import { UtilsPage } from '../utils.po';
const fs = require('fs');

export class HomePage {
  private screenshots = 'e2e/screenshots/home';
  public utils = new UtilsPage();

  navigateTo(device?: string, url?: string) {
    this.utils.changeTab(0);
    if (device === 'desktop') {
      browser
        .manage()
        .window()
        .setSize(1366, 768);
    } else {
      browser.driver
        .manage()
        .window()
        .setSize(540, 960);
    }
    browser.waitForAngularEnabled(false);
    if (url) {
      browser.get('https://www.meucarronovo.com.br/');
    } else {
      browser.get('https://www.meucarronovo.com.br/');
    }
    // browser.sleep(4000);
  }

  /**
   * Captura o diretório para onde será armazenados os screenshots
   */
  getScreenshot() {
    return this.screenshots;
  }

  changeTab(tab){
    this.utils.changeTab(tab);
  }

  /**
   * Recupera o tempo de espera para abrir o modal de sucesso
   */
  getWaitTimeSuccessModal() {
    // browser.sleep(8000);
  }

  /**
   * Escrita abstrata de screenshot para um arquivo
   */
  writeScreenShot(data, filename) {
    const stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
  }

  /**
   * Impressão da interface gráfica
   *
   * @param {string} printname nome do arquivo de imagem
   */
  takeScreenshot(printname: string) {
    browser
      .takeScreenshot()
      .then((png) => this.writeScreenShot(png, `${this.getScreenshot()}/${printname}.png`));
  }

  /**
   * Fechar modal
   *
   * @param {number} index índice do elemento da lista
   */
  fecharModal(index?: number) {
    if (!index) {
      console.log('TESTE 51');
      element
        .all(by.css('div.close.ng-star-inserted'))
        .get(1)
        .click();
    } else {
      console.log('TESTE 52');
      element
        .all(by.css('div.close.ng-star-inserted'))
        .get(index)
        .click();
    }
    // browser.sleep(8000);
  }

  getInputSearchDesktop() {
    return element(by.id('input-busca-palavra-chave-home-desktop'));
  }
}

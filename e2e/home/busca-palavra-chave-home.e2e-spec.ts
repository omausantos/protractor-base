import { browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';

import { UtilsPage } from './../utils.po';
import { HomePage } from './home.po';

const suite = 'busca-palavra-chave-home/';

describe('Busca por palavra-chave a partir da home', () => {
  let page: HomePage;
  let utils: UtilsPage;

  beforeAll(() => {
    utils = new UtilsPage();
    page = new HomePage();
    utils.cleanScreenShots(`${page.getScreenshot()}/${suite}`);
  });

  describe('Desktop', () => {
    it('Deve encontrar o input de busca por palavra-chave', done => {
      page.navigateTo('desktop');
      page.takeScreenshot(`${suite}04_home_palavrachave_busca_desktop`);
      const result = page.getInputSearchDesktop().isPresent();
      expect(result).toBeTruthy();
      done();
    });

    it('Deve buscar pela palavra "ford" e verificar o redirecionamento para a página de busca', async done => {
      page.getInputSearchDesktop().click();
      page.getInputSearchDesktop().sendKeys('ford');
      browser
        .actions()
        .sendKeys(protractor.Key.ENTER)
        .perform();
      // browser.sleep(2000);
      page.takeScreenshot(`${suite}05_home_palavrachave_busca_aplicada_desktop`);
      expect(browser.getCurrentUrl()).toContain('q=ford');
      done();
    });
  });
});

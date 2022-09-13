const puppeteer = require("puppeteer");

//nas proximas duas linhas abaixo estou dizendo até quantas requisições essa api pode ter
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;
//fim
async function start(cidadeAtual, enderecoAtual, cidadeDestino, enderecoDestino) {

  try {
    const browser = await puppeteer.launch({ headless: true, slowMo: 0, args: ['--start-maximized'] }); //CASO NÃO QUEIRA QUE O NAVEGADOR ABRA E SIM RODE EM SILENCIOSO BASTA COLOCAR O headless true
    const page = await browser.newPage();
    const scrape = [];

    let link = 'https://www.google.com/maps/';

    await page.goto(link);

    await page.click('#hArJGc');

    await page.waitForSelector(".tactile-searchbox-input");


    await page.focus(".tactile-searchbox-input");
    await page.waitForTimeout(500)

    await page.keyboard.type(cidadeAtual + ' ' + enderecoAtual, { delay: 10 })
    await page.keyboard.press('Enter', { delay: 100 });
    await page.keyboard.type(cidadeDestino + ' ' + enderecoDestino, { delay: 10 })
    await page.keyboard.press('Enter', { delay: 100 });

    await page.waitForSelector(".ivN21e");
    let element = await page.$('.ivN21e');
    let value = await page.evaluate(el => el.textContent, element)
    await page.click('.yra0jd');

    let dados = {
      distancia: value.substr(43, value.length)
    };
    await browser.close()
    return dados;
  } catch (error) {
    let erro = {};
    erro.mensagem = 'ocorreu um erro ao obter a distância, tente novamente!';
    return erro;
  }


}

module.exports = { start }

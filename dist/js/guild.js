
const minutesToRefreshPage = 30;

class Guild {
  leftElement = document.querySelector('#people .table-body');
  rightElement = document.querySelector('#guild .table-body');

  template;
  minutes;

  constructor(minutes) {
    this.minutes = minutes;
    this.init();
  }

  init = async () => {
    this.getTemplate();
    await this.processAll();
    this.startTimer();
  };

  startTimer = () => {
    setInterval(() => {
      this.processAll();
      console.log('reloading data');
    }, this.minutes * 1000 * 60)
  };

  processAll = async () => {
    const edjers = await this.getEdjers();
    const guilds = await this.getGuilds();

    this.generateRows(edjers, this.leftElement);
    this.generateRows(guilds, this.rightElement);
  };

  getEdjers = async () => {
    const response = await fetch('./json/edjers.json');
    return response.json();
  };

  getGuilds = async () => {
    const response = await fetch('./json/guilds.json');
    return response.json();
  };

  getTemplate = () => {
    this.template = document.querySelector('#row');
  };

  generateRows = (type, element) => {
    element.innerHTML = '';
    type.forEach((item, index) => {
      const position = index + 1;

      const clone = this.template.content.cloneNode(true);
      const tds = clone.querySelectorAll('.table-cell');

      tds[0].textContent = `${ position }. ${ item.name }`;
      tds[1].textContent = item.xp;

      element.appendChild(clone);
    });
  };

}

const guildData = new Guild(minutesToRefreshPage);

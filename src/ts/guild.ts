
const minutesToRefreshPage: number = 30;

interface DataType {
  name: string;
  xp: number;
}

class Guild {
  leftElement: any = document.querySelector('#people .table-body');
  rightElement: any = document.querySelector('#guild .table-body');

  template: any;
  minutes: number;

  constructor(minutes: number) {
    this.minutes = minutes;
    this.init();
  }

  init = async (): Promise<void> => {
    this.getTemplate();
    await this.processAll();
    this.startTimer();
  };

  startTimer = (): void => {
    if (this.minutes !== 0) {
      setInterval(this.handleTimedProcessAll.bind(this), this.minutes * 1000 * 60);
    }
  };

  handleTimedProcessAll = (): void => {
    this.processAll();
    console.log('reloading data');
  };

  processAll = async (): Promise<void> => {
    const edjers: Array<DataType> = await this.getEdjers();
    const guilds: Array<DataType> = await this.getGuilds();

    this.generateRows(edjers, this.leftElement);
    this.generateRows(guilds, this.rightElement);
  };

  getEdjers = async (): Promise<Array<DataType>> => {
    const response: any = await fetch('./json/edjers.json');
    return response.json();
  };

  getGuilds = async (): Promise<Array<DataType>> => {
    const response: any = await fetch('./json/guilds.json');
    return response.json();
  };

  getTemplate = (): void => {
    this.template = document.querySelector('#row');
  };

  generateRows = (type: Array<DataType>, element: any): void => {
    element.innerHTML = '';
    type.forEach((item, index) => {
      const position: number = index + 1;

      const clone: any = this.template.content.cloneNode(true);
      const tds: any = clone.querySelectorAll('.table-cell');

      tds[0].textContent = `${ position }. ${ item.name }`;
      tds[1].textContent = item.xp;

      element.appendChild(clone);
    });
  };

}

const guildData = new Guild(minutesToRefreshPage);

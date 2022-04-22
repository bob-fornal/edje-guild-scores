
const minutesToRefreshPage: number = 30;

interface DataType {
  name: string;
  xp: number;
}

class Guild {
  leftElement: any = document.querySelector('#people .table-body');
  rightElement: any = document.querySelector('#guild .table-body');

  toggle: any = document.querySelector('.toggle-dark-mode');
  body: any = document.querySelector('.body');

  template: any;
  minutes: number;

  constructor(minutes: number, dark: boolean = true) {
    this.minutes = minutes;
    this.init(dark);
  }

  init = async (dark: boolean): Promise<void> => {
    this.toggle.addEventListener('click', this.handleToggleMode.bind(this));
    if (dark === true) {
      this.handleToggleMode();
    }

    this.getTemplate();
    await this.processAll();
    this.startTimer();
  };

  handleToggleMode = () => {
    this.body.classList.toggle('dark');
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
    const response: any = await fetch('./assets/json/edjers.json');
    return response.json();
  };

  getGuilds = async (): Promise<Array<DataType>> => {
    const response: any = await fetch('./assets/json/guilds.json');
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
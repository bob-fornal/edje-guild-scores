const minutesToRefreshPage = 30;
class Guild {
    constructor(minutes) {
        this.leftElement = document.querySelector('#people .table-body');
        this.rightElement = document.querySelector('#guild .table-body');
        this.init = async () => {
            this.getTemplate();
            await this.processAll();
            this.startTimer();
        };
        this.startTimer = () => {
            if (this.minutes !== 0) {
                setInterval(this.handleTimedProcessAll.bind(this), this.minutes * 1000 * 60);
            }
        };
        this.handleTimedProcessAll = () => {
            this.processAll();
            console.log('reloading data');
        };
        this.processAll = async () => {
            const edjers = await this.getEdjers();
            const guilds = await this.getGuilds();
            this.generateRows(edjers, this.leftElement);
            this.generateRows(guilds, this.rightElement);
        };
        this.getEdjers = async () => {
            const response = await fetch('./json/edjers.json');
            return response.json();
        };
        this.getGuilds = async () => {
            const response = await fetch('./json/guilds.json');
            return response.json();
        };
        this.getTemplate = () => {
            this.template = document.querySelector('#row');
        };
        this.generateRows = (type, element) => {
            element.innerHTML = '';
            type.forEach((item, index) => {
                const position = index + 1;
                const clone = this.template.content.cloneNode(true);
                const tds = clone.querySelectorAll('.table-cell');
                tds[0].textContent = `${position}. ${item.name}`;
                tds[1].textContent = item.xp;
                element.appendChild(clone);
            });
        };
        this.minutes = minutes;
        this.init();
    }
}
const guildData = new Guild(minutesToRefreshPage);
//# sourceMappingURL=guild.js.map
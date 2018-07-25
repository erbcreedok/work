import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogged: 0,
        vacancies: [
            {
                id: 0,
                name: 'Бухгалтер',
                company: 'ZARA',
                employment: 'Полная занятость, полный день',
                description: 'За́ра — ведущая торговая сеть группы компаний Inditex, принадлежит испанскому магнату Амансио Ортеге, который также является владельцем таких брендов как Massimo Dutti, Pull and Bear, Oysho, Zara Home, Uterqüe, Stradivarius, Lefties и Bershka.',
                requirements: [
                    'Знания бухгалтерского учета',
                    'Реализация ТМЗ',
                    'Знание нормативных актов и постановлений',
                    'Математический склад ума',
                    'Образование экономическое'
                ],
                salary: '100 000 KZT на руки',
                image: {src: 'https://www.afisha.uz/ui/catalog/2006/09/0090972.jpg'},
                status: 'income'
            },
            {
                id: 1,
                name: 'Менеджер по продажам',
                employment: 'Полная занятость, полный день',
                description: 'Chocolife.me – это крупнейший сервис коллективных покупок в Казахстане, занимающий лидирующую позицию на рынке электронной коммерции',
                requirements: [
                    'Поиск и привлечение новых клиентов (обработка входящих заявок, активный поиск клиентов "в поле", переговоры, заключение договоров).',
                    'Прием и обработка заказов клиентов, оформление необходимых документов.',
                    'Выяснение потребности клиентов в продукции, реализуемой компанией, и согласование заказов с клиентом в соответствии с его потребностями и наличием ассортимента.',
                    'Мотивация клиентов на работу с компанией',
                    'Выполнение ежемесячного плана продаж.',
                    'Ведение отчетности по продажам и отгрузкам клиентам компании.',
                    'Участие в разработке и реализации проектов, связанных с деятельностью отдела продаж.',
                    'Ведение клиентской базы.',
                    'Контроль отгрузки продукции клиентам.',
                    'Контроль оплаты покупателями товаров по заключенным договорам.'
                ],
                salary: 'от 62 000 до 200 000 KZT на руки',
                company: 'Chocolife',
                image: {src: 'https://lh3.googleusercontent.com/0H4TtEK9jlKGGPIfeJS199Siqq1i7COPEOFEDgvarZBvWcDStV4XuV4tfDIhzl3VLgA'},
                status: 'decline'
            },
            {
                id: 2,
                name: 'Руководитель отдела исследований',
                employment: 'Частичная занятость',
                description: 'Chocolife.me – это крупнейший сервис коллективных покупок в Казахстане, занимающий лидирующую позицию на рынке электронной коммерции',
                requirements: [
                    'Наличие управленческого опыта (планирование и контроль, обучение, управления проектами и проектными командами, коммуникационные навыки, предупреждение и решение возникающих трудностей).',
                    'Опыт разработки и внедрения новых продуктов, услуг, разработка бизнес-процессов, инструкций, обучающих материалов.',
                    'Минимум 5 лет опыта работы в маркетинговых и социологических исследованиях.',
                    'Знание количественных и качественных методов исследований.',
                    'Отличное знание статистики и методов статистического анализа данных.',
                    'Отличные навыки работы в SPSS, Excel, MS Office.',
                    'Свободный русский язык.',
                    'Английский язык - не ниже intermediate.'
                ],
                salary: 'з/п не указана',
                company: 'RahmetApp',
                image: {src: 'https://is3-ssl.mzstatic.com/image/thumb/Purple115/v4/f9/e0/72/f9e07219-d121-63c8-41e4-6f50a96eb515/AppIcon-1x_U007emarketing-85-220-0-9.png/246x0w.jpg'},
                status: 'income'
            },
            {
                id: 3,
                name: 'Дизайнер',
                employment: 'Вне штата',
                description: 'Привет, это Automato.<br/>Мы занимаемся автоматизацией, созданием  чат-ботов и сложных SaaS продуктов.',
                requirements: [
                    'Наличие управленческого опыта (планирование и контроль, обучение, управления проектами и проектными командами, коммуникационные навыки, предупреждение и решение возникающих трудностей).',
                    'Опыт разработки и внедрения новых продуктов, услуг, разработка бизнес-процессов, инструкций, обучающих материалов.',
                    'Минимум 5 лет опыта работы в маркетинговых и социологических исследованиях.',
                    'Знание количественных и качественных методов исследований.',
                    'Отличное знание статистики и методов статистического анализа данных.',
                    'Отличные навыки работы в SPSS, Excel, MS Office.',
                    'Свободный русский язык.',
                    'Английский язык - не ниже intermediate.'
                ],
                salary: 'от 100 000 до 150 000 KZT до вычета НДФЛ',
                company: 'Automato',
                image: {src: 'https://miro.medium.com/fit/c/240/240/0*CbyZvfqlbjX6Ap64.'},
                status: 'outcome'
            },
            {
                id: 4,
                name: 'Frontend-разработчик',
                employment: 'Проектная работа',
                description: 'Мы будем рады принять в наши ряды уверенного в себе, профессионального, стремящегося к развитию разработчика. Мы предлагаем интересные, масштабные и амбициозные проекты, участие в создании нового качественного продукта. Обеспечим благодатную почву для профессионального роста, творческую атмосферу, официальное трудоустройство, конкурентную заработную плату.',
                requirements: [
                    'Опыт разработки веб-сайтов (от 1 года), плюсом будет опыт дизайна и верстки шаблонов.',
                    'Знакомство с HTML5 / CSS3 / JavaScript, VueJS, Bootstrap 3+, Typescript',
                    'Аналитика, решение проблем, навыки отладки',
                    'Опыт разработки программного обеспечения в объектно-ориентированном дизайне и применение свободно связанных распределенных шаблонов проектирования для реализации веб-приложений среднего и большого размера.',
                    'Единичные и интеграционные тесты. Опыт работы с модулями тестирования веб-приложений, такими как Jasmine.',
                    'Опыт работы с командой в agile/scrum, желательно с использованием JIRA',
                    'Прочное понимание процесса разработки программного обеспечения и опыта работы с гибкими командами'
                ],
                salary: 'з/п не указана',
                company: 'Automato',
                image: {src: 'https://miro.medium.com/fit/c/240/240/0*CbyZvfqlbjX6Ap64.'},
                status: 'accept'
            }
        ],
        people: [
            {
                id: 1,
                name: 'Куаныш Муратов',
                speciality: 'Студент химиобиологической специальности в КазНУ',
                vacancy: 'Стажер в управленческий отдел',
                rating: 4.5,
                age: 18,
                phone: '+7 778 514 2322',
                image: {src: 'https://scontent.fala4-2.fna.fbcdn.net/v/t1.0-9/17103293_686626968129257_6735589228095713087_n.jpg?_nc_cat=0&oh=b3725a92544bda4480f8733219c5f892&oe=5BCF1580'},
                mail: 'kuanysh@gmail.com',
                city: 'Астана',
                status: 'income'
            },
            {
                id: 2,
                name: 'Асанали Исатаев',
                speciality: 'Студент Информационных систем специальности в СДУ',
                vacancy: 'Младший дизайнер',
                rating: 4,
                age: 21,
                phone: '+7 701 261 8888',
                image: {src: 'https://scontent.fala4-2.fna.fbcdn.net/v/t1.0-9/22007982_1473247702755578_7010180047694862437_n.jpg?_nc_cat=0&oh=801240848fb3c3b0682a519bd684f388&oe=5C0B8F15'},
                mail: 'asanmaris@gmail.com',
                city: 'Караганды',
                status: 'decline'
            },
            {
                id: 3,
                name: 'Ербол Сыздык',
                speciality: 'Студент Информационных систем специальности в СДУ',
                vacancy: 'Junior Web Developer',
                rating: 3.5,
                age: 21,
                phone: '+7 702 111 3438',
                image: {src: 'https://scontent.fala4-2.fna.fbcdn.net/v/t1.0-9/21766327_119209428788076_5067904842476129464_n.jpg?_nc_cat=0&oh=6ab2db7ca36a89094637dcc6684063d5&oe=5BD3E1A8'},
                mail: 'erbolsyzdyq@gmail.com',
                city: 'Астана',
                status: 'income'
            },
            {
                id: 4,
                name: 'Айгерим Саду',
                speciality: 'Студент специальности экономических наук в МУИТ',
                vacancy: 'Финансист',
                rating: 3.5,
                age: 21,
                phone: '+7 708 777 2200',
                image: {src: 'https://scontent.fala4-2.fna.fbcdn.net/v/t1.0-9/29177057_835003203291218_116790206706745344_o.jpg?_nc_cat=0&oh=eceb816157030810f56ce425dfaa26b2&oe=5BD1E951'},
                mail: 'kokshai@gmail.com',
                city: 'Алматы',
                status: 'income'
            },
        ]

    },
    getters: {
        incomeVacancies: state => {
            return state.vacancies.filter(v => v.status === 'income')
        },
        outcomeVacancies: state => {
            return state.vacancies.filter(v => v.status === 'outcome')
        },
        acceptedVacancies: state => {
            return state.vacancies.filter(v => v.status === 'accept')
        },
        declinedVacancies: state => {
            return state.vacancies.filter(v => v.status === 'decline')
        },
        getVacancyById: (state) => (id) => {
            return state.vacancies.find(v => v.id === id)
        },
        incomePeople: state => {
            return state.people.filter(v => v.status === 'income')
        },
        outcomePeople: state => {
            return state.people.filter(v => v.status === 'outcome')
        },
        acceptedPeople: state => {
            return state.people.filter(v => v.status === 'accept')
        },
        declinedPeople: state => {
            return state.people.filter(v => v.status === 'decline')
        },
        getPersonById: (state) => (id) => {
            return state.people.find(v => v.id === id)
        }
    },
    mutations: {
        logout() {
            this.state.isLogged = 0;
            localStorage.setItem('isLogged', 0)
            localStorage.removeItem('vacancies')
            localStorage.removeItem('people')
        },
        loginClient() {
            this.state.isLogged = 1;
            localStorage.setItem('isLogged', 1)
        },
        loginCompany() {
            this.state.isLogged = 2;
            localStorage.setItem('isLogged', 2)
        },
        setLogged(state, val) {
            this.state.isLogged = val;
            localStorage.setItem('isLogged', val)
        },
        setVacancyStatus(state, payload) {
            this.state.vacancies.find(v => v.id === payload.id).status = payload.val
            localStorage.setItem('vacancies', JSON.stringify(this.state.vacancies))
        },
        setVacancies(state, payload) {
            this.state.vacancies = payload
        },
        setPersonStatus(state, payload) {
            this.state.people.find(v => v.id === payload.id).status = payload.val
            localStorage.setItem('people', JSON.stringify(this.state.people))
        },
        setPeople(state, payload) {
            this.state.people = payload
        }
    },
    actions: {

    }
})

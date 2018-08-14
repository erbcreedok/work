import {SET_VACANCY_STATUS, SET_VACANCIES, CREATE_VACANCY} from '../mutation-types'
import api from '../api/main'
import {GET_ALL_VACANCIES, GET_OWN_VACANCIES, MERGE_VACANCIES} from "../types/vacancies";

const state = {
    mock: [
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
    all: {},
    list: []
}


const getters = {
    incomeVacancies: state => {
        return state.mock.filter(v => v.status === 'income')
    },
    outcomeVacancies: state => {
        return state.mock.filter(v => v.status === 'outcome')
    },
    acceptedVacancies: state => {
        return state.mock.filter(v => v.status === 'accept')
    },
    declinedVacancies: state => {
        return state.mock.filter(v => v.status === 'decline')
    },
    getVacancyById: (state) => (id) => {
        return state.mock.find(v => v.id === id)
    },
    [GET_OWN_VACANCIES]: (state, getters, rootState) => {
        const companyId = rootState.companyProfile.profile.id
        return state.list.filter(v => {
            console.log(v.vacancyName, companyId)
            return v.companyId === companyId
        }).sort((a, b) => a.order - b.order)
    },
    [GET_ALL_VACANCIES]: state => state.list.sort((a, b) => a.order - b.order)
}

const mutations = {
    [SET_VACANCY_STATUS] (state, payload) {
        state.find(v => v.id === payload.id).status = payload.val
        localStorage.setItem('vacancies', JSON.stringify(state))
    },
    [SET_VACANCIES](state, payload) {
        state = payload
    },
    [MERGE_VACANCIES](state, payload) {
        payload.forEach(i => {
            i.id = i._id || i.id
            delete i._id
            state.all[i.id] = i
        })
        state.list = Object.values(state.all)
    }
}
const actions = {
    [CREATE_VACANCY]: (_, payload) => new Promise((resolve, reject) => {
        return api.post('/company/vacancy/', payload)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    }),
    [GET_ALL_VACANCIES]: ({commit}) => new Promise((resolve, reject) => {
        return api.post('vacancy/0/200')
            .then(res => {
                const vacancies = res.data.map((i, index) => { i.order = index; return i })
                commit(MERGE_VACANCIES, vacancies)
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    }),
    [GET_OWN_VACANCIES]: ({commit}) => new Promise((resolve, reject) => {
        return api.post('vacancy/0/200')
            .then(res => {
                const vacancies = res.data.map((i, index) => { i.order = index; return i })
                commit(MERGE_VACANCIES, vacancies)
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
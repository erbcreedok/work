import { SET_PERSON_STATUS, SET_PEOPLE } from '../mutation-types'


const state = [
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

const getters = {
    incomePeople: state => {
        return state.filter(v => v.status === 'income')
    },
    outcomePeople: state => {
        return state.filter(v => v.status === 'outcome')
    },
    acceptedPeople: state => {
        return state.filter(v => v.status === 'accept')
    },
    declinedPeople: state => {
        return state.filter(v => v.status === 'decline')
    },
    getPersonById: (state) => (id) => {
        return state.find(v => v.id === id)
    }
}

const mutations = {
    [SET_PERSON_STATUS](state, payload) {
        state.find(v => v.id === payload.id).status = payload.val
        localStorage.setItem('people', JSON.stringify(state))
    },
    [SET_PEOPLE](state, payload) {
        state = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}
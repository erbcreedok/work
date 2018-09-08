import Vue from 'vue'
import Vuex from 'vuex'
import api, {baseURL} from './api/main'
import vacancies from './modules/vacancies'
import people from './modules/people'
import auth from "./modules/auth";
import profile from "./modules/profile";
import userProfile from "./modules/userProfile";
import companyProfile from "./modules/companyProfile";
import companies from "./modules/companies";
import applications from "./modules/applications";
import students from "./modules/students";
import {GET_COMPANY_APPLICATIONS} from "./mutation-types";
import {
    APPLICATIONS, APPLICATIONS_ERROR, APPLICATIONS_REQUEST, APPLICATIONS_SUCCESS,
    MERGE_APPLICATIONS
} from "./types/applications";
import {
    MERGE_VACANCIES, SET_LOADED_VACANCY, VACANCIES, VACANCY_ERROR, VACANCY_REQUEST,
    VACANCY_SUCCESS
} from "./types/vacancies";
import {MERGE_STUDENTS, STUDENT_ERROR, STUDENT_REQUEST, STUDENT_SUCCESS, STUDENTS} from "./types/students";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogged: 0,
    },
    getters: {
    },
    mutations: {
        logout(state) {
            state.isLogged = 0;
            localStorage.setItem('isLogged', 0)
            localStorage.removeItem('vacancies')
            localStorage.removeItem('people')
        },
        loginClient(state) {
            state.isLogged = 1;
            localStorage.setItem('isLogged', 1)
        },
        loginCompany(state) {
            state.isLogged = 2;
            localStorage.setItem('isLogged', 2)
        },
        setLogged(state, val) {
            state.isLogged = val;
            localStorage.setItem('isLogged', val)
        },
    },
    actions: {
        [GET_COMPANY_APPLICATIONS]: ({commit}) => {
            commit(APPLICATIONS + APPLICATIONS_REQUEST)
            commit(VACANCIES + VACANCY_REQUEST)
            commit(STUDENTS + STUDENT_REQUEST)
            console.log('start')
            api.get('/company/vacancy/getApplications')
                .then(res => {
                    const applications = res.data.applications.map((i, index) => {
                        i.order = index;
                        return i })
                    const students = res.data.students.map((i, index) => {
                        i.order = index;
                        i.image = baseURL + '/student/image-avatar/' + i._id + '.png';
                        return i })
                    const vacancies = res.data.vacancies.map((i, index) => {
                        i.order = index
                        i.status = 0
                        return i
                    })
                    console.log('applications', JSON.parse(JSON.stringify(applications)))
                    console.log('students', JSON.parse(JSON.stringify(students)))
                    console.log('vacancies', JSON.parse(JSON.stringify(vacancies)))
                    commit(VACANCIES + MERGE_VACANCIES, vacancies)
                    commit(VACANCIES + SET_LOADED_VACANCY, vacancies)
                    commit(VACANCIES + VACANCY_SUCCESS)
                    commit(STUDENTS + MERGE_STUDENTS, students)
                    commit(STUDENTS + STUDENT_SUCCESS)
                    commit(APPLICATIONS + MERGE_APPLICATIONS, applications)
                    commit(APPLICATIONS + APPLICATIONS_SUCCESS)
                })
                .catch(err => {
                    console.log(err)
                    commit(STUDENTS + STUDENT_ERROR)
                    commit(VACANCIES + VACANCY_ERROR)
                    commit(APPLICATIONS + APPLICATIONS_ERROR)
                })
        }
    },
    modules: {
        auth,
        vacancies,
        people,
        profile,
        userProfile,
        companyProfile,
        companies,
        students,
        applications
    },
})
export default store

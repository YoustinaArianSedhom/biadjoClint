/*=========================================================================================
  File Name: modulecourseClassMutations.js
  Description: courseClass Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default {
    // ADD_COUNTRY(state, item) {
    //     state.Country.unshift(item)
    // },

    SET_COUNTRY(state, country) {

        state.Country = country
    },

    
    
    // SET_ALLCOUNTRY(state, allCountry) {

    //     state.AllCountries = allCountry
    // },

    // UPDATE_COUNTRY(state, item) {
    //     const Index = state.Country.findIndex((p) => p.Id == item.Id)
    //     Object.assign(state.Country[Index], item)
    // },
    //   REMOVE_ITEM(state, itemId) {
    //       const ItemIndex = state.courseClass.findIndex((p) => p.ID == itemId)
    //       state.courseClass.splice(ItemIndex, 1)
    //   },

    //   SET_courseClassInstructor(state, CourseClassInstructors) {
    //     state.CourseClassInstructors = CourseClassInstructors
    //   },
    //   ADD_courseClassInstructor(state, item) {
    //     
    //     state.courseClassInstructors.unshift(item)
    //   },
    //   REMOVE_courseClassInstructor(state, index) {
    //     
    //     state.CourseClassInstructors.splice(index, 1)
    //    },
    //    SET_courseClassSession(state, courseClassSessions) { 
    //     state.courseClassSessions = courseClassSessions
    //   },
    //   ADD_courseClassSession(state, item) {
    //     
    //     state.courseClassSessions.unshift(item)
    //   },
    //   REMOVE_courseClassSession(state, index) {
    //     
    //     state.courseClassSessions.splice(index, 1)
    //    },
    //    SET_CourseClassModel(state,data) {
    //      
    //     // state.courseClass=data
    //     state.courseClassSessions = data.CourseClassSessions
    //     state.courseClassInstructors = data.CourseClassInstructors
    //   },
}
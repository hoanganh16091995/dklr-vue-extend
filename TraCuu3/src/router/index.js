import Vue from 'vue'
import Router from 'vue-router'
import HomeDataTable from '@/components/Home_data_table.vue'
// import Home from '@/components/Home.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: HomeDataTable,
      children: [
        // {
        //   path: '/tra-cuu',
        //   component: HomeDataTable,
        //   props: true
        // },
        {
          path: '/:codeTable',
          component: HomeDataTable,
          props: true
        }
      ],
      props: true
    }
  ]
})

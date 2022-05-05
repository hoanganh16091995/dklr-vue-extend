import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Report from '@/components/Report.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/bao-cao',
          component: Report,
          props: true
        },
        {
          path: '/bao-cao/:rptCode',
          component: Report,
          props: true
        },
        {
          path: '/bao-cao/:rptCode/:rptCodeChild',
          component: Report,
          props: true
        }
      ],
      props: true
    }
  ]
})

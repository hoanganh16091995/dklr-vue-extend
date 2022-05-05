<template>
  <div>
    <!-- <v-navigation-drawer absolute clipped floating width="350" style="overflow: auto;">
      <jx-filter-left
				ref="filterleft"
			>
			</jx-filter-left>
    </v-navigation-drawer> -->
    
    <div style="width: 100%; background: #fff;">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
// import FilterLeft from '@/components/NavigationDrawer.vue'
import supportData from '../store/support_data.json'
// import axios from 'axios'

export default {
  props: {},
  components: {
    // 'jx-filter-left': FilterLeft
  },
  data: () => ({
    docTypes: [],
    roleFilterStatus: [],
    initData: null,
    counterHoSoAll: '',
    counterHoSoKeHoachTable: '',
    counterHoSoThuTucTable: '',
    cang_vu_name: '',
    tau_den_rois: [],
    quoc_tichs: supportData.data_state,
    khu_cuc_cangs: [],
    cang_den_tiep_theos: [],
    callBack: true,
    getFilterADVDataAPI: ''
  }),
  beforeCreate () {
    var vm = this
    vm.$nextTick(function () {
      vm.$store.dispatch('loadInitResource').then(function (result) {
      })
    })
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
    })
  },
  updated () {
    let vm = this
    vm.$nextTick(function () {
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
    }
  },
  methods: {
  }
}
</script>

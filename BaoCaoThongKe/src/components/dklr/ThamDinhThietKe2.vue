<template>
    <div>
      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Tên CS thiết kế</label>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            placeholder="Nhập tên cs thiết kế"
            v-model="adv['applicantName']"
            class="mx-0 my-0 px-0 py-0"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Mã cơ sở thiết kế</label>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            placeholder="Nhập mã cs thiết kế"
            v-model="adv['applicantNo']"
            class="mx-0 my-0 px-0 py-0"
          ></v-text-field>
        </v-flex>
      </v-layout>
      
      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày nộp hồ sơ  (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierSendingDateFrom']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierSendingDateTo']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày tiếp nhận hs (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierSubmittingDateFrom']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierSubmittingDateTo']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày phân công (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierFirstAssignmentDateFrom']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierFirstAssignmentDateTo']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày YCBS lần đầu (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierFirstUpdatingDateFrom']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierFirstUpdatingDateTo']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày khách hàng BS lần cuối (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierEndorsementDateFrom']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierEndorsementDateTo']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày bắt đầu thẩm định (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierFirstVerificationDateFrom']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierFirstVerificationDateTo']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày kết thúc thẩm định (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierLastVerificationDateFrom']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierLastVerificationDateTo']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày ký GCN (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['verificationCertificateDateFrom']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['verificationCertificateDateTo']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày xác nhận thu phí (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierPaymentDateFrom']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierPaymentDateTo']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
      </v-layout>

    </div>
</template>
<script>
  import DatePicker from '@/components/dklr/DatePicker.vue'
  export default {
    props: {
      adv: {}
    },
    components: {
      'date-time': DatePicker
    },
    data: () => {
      return {
        menu1: false,
        createDateFomated: '',
        nhomBC: {},
        nhomBcItems: [],
        mauBC: {},
        mauBcItems: []
      }
    },
    created () {
      let vm = this
      vm.$nextTick(function () {
        vm.loadNhomBc()
      })
    },
    watch: {
      'nhomBC': function (val) {
        let vm = this
        vm.loadMauBC(val['rptCode'])
      }
    },
    methods: {
      loadNhomBc () {
        let vm = this
        let param = {
        }
        vm.$store.dispatch('loadNhomBC', param).then(result => {
          vm.nhomBcItems = result['data'] || []
        })
      },
      loadMauBC (rptGroup) {
        let vm = this
        let param = {
          rptGroup: rptGroup
        }
        vm.$store.dispatch('loadMauBC', param).then(result => {
          vm.mauBcItems = result['data'] || []
        })
      },
      boLoc () {
      },
      xuatPDF () {
      },
      xuatExcel () {
      }
    }
  }
</script>
<style>
.row-header{
    background-color: #e1e2e1;
    width: 100%;
}
.btn-filter {
    width: 30%!important;
    height: 24px!important;
    font-size: 9px!important;
}
.lable-report{
    font-size: 13px;
    font-weight: bold;
}
/* fix css vuetify */
.v-text-field {
    padding-top: 0px!important;
    margin-top: 0px!important;
}
.v-text-field__details{
    display: none!important;
}
</style>

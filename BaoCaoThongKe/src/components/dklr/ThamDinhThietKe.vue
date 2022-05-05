<template>
    <div>
      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Tên CS thiết kế</label>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            v-model="adv['applicantName']"
            class="mx-0 my-0 px-0 py-0"
            placeholder="Nhập tên cs thiết kế"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Mã CS thiết kế</label>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            v-model="adv['applicantNo']"
            class="mx-0 my-0 px-0 py-0"
            placeholder="Nhập mã cs thiết kế"
          ></v-text-field>
        </v-flex>
      </v-layout>


      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Loại phương tiện</label>
        </v-flex>
        <v-flex xs12 sm12>
          <v-autocomplete
            v-model="adv['certifiedVehicleTypeDescription']"
            :items="loaiPTItems"
            item-text="rptName"
            item-value="rptCode"
            placeholder="Chọn loại PT"
            >
          </v-autocomplete>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Mã phương tiện</label>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            v-model="adv['certifiedVehicleType']"
            class="mx-0 my-0 px-0 py-0"
            placeholder="Nhập mã phương tiện"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Tên nhãn hiệu </label>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            v-model="adv['certifiedTrademarkName']"
            class="mx-0 my-0 px-0 py-0"
            placeholder="Nhập tên nhãn hiệu"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Mã nhãn hiệu</label>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            v-model="adv['certifiedTrademark']"
            class="mx-0 my-0 px-0 py-0"
            placeholder="Nhập mã nhãn hiệu"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="pb-2">
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Khối lượng bản thân</label>
        </v-flex>
        <v-flex xs12 sm12>
          <v-layout row wrap>
            <v-flex xs12 sm6 class="pr-2">
              <v-text-field
              v-model="adv['from']"
              class="mx-0 my-0 px-0 py-0"
              placeholder="Từ"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
              placeholder="Đến"
              v-model="adv['to']"
              class="mx-0 my-0 px-0 py-0"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="pb-2">
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày nhận hồ sơ (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6 class="pr-2">
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

      <v-layout row wrap class="pb-2">
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

      <v-layout row wrap class="pb-2">
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày y/c bổ sung lần đầu (từ - đến)</label>
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

      <v-layout row wrap class="pb-2">
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày chuyển tổ trưởng (từ - đến)</label>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <date-time
          v-model="adv['dossierFirstReviewDateFrom']"
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
          v-model="adv['dossierFirstReviewDateTo']"
          :first-day="1"
          :show-dst="false"
          :show-hours="true"
          :show-minutes="true"
          :show-seconds="false"
          class="input_last py 0 px 0"
          ></date-time>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="pb-2">
        <v-flex xs12 sm12>
          <label for="" class="lable-report">Ngày ký (từ - đến)</label>
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
          <label for="" class="lable-report">Số GCN</label>
        </v-flex>
        <v-flex xs12 sm12>
          <v-text-field
            v-model="adv['verificationCertificateNo']"
            class="mx-0 my-0 px-0 py-0"
            placeholder="Nhập số GCN"
          ></v-text-field>
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
        loaiPTItems: [],
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
        vm.loadLoaiPT()
      })
    },
    watch: {
      'nhomBC': function (val) {
        let vm = this
        vm.loadMauBC(val['rptCode'])
      }
    },
    methods: {
      loadLoaiPT () {
        let vm = this
        let param = {
          code: 'VR02'
        }
        vm.$store.dispatch('loadLoaiPT', param).then(result => {
          vm.loaiPTItems = result['data'] || []
        })
      },
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

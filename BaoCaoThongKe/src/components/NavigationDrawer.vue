<template>
  <div
    style="
      width: 100%;
      position: relative;
      border-right: 1px solid rgb(204, 204, 204);
      height: 100%;
      background: #fff;
    "
  >
    <div
      class="row-header"
      style="
        height: 38px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 14px;
      "
    >
      <v-btn class="btn-filter" rounded small color="primary" @click="boLoc"
        >Bỏ lọc</v-btn
      >
      <v-btn class="btn-filter" rounded small color="primary" @click="xuatPDF"
        >Xuất PDF</v-btn
      >
      <v-btn class="btn-filter" rounded small color="primary" @click="xuatExcel"
        >Xuất Excel</v-btn
      >
    </div>
    <v-layout wrap style="padding: 10px">
      <v-flex xs12 sm6>
        <v-layout row wrap align-center>
          <v-flex xs12 sm3>
            <label for="" class="lable-report">Nhóm báo cáo</label>
          </v-flex>
          <v-flex xs12 sm9>
            <v-select
              placeholder="Chọn nhóm báo cáo"
              autocomplete
              return-object
              v-model="nhomBC"
              :items="nhomBcItems"
              item-text="rptName"
              item-value="rptCode"
            >
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout wrap row align-center>
          <v-flex xs12 sm3>
            <label for="" class="lable-report">Mẫu báo cáo</label>
          </v-flex>
          <v-flex xs12 sm9>
            <v-select
              placeholder="Chọn mẫu báo cáo"
              autocomplete
              v-model="mauBC"
              return-object
              :items="mauBcItems"
              item-text="rptName"
              item-value="rptCode"
            >
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout align-center>
              <v-flex xs3>
                <label for="" class="lable-report">Người tạo</label>
              </v-flex>
              <v-flex xs9>
                <v-text-field></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout align-center>
              <v-flex xs3>
                <label for="" class="lable-report">Ngày tạo</label>
              </v-flex>
              <v-flex xs9>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="createDateFomated"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      @blur="date = parseDate(createDateFomated)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="createDate"
                    no-title
                    @input="menu1 = false"
                    locale="vn"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 sm6>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout wrap>
              <v-flex xs4>
                <v-select
                  style="margin-top: 10px; margin-bottom: 10px"
                  :items="items"
                  outlined
                  v-model="thongKeTheo"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 v-if="thongKeTheo === 'Ngày'">
            <v-layout row wrap>
              <v-flex xs3><label for="">Từ ngày:</label></v-flex>
              <v-flex xs9 class="ngay-bao-cao">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="fromDateFomated"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fromDate"
                    no-title
                    @input="
                      parseDate2('fromDateFomated', fromDate);
                      menu2 = false;
                    "
                    locale="vn"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 v-if="thongKeTheo === 'Ngày'">
            <v-layout row wrap>
              <v-flex xs3><label for="">Đến ngày:</label></v-flex>
              <v-flex xs9 class="ngay-bao-cao">
                <v-menu
                  ref="menu3"
                  v-model="menu3"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="toDateFomated"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="toDate"
                    no-title
                    @input="
                      parseDate2('toDateFomated', toDate);
                      menu3 = false;
                    "
                    locale="vn"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 v-if="thongKeTheo === 'Tháng'">
            <v-layout row wrap>
              <v-flex xs3><label for="">Tháng:</label></v-flex>
              <v-flex xs9 class="ngay-bao-cao">
                <v-menu
                  ref="menu"
                  v-model="menuThang"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="month"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="month"
                    type="month"
                    no-title
                    scrollable
                    locale="vn"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuThang = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.menu.save(month)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 v-if="thongKeTheo === 'Năm'">
            <v-layout row wrap>
              <v-flex xs3><label for="">Năm:</label></v-flex>
              <v-flex xs9>
                <v-autocomplete
                  v-model="selectNam"
                  :items="nam"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 v-if="thongKeTheo === 'Ngày giờ'">
            <v-layout row wrap>
              <v-flex xs3><label for="">Từ ngày:</label></v-flex>
              <v-flex xs9>
                <datetime-picker
                  v-model="fromDateTime"
                  :first-day="1"
                  :show-dst="false"
                  :show-hours="true"
                  :show-minutes="true"
                  :show-seconds="false"
                ></datetime-picker>
              </v-flex>
            </v-layout>
          </v-flex>
          <br />
          <br />
          <v-flex xs12 v-if="thongKeTheo === 'Ngày giờ'">
            <v-layout row wrap>
              <v-flex xs3><label for="">Đến ngày:</label></v-flex>
              <v-flex xs9>
                <datetime-picker
                  v-model="toDateTime"
                  :first-day="1"
                  :show-dst="false"
                  :show-hours="true"
                  :show-minutes="true"
                  :show-seconds="false"
                ></datetime-picker>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- <v-flex xs12 sm12>
              <tham-dinh-thiet-ke :adv="adv"></tham-dinh-thiet-ke>
            </v-flex> -->

      <!-- <v-flex xs12 sm12>
              <tham-dinh-thiet-ke-2 :adv="adv"></tham-dinh-thiet-ke-2>
            </v-flex>

            <v-flex xs12 sm12>
              <tham-dinh-thiet-ke-3 :adv="adv"></tham-dinh-thiet-ke-3>
            </v-flex>

            <v-flex xs12 sm12>
              <tham-dinh-thiet-ke-4 :adv="adv"></tham-dinh-thiet-ke-4>
            </v-flex>

            <v-flex xs12 sm12>
              <tham-dinh-thiet-ke-5 :adv="adv"></tham-dinh-thiet-ke-5>
            </v-flex> -->
      <!-- <v-flex xs12>
                <v-layout align-center>
                    <v-flex xs3>
                        <label for="" class="lable-report">Người tạo</label>
                    </v-flex>
                    <v-flex xs9>
                        <v-text-field></v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12>
                <v-layout align-center>
                    <v-flex xs3>
                        <label for="" class="lable-report">Ngày tạo</label>
                    </v-flex>
                    <v-flex xs9>
                        <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="createDateFomated"
                                hint="MM/DD/YYYY format"
                                persistent-hint
                                @blur="date = parseDate(createDateFomated)"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="createDate" no-title @input="menu1 = false" locale="vn"></v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
            </v-flex> -->
    </v-layout>
  </div>
</template>
<script>
import ThamDinhThietKe from "@/components/dklr/ThamDinhThietKe.vue";
import ThamDinhThietKe2 from "@/components/dklr/ThamDinhThietKe2.vue";
import ThamDinhThietKe3 from "@/components/dklr/ThamDinhThietKe3.vue";
import ThamDinhThietKe4 from "@/components/dklr/ThamDinhThietKe4.vue";
import ThamDinhThietKe5 from "@/components/dklr/ThamDinhThietKe5.vue";
import DatePicker from "@/components/dklr/DatePicker.vue";
export default {
  props: {
    rptCode: "",
    rptCodeChild: "",
  },
  components: {
    "tham-dinh-thiet-ke": ThamDinhThietKe,
    "tham-dinh-thiet-ke-2": ThamDinhThietKe2,
    "tham-dinh-thiet-ke-3": ThamDinhThietKe3,
    "tham-dinh-thiet-ke-4": ThamDinhThietKe4,
    "tham-dinh-thiet-ke-5": ThamDinhThietKe5,
    "datetime-picker": DatePicker,
  },
  data: () => {
    return {
      createDate: "",
      adv: {},
      items: ["Ngày", "Ngày giờ", "Tháng", "Năm"],
      thongKeTheo: "",
      menu2: false,
      fromDateFomated: "",
      fromDate: "",
      menu3: false,
      toDate: "",
      menuThang: false,
      month: "",
      selectNam: "",
      nam: [],
      fromDateTime: "",
      toDateTime: "",
      menu1: false,
      createDateFomated: "",
      nhomBC: {},
      nhomBcItems: [],
      mauBC: {},
      mauBcItems: [],
    };
  },
  created() {
    let vm = this;
    vm.$nextTick(function () {
      vm.loadNhomBc();
      vm.getYear();
      if (vm["rptCode"]) {
        vm.loadMauBC(vm["rptCode"]);
        vm.nhomBC = vm.rptCode;
        vm.mauBC = vm.rptCodeChild;
      }
    });
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      let vm = this;
      let query = newRoute["query"] || {};
      vm.exportPdfReport(query);
    },
    nhomBC: function (val) {
      let vm = this;
      vm.loadMauBC(val["rptCode"]);
    },
  },
  methods: {
    parseDate(date) {
      if (!date) {
        return null;
      }
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    parseDate2(keyDate, date) {
      if (!date) {
        return null;
      }
      const [month, day, year] = date.split("-");
      this[keyDate] = `${day.padStart(2, "0")}/${month.padStart(
        2,
        "0"
      )}/${year}`;
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    },
    getYear() {
      let currentYear = new Date().getFullYear();
      for (var i = 0; i < 10; i++) {
        this.nam.push(currentYear);
        currentYear--;
      }
    },
    binData(param) {
      let vm = this;
      vm.adv = Object.asign(vm.adv, param);
    },
    exportPdfReport(param) {
      let vm = this;
      vm.$store.dispatch("exportPdfReport", param).then((result) => {});
    },
    loadNhomBc() {
      let vm = this;
      let param = {};
      vm.$store.dispatch("loadNhomBC", param).then((result) => {
        vm.nhomBcItems = result["data"] || [];
      });
    },
    loadMauBC(rptGroup) {
      let vm = this;
      let param = {
        rptGroup: rptGroup,
      };
      vm.$store.dispatch("loadMauBC", param).then((result) => {
        vm.mauBcItems = result["data"] || [];
      });
    },
    boLoc() {},
    xuatPDF() {
      let vm = this;
      console.log("vm.adv================", vm.adv);
      vm.$router.push({
        path: "/bao-cao/" + (vm.rptCode || 0) + "/" + (vm.rptCodeChild || 0),
        query: {
          ...vm.adv,
        },
      });
    },
    xuatExcel() {},
  },
};
</script>
<style>
.row-header {
  background-color: #e1e2e1;
  width: 100%;
}
.btn-filter {
  width: 30% !important;
  height: 24px !important;
  font-size: 9px !important;
}
.lable-report {
  font-size: 13px;
  font-weight: bold;
}
/* fix css vuetify */
.v-text-field {
  padding-top: 0px !important;
  margin-top: 0px !important;
}
.v-text-field__details {
  display: none !important;
}
</style>

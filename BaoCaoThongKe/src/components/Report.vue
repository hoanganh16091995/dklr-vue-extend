<template>
  <div>
    <div class="row-header" style="height: 38px; overflow: hidden">
      <div class="background-triangle-big view_tp_pdf">
        {{ tenMauBaoCao ? tenMauBaoCao : "Mẫu báo cáo" }}-{{ selectMauBC }}
      </div>
      <!-- <div class="layout row wrap header_tools w-100-xs">
        Từ
        <span class="text-bold primary--text"
          >&nbsp;{{ fromDateFomated }}&nbsp;</span
        >
        đến
        <span class="text-bold primary--text">&nbsp;{{ toDateFomated }}</span>
      </div> -->
    </div>
    <div style="width: 100%">
      <v-layout wrap style="padding: 10px">
        <v-flex xs12 sm7>
          <v-layout row wrap align-center class="ml-0">
            <v-flex xs12 sm3>
              <label for="" class="lable-report">Nhóm báo cáo</label>
            </v-flex>
            <v-flex xs12 sm9>
              <v-autocomplete
                placeholder="Chọn nhóm báo cáo"
                autocomplete
                return-object
                v-model="nhomBC"
                :items="nhomBcItems"
                item-text="rptName"
                item-value="rptCode"
              >
              </v-autocomplete>
            </v-flex>
          </v-layout>
          <v-layout wrap row align-center class="ml-0">
            <v-flex xs12 sm3>
              <label for="" class="lable-report">Mẫu báo cáo</label>
            </v-flex>
            <v-flex xs12 sm9>
              <v-autocomplete
                placeholder="Chọn mẫu báo cáo"
                autocomplete
                v-model="mauBC"
                return-object
                :items="mauBcItems"
                item-text="rptName"
                item-value="rptCode"
              >
              </v-autocomplete>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="ml-0">
            <v-flex xs12 sm12>
              <v-layout align-center>
                <v-flex xs12 sm3>
                  <label for="" class="lable-report">Người tạo</label>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="nguoiTao"
                    class="my-0 py-0"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm5> </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm12>
              <v-layout align-center>
                <v-flex xs12 sm3>
                  <label for="" class="lable-report">Ngày tạo</label>
                </v-flex>
                <v-flex xs12 sm4>
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
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="createDate"
                      no-title
                      @input="
                        createDateFomated = parseDate2('createDate', 'menu1')
                      "
                      locale="vn"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm5> </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <!-- <v-flex xs12 sm5>
          <v-layout row wrap class="ml-0">
            <v-flex xs12>
              <v-layout wrap class="ml-0 pl-4">
                <v-flex xs12 sm3></v-flex>
                <v-flex xs12 sm2>
                  <v-autocomplete
                    style="margin-top: 10px; margin-bottom: 10px"
                    :items="items"
                    outlined
                    v-model="thongKeTheo"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 v-if="thongKeTheo === 'Ngày'">
              <v-layout row wrap class="ml-0 pl-4">
                <v-flex xs12 sm3
                  ><label class="lable-report" for="">Từ ngày:</label></v-flex
                >
                <v-flex xs12 sm4 class="ngay-bao-cao">
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
                        @blur="fromDate = parseDate(fromDateFomated)"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="fromDate"
                      no-title
                      @input="fromDateFomated = parseDate2('fromDate', 'menu2')"
                      locale="vn"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 v-if="thongKeTheo === 'Ngày'">
              <v-layout row wrap class="ml-0 pl-4">
                <v-flex xs12 sm3
                  ><label class="lable-report" for="">Đến ngày:</label></v-flex
                >
                <v-flex xs12 sm4 class="ngay-bao-cao">
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
                        @blur="toDate = parseDate(toDateFomated)"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="toDate"
                      no-title
                      @input="toDateFomated = parseDate2('toDate', 'menu3')"
                      locale="vn"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 v-if="thongKeTheo === 'Tháng'">
              <v-layout row wrap class="ml-0 pl-4">
                <v-flex xs12 sm3
                  ><label class="lable-report" for="">Tháng:</label></v-flex
                >
                <v-flex xs12 sm4 class="ngay-bao-cao">
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
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(month)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 v-if="thongKeTheo === 'Năm'">
              <v-layout row wrap class="ml-0 pl-4">
                <v-flex xs12 sm3
                  ><label class="lable-report" for="">Năm:</label></v-flex
                >
                <v-flex xs12 sm4>
                  <v-autocomplete
                    v-model="selectNam"
                    :items="nam"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 v-if="thongKeTheo === 'Ngày giờ'">
              <v-layout row wrap class="ml-0 pl-4">
                <v-flex xs12 sm3
                  ><label class="lable-report" for="">Từ ngày:</label></v-flex
                >
                <v-flex xs12 sm4>
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
              <v-layout row wrap class="ml-0 pl-4">
                <v-flex xs12 sm3
                  ><label class="lable-report" for="">Đến ngày:</label></v-flex
                >
                <v-flex xs12 sm4>
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
        </v-flex> -->

        <v-flex xs12 sm5>

        </v-flex>

        <v-flex xs12 sm7 class="pt-1 ml-0">
          <v-layout row wrap class="ml-0" v-for="(item, index) in listFilters"
            :key="item['filterKey']">
            <v-flex
              xs12
              sm3
              class="lable-report"
            >
              <label>{{ item["label"] }}</label>
            </v-flex>

            <v-flex xs12 sm6 v-if="item['filterType'] === 'string'">
              <v-text-field
                clearable
                style="margin-top: 4px !important;"
                class="my-0 pt-1"
                placeholder="Nhập giá trị"
                v-model="item['value']"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm3 v-if="item['filterType'] === 'number'" class="pr-1">
              <v-text-field
                clearable
                style="margin-top: 4px !important;"
                class="my-0 pt-1"
                type="number"
                placeholder="Từ số"
                v-model="item['fromValue']"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm3 v-if="item['filterType'] === 'number'" class="pl-1">
              <v-text-field
                clearable
                style="margin-top: 4px !important;"
                class="my-0 pt-1"
                type="number"
                placeholder="Đến số"
                v-model="item['toValue']"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 v-if="item['filterType'] === 'select'">
              <v-autocomplete
                clearable
                @input="changeFilterParent(item, index)"
                :items="item['items']"
                v-model="item['value']"
                item-text="itemText"
                item-value="itemValue"
              ></v-autocomplete>
            </v-flex>

            <v-flex xs12 sm3 v-if="item['filterType'] === 'date'" class="pr-1">
              <v-menu
                :ref="'menuItemFrom' + index"
                v-model="item['menuItemFrom' + index]"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    clearable
                    v-model="item['fromDateFomated']"
                    placeholder="Từ ngày"
                    persistent-hint
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="item['fromDate']"
                  no-title
                  @input="item['fromDateFomated'] = parseDateItem(item['fromDate'], item, index)"
                  locale="vn"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs12 sm3 v-if="item['filterType'] === 'date'" class="pl-1">
              <v-menu
                :ref="'menuItemTo' + index"
                v-model="item['menuItemTo' + index]"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    clearable
                    v-model="item['toDateFomated']"
                    placeholder="Đến ngày"
                    persistent-hint
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="item['toDate']"
                  no-title
                  @input="item['toDateFomated'] = parseDateItem(item['toDate'], item, index)"
                  locale="vn"
                ></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs12 sm3 class="pl-2">
              <v-autocomplete
                v-if="item['filterType'] === 'string'"
                :items="getOperator(item['filterType'])"
                v-model="item['filterOperator']"
                item-text="itemText"
                item-value="itemValue"
                placeholder="Chọn điều kiện tìm kiếm!"
              ></v-autocomplete>
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
    <div style="width: 100%; text-align: center">
      <v-btn color="primary" small @click="exportPdfReport({ isExcel: 1 })"
        >Xuất excel</v-btn
      >
      <v-btn color="primary" small @click="exportPdfReport({ isPdf: 1 })"
        >Xuất pdf</v-btn
      >
    </div>
    <div
      style="width: 100%; height: 700px; text-align: center"
      v-if="!isLoading && urlPDF === ''"
    >
      <span>Không tìm thấy dữ liệu báo cáo</span>
    </div>
    <div
      style="padding-left: 10px; padding-top: 10px; height: 700px"
      v-if="isLoading"
    >
      <i class="fas fa-spinner fa-spin"></i><span>&nbsp;&nbsp;Loading...</span>
    </div>
    <div
      id="viewPdf"
      style="width: 100%; height: 700px; padding: 5px"
      v-if="!isLoading && urlPDF !== ''"
    >
      <object
        :data="urlPDF"
        type="application/pdf"
        style="width: 100%; height: 700px"
      >
        <embed :src="urlPDF" type="application/pdf" />
      </object>
    </div>
  </div>
</template>
<script>
import FilterLeft from "@/components/NavigationDrawer.vue";
import DatePicker from "@/components/dklr/DatePicker.vue";
import toastr from "toastr";
import axios from 'axios';
import $ from "jquery";
export default {
  props: {
    rptCode: "",
    rptCodeChild: "",
  },
  components: {
    "jx-filter-left": FilterLeft,
    "datetime-picker": DatePicker,
  },
  data: () => {
    return {
      createDate: "",
      isLoading: false,
      adv: {},
      operatorStringItems: [
        {
          itemText: 'Gần giống (~)',
          itemValue: 'like'
        },
        {
          itemText: 'Bằng (=)',
          itemValue: '='
        }
      ],
      operatorNumberItems: [
        {
          itemText: 'Lớn hơn (>)',
          itemValue: '>'
        },
        {
          itemText: 'Nhỏ hơn (<)',
          itemValue: '<'
        },
        {
          itemText: 'Bằng (=)',
          itemValue: '='
        },
        {
          itemText: 'Lớn hơn hoặc bằng (>=)',
          itemValue: '>='
        },
        {
          itemText: 'Nhỏ hơn hoặc bằng (<=)',
          itemValue: '<='
        }
      ],
      listFilters: [],
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
      nguoiTao: "",
      nhomBcItems: [],
      mauBC: {},
      mauBcItems: [],
      selectMauBC: "",
      toDateFomated: "",
      urlPDF: "",
      tenMauBaoCao: "",
    };
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
      vm.urlPDF = '';
    },
    listFilters (val) {
      if (val && val['length']) {
        val.forEach(item => {
          if (item['filterType'] === 'select') {
            this.getItems(item);
          }
        });
      }
    },
    mauBC (val) {
      if (val && val['rptCode']) {
        val['excelFileTemplate'] = val['sqlFilter'] ? JSON.parse(val['sqlFilter']) : [];
        this.listFilters = val['excelFileTemplate'] || [];
        this.listFilters.forEach(item => {
          if (item['filterType'] === 'date') {
            item['fromDateFomated'] = (!item['fromDateFomated'] && !item['defaultValue']) ? '' : item['defaultValue'];
            item['toDateFomated'] = (!item['toDateFomated'] && !item['defaultValue']) ? this.getCurentDate() : item['defaultValue'];
          } else if (item['filterType'] === 'number') {
            item['value'] = item['defaultValue'] || 0;
          } else {
            item['value'] = item['defaultValue'] || '';
          }
        });
        this.urlPDF = '';
      }
    }
  },
  created() {
    let vm = this;
    vm.$nextTick(function () {
      vm.loadNhomBc();
      vm.getYear();
      vm.createDateFomated = vm.getCurentDate();
      vm.fromDateFomated = vm.getCurentDate();
      vm.toDateFomated = vm.getCurentDate();
      if (vm["rptCode"]) {
        vm.loadMauBC(vm["rptCode"]);
        vm.nhomBC = {
          rptCode: vm.rptCode,
        };
        vm.mauBC = {
          rptCode: vm.rptCodeChild,
        };
      }
      vm.nguoiTao = $("#dropdownMenu1 > b").text() || "";
      if (!vm.thongKeTheo) {
        vm.thongKeTheo = "Ngày";
      }
    });
  },
  methods: {
    getOperator (type) {
      if (type === 'number') {
        return this.operatorNumberItems;
      } else if (type === 'string') {
        return this.operatorStringItems;
      }
      return [];
    },
    changeFilterParent (item, index) {
      let vm = this;
      if (item['triggerComponent']) {
        // đổi triggerComponent về dạng mảng nếu đầu vào  là chuỗi string cách nhau dấu ,
        if (item['triggerComponent'] && typeof item['triggerComponent'] === 'string') {
          item['triggerComponent'] = item['triggerComponent'].split(',')
        }
        if (item['triggerComponent'] && item['triggerComponent']['length']) {
          item['triggerComponent'].forEach(function (trigger, indexTrigger) {
            vm.listFilters.forEach(function (lstFilterItem, indexLst) {
              if (trigger === lstFilterItem['filterKey']) {
                lstFilterItem[trigger] = item['value'] || ''
                if (!lstFilterItem['urlReplace']) {
                  lstFilterItem['urlReplace'] = ''
                }
                if (!lstFilterItem['arrReplace']) {
                  lstFilterItem['arrReplace'] = []
                }
                lstFilterItem['arrReplace'].push(trigger)
                vm.reloadItemAction(lstFilterItem, indexLst)
              }
            })
          })
        }
      }
    },
    getItems (item, urlReplace) {
      if (item && item['items'] && item['items']['length']) {
        return true;
      }
      let url = urlReplace || item['url']
      axios.get(url, {
        headers: {
          groupId: 55301
        }
      }).then(function (response) {
        let serializable = (response.data && response.data['data']) ? response.data['data'] : response.data['Items']
        item['items'] = serializable.map(itemResponse => {
          return {
            itemText: itemResponse[item['itemText']] || itemResponse['value'],
            itemValue: itemResponse[item['itemValue']] || itemResponse['key']
          }
        });
        // console.log('item------items-----------------', item['items']);
      }).catch(function (xhr) {
        console.log(xhr);
        item['items'] = [];
      })
    },
    loadNhomBc() {
      let vm = this;
      let param = {};
      vm.$store.dispatch("loadNhomBC", param).then((result) => {
        vm.nhomBcItems = result["data"] || [];
      });
    },
    reloadItemAction (item, index) {
      let vm = this
      var urlReplace = item['urlReplace']
      var arrReplace = item['arrReplace']
      if (urlReplace) {
        arrReplace.forEach(function (itemRp, indexRp) {
          urlReplace = urlReplace.replaceAll('#:' + itemRp + '#', item[itemRp])
        })
        item['urlReplace'] = urlReplace;
        vm.getItems(item, item['urlReplace'])
      }
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
    parseDate(date) {
      if (!date) {
        return null;
      }
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    parseDate2(keyItem, keyMenu) {
      let vm = this;
      vm[keyMenu] = false;
      let val = vm[keyItem];
      if (val) {
        const [year, month, day] = val.split("-");
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      }
      return "";
    },
    parseDateItem (val, item, index) {
      if (!val) {
        return '';
      }
      const [year, month, day] = val.split("-");
      console.log("item['menuItemFrom' + index]========", item['menuItemFrom' + index]);
      console.log("item['menuItemTo' + index]========", item['menuItemTo' + index])
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    },
    getCurentDate() {
      let date = new Date();
      let month = String(date.getMonth() + 1);
      let year = String(date.getFullYear());
      let day = String(date.getDate());
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    },
    getYear() {
      let currentYear = new Date().getFullYear();
      for (var i = 0; i < 10; i++) {
        this.nam.push(currentYear);
        currentYear--;
      }
    },
    exportPdfReport(tmpParam) {
      let vm = this;
      if (!vm.mauBC["rptCode"]) {
        toastr.error("Bạn phải chọn mẫu báo cáo!");
        return;
      }
      let param = {
        ...tmpParam,
        rptDescription: vm.mauBC["rptCode"],
        creator: vm.nguoiTao,
        createdDate: vm.createDateFomated,
      };
      let extendParams = [];
      vm.listFilters.forEach(item => {
        let tmp = {
          filterKey: item['filterKey'],
          filterType: item['filterType'],
          filterCondition: item['filterCondition']
        }
        if (item['filterType'] === 'string') {
          tmp['filterOperator'] = item['value'] ? item['filterOperator'] : '';
          tmp['value'] = item['value'];
          extendParams.push(tmp);
        } else if (item['filterType'] === 'number') {
          tmp['from'] = item['fromValue'];
          tmp['to'] = item['toValue'];
          extendParams.push(tmp);
        } else if (item['filterType'] === 'select') {
          tmp['filterOperator'] = item['value'] ? '=' : '';
          tmp['value'] = item['value'];
          extendParams.push(tmp);
        } else {
          tmp['from'] = item['fromDateFomated'];
          tmp['to'] = item['toDateFomated'];
          extendParams.push(tmp);
        }
        // if (item['filterType'] !== 'date') {
        //   tmp['value'] = item['value'];
        // } else {
        //   tmp['fromDate'] = item['fromDateFomated'];
        //   tmp['toDate'] = item['toDateFomated'];
        // }
      });
      param['extendParams'] = extendParams;
      window.sessionStorage.setItem('param', param);
      if (vm.thongKeTheo === "Ngày") {
        param["fromDate"] = vm.fromDateFomated;
        param["toDate"] = vm.toDateFomated;
      } else if (vm.thongKeTheo === "Ngày giờ") {
        param["fromDate"] = vm.fromDateTime;
        param["toDate"] = vm.toDateTime;
      } else if (vm.thongKeTheo === "Tháng") {
        param["month"] = vm.month;
      } else if (vm.thongKeTheo === "Năm") {
        param["year"] = vm.selectNam;
      }
      vm.isLoading = true;
      vm.$store
        .dispatch("exportPdfReport", param)
        .then((result) => {
          vm.urlPDF = result["url"] || "";
          vm.isLoading = false;
        })
        .catch((xhr) => {
          console.log(xhr);
          vm.isLoading = false;
        });
    },
  },
};
</script>
<style>
.row-header {
  height: 38px;
  overflow: hidden;
  background-color: #e1e2e1;
  display: flex;
  align-items: center;
  width: 100%;
}
.background-triangle-big {
  padding: 10px 5px 10px 20px;
  width: auto;
  margin-right: 30px;
  background-color: #0b72ba;
  display: inline-block;
  text-align: right;
  color: #fff;
  position: relative;
}
.background-triangle-big:before,
.background-triangle-small:before {
  content: "";
  position: absolute;
  top: 1px;
  transform: rotate(45deg);
  right: -4px;
  border-top: 28px solid #0b72ba;
  border-left: 28px solid transparent;
  border-bottom: 28px solid transparent;
}
.header_tools {
  padding: 30px;
  font-size: 13px;
}
</style>

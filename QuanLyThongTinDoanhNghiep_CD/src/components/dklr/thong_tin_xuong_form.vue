<template>
  <div style="background: #ffff;">
    <v-form
      ref="formNhaXuong"
      v-model="validFormNX"
      lazy-validation
      :style="styleStatus"
      >
      <div class="ml-0">
        <v-layout row wrap class="ml-0">
          <!-- <div class="lv-title">THÔNG TIN XƯỞNG SẢN XUẤT LẮP RÁP</div> -->
          <v-flex xs12 sm2>
            <span style="color: blue;">Tên xưởng sản xuất, lắp ráp: <span style="color: red;">(*)</span></span>
          </v-flex>
          <v-flex xs12 sm10 class="">
            <v-text-field
              outline
              :disabled="disabledForm"
              v-model="thongTinXuong['productionPlantName']"
              placeholder="Nhập tên xưởng sản xuất, lắp ráp"
              clearable
              class="py-0"
              :class="{'track-change': isChange('productionPlantName')}"
              required
              :rules="[v => !!v || 'Trường yêu cầu bắt buộc']"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm2>
            <span style="color: blue;">Địa điểm sản xuất : <span style="color: red;">(*)</span></span>
          </v-flex>
          <v-flex xs12 sm10>

            <v-text-field
              outline
              :disabled="disabledForm"
              v-model="thongTinXuong['productionPlantAddress']"
              placeholder="Nhập địa chỉ xưởng (Theo Giấy chứng nhận đăng ký địa điểm kinh doanh / Giấy chứng nhận đăng ký hoạt động chi nhánh/ chứng nhận đầu tư)"
              clearable
              class="py-0"
              :class="{'track-change': isChange('productionPlantAddress')}"
              required
              :rules="[v => !!v || 'Trường yêu cầu bắt buộc']"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm2>
            <span style="color: blue;">Tỉnh thành</span>
          </v-flex>

          <v-flex xs12 sm2 class="">

            <v-autocomplete
              class=""
              @input="changeTinhThanh()"
              :class="{'track-change': isChange('productionPlantProvinceCode')}"
              outline
              :items="cityItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinXuong['productionPlantProvinceCode']"
              outline
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm2 class="text-xs-right pr-2">
            <span style="color: blue;">Quận/Huyện:</span>
          </v-flex>

          <v-flex xs12 sm2 class="">
            <v-autocomplete
              class=""
              @input="changeQuanHuyen()"
              :class="{'track-change': isChange('productionPlantDistrictCode')}"
              outline
              :items="districtItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinXuong['productionPlantDistrictCode']"
              outline
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm2 class="text-xs-right pr-2">
            <span style="color: blue;">Phường/Xã:</span>
          </v-flex>

          <v-flex xs12 sm2>
            <v-autocomplete
              :class="{'track-change': isChange('applicantName')}"
              :items="wardItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinXuong['productionPlantWardCode']"
              outline
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm2>
            <span style="color: blue;">Loại giấy chứng nhận: <span style="color: red;">(*)</span></span>
          </v-flex>

          <v-flex xs12 sm10>

            <v-autocomplete
              class=""
              :class="{'track-change': isChange('productionPlantIdentityType')}"
              outline
              @change="bindNameproductionPlantIdentityType(data)"
              :items="loaiGCNItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinXuong['productionPlantIdentityType']"
              outline
            ></v-autocomplete>
            <!-- <v-radio-group v-model="thongTinXuong['productionPlantIdentityType']" column class="ml-5" required
              :rules="[v => !!v || 'Trường yêu cầu bắt buộc']">
              <v-radio @click="bindNameproductionPlantIdentityType(2); thongTinXuong['productionPlantIdentityType'] = '2'" label="Giấy chứng nhận đăng ký doanh nghiệp" value="2"></v-radio>
              <v-radio @click="bindNameproductionPlantIdentityType(1); thongTinXuong['productionPlantIdentityType'] = '1'" label="Giấy chứng nhận đăng ký kinh doanh" value="1"></v-radio>
              <v-radio @click="bindNameproductionPlantIdentityType(3); thongTinXuong['productionPlantIdentityType'] = '3'" label="Giấy chứng nhận đầu tư" value="3"></v-radio>
              <v-radio @click="bindNameproductionPlantIdentityType(4); thongTinXuong['productionPlantIdentityType'] = '4'" label="Giấy chứng nhận đăng ký địa điểm kinh doanh" value="4"></v-radio>
              <v-radio @click="bindNameproductionPlantIdentityType(5); thongTinXuong['productionPlantIdentityType'] = '5'" label="Giấy chứng nhận đăng ký hoạt động chi nhánh" value="5"></v-radio>
            </v-radio-group> -->
          </v-flex>

          <v-flex xs12 sm2>
            <span style="color: blue;">Tình trạng hoạt động</span>
          </v-flex>

          <v-flex xs12 sm10>
            <v-autocomplete
              class=""
              :class="{'track-change': isChange('productionPlantStatus')}"
              outline
              :items="statusItems"
              item-text="itemName"
              item-value="itemCode"
              v-model="thongTinXuong['productionPlantStatus']"
              outline
            ></v-autocomplete>
          </v-flex>

          <v-flex xs12 sm4>
            <span style="color: blue;" v-if="thongTinXuong['productionPlantIdentityType'] === 2 || thongTinXuong['productionPlantIdentityType'] === '2'">Giấy chứng nhận đăng ký doanh nghiệp:</span>

            <span style="color: blue;" v-else-if="thongTinXuong['productionPlantIdentityType'] === 1 || thongTinXuong['productionPlantIdentityType'] === '1'">Giấy chứng nhận đăng ký kinh doanh:</span>

            <span style="color: blue;" v-else-if="thongTinXuong['productionPlantIdentityType'] === 3 || thongTinXuong['productionPlantIdentityType'] === '3'">Giấy chứng nhận đầu tư:</span>

            <span style="color: blue;" v-else-if="thongTinXuong['productionPlantIdentityType'] === 4 || thongTinXuong['productionPlantIdentityType'] === '4'">Giấy chứng nhận đăng ký địa điểm kinh doanh:</span>

            <span style="color: blue;" v-else>Giấy chứng nhận đăng ký hoạt động chi nhánh:</span>
          </v-flex>

          <v-flex xs12 sm8>
            <v-layout row wrap class="ml-0">
              <!-- <v-flex xs12 sm2 class="pt-2">
                <span style="color: blue;" class="">Nhập tên file:</span>
              </v-flex> -->
              <v-flex xs12 sm3 class="pt-1">
                <v-text-field
                :disabled="disabledForm"
                outline
                v-model="thongTinXuong['productionIdentityFileName']"
                placeholder="Nhập tên file"
                clearable
                class="py-0"
                :class="{'track-change': isChange('productionIdentityFileName')}"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm2 class="text-xs-center">
                <v-chip span style="cursor: pointer;" outline color="blue" @click="xacNhanTaiFileGCNDangKy()">Xác nhận tải file</v-chip>
              </v-flex>
              <v-flex xs12 sm2 class="text-xs-center" v-if="thongTinXuong['productionPlantIdentityFileEntryId'] && thongTinXuong['productionPlantIdentityFileEntryId'] !== '0'">
                <v-chip span style="cursor: pointer; pointer-events: auto;" outline color="blue" @click="xemFile(thongTinXuong['productionPlantIdentityFileEntryId'])">Xem file</v-chip>
              </v-flex>
              <v-flex xs12 sm3 class="pt-2">
                <input type="file" name="fileGCN" id="fileGCN" @change="changeInputFile">
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 sm2>
            <span style="color: blue;">Số giấy chứng nhận:</span>
          </v-flex>

          <v-flex xs12 sm2>

            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantIdentityNo']"
              placeholder="Nhập số giấy chứng nhận"
              clearable
              class="py-0 "
              :class="{'track-change': isChange('productionPlantIdentityNo')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm2 class="text-xs-right pr-2">
            <span style="color: blue;">Nơi cấp:</span>
          </v-flex>
          <v-flex xs12 sm2>

            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantissueplace']"
              placeholder="Nhập nơi cấp"
              clearable
              class="py-0"
              :class="{'track-change': isChange('productionPlantissueplace')}"
            ></v-text-field>
          </v-flex>


          <v-flex xs12 sm2 class="text-xs-right pr-2">
            <span style="color: blue;">Ngày cấp:</span>
          </v-flex>

          <v-flex xs12 sm2>

            <!-- <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['ngayCap']"
              placeholder="Nhập ngày cấp"
              clearable
              class="py-0"
              :class="{'track-change': isChange('ngayCap')}"
            ></v-text-field> -->
            <v-menu
              ref="ngayCap"
              v-model="ngayCapMenu"
              :close-on-content-click="false"
              full-width
              >
              <template>
                <v-text-field
                  slot="activator"
                  class="py-0"
                  v-model="thongTinXuong['productionPlantissuedate']"
                  outline
                  placeholder="Nhập ngày cấp"
                  @blur="ngayCap = parseDate(thongTinXuong['productionPlantissuedate'])"
                  :class="{'track-change': isChange('ngayCap')}"
                ></v-text-field>
              </template>
              <v-date-picker v-model="ngayCap" no-title @input="ngayCapMenu = false"></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs12 sm2>
            <span style="color: blue;">Địa chỉ email:</span>
          </v-flex>

          <v-flex xs12 sm4>

            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantEmail']"
              placeholder="Nhập địa chỉ email"
              clearable
              class="py-0"
              :class="{'track-change': isChange('productionPlantEmail')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm2 class="text-xs-right pr-2">
            <span style="color: blue;">Website:</span>
          </v-flex>

          <v-flex xs12 sm4>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantWebsite']"
              placeholder="Nhập website"
              clearable
              class="py-0"
              :class="{'track-change': isChange('productionPlantWebsite')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm12>
            <span style="color: blue;">Loại hình:</span>
            <v-checkbox class="ml-5" v-model="thongTinXuong['productionMaintainer']" label="Bảo hành bảo dưỡng" value="2"></v-checkbox>
            <v-checkbox class="ml-5" v-model="thongTinXuong['productionManufacture']" label="Sản xuất lắp ráp" value="1"></v-checkbox>
          </v-flex>

          <v-flex xs12 sm2>
            <span style="color: blue;">Người đại diện:</span>
          </v-flex>

          <v-flex xs12 sm2>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantRepresentative']"
              placeholder="Nhập tên người đại diện"
              clearable
              class="py-0"
              :class="{'track-change': isChange('productionPlantRepresentative')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm2 class="text-xs-right pr-2">
            <span style="color: blue;">Chức danh:</span>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantRepresentativeTitle']"
              placeholder="Nhập chức danh"
              clearable
              class="py-0"
              :class="{'track-change': isChange('productionPlantRepresentativeTitle')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm2 class="text-xs-right pr-2">
            <span style="color: blue;">Số điện thoại người đại diện:</span>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field
              :disabled="disabledForm"
              outline
              v-model="thongTinXuong['productionPlantRepresentativePhone']"
              placeholder="Nhập số điện thoại"
              clearable
              class="py-0"
              :class="{'track-change': isChange('productionPlantRepresentativePhone')}"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm12>
            <span class="bold pb-1">Người liên hệ:</span> <br>
            <v-chip class="mb-1" span outline color="blue" @click="addContact()">Thêm mới </v-chip> <br>

            <v-data-table
              v-if="!loading"
              :headers="headersNguoiDaiDien"
              :items="dataNguoiDaiDienItems"
              class="table-bordered danhSachHoSoTable__class"
              hide-actions
              :no-data-text="'Không có dữ liệu'"
              :no-results-text="'Không có dữ liệu'"
            >
              <template slot="headers" slot-scope="props">
                <th v-for="header in props.headers" class="text-xs-center" v-html="header['text']">

                </th>
              </template>
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-center" style="">
                    <v-text-field
                      :disabled="disabledForm"
                      v-model="props.item['productionPlantContactName']"
                      placeholder="Nhập tên người liên hệ"
                      clearable
                      class="py-0"
                    ></v-text-field>
                  </td>
                  <td class="text-xs-center">
                    <v-text-field
                    :disabled="disabledForm"
                    v-model="props.item['productionPlantContactPhone']"
                    placeholder="Nhập số điện thoại"
                    clearable
                    class="py-0"
                    ></v-text-field>
                  </td>
                  <td class="text-xs-center">
                    <v-text-field
                      :disabled="disabledForm"
                      v-model="props.item['productionPlantContactEmail']"
                      placeholder="Nhập email"
                      clearable
                      class="py-0"
                    ></v-text-field>
                  </td>
                  <td class="text-xs-center">
                    <v-chip span outline color="blue" @click="deleteContact(props.item, props.index)">Xóa</v-chip>
                  </td>
                </tr>
              </template>

            </v-data-table>
          </v-flex>

        </v-layout>
      </div>
    </v-form>
  </div>
</template>

<script>
// import supportData from '../store/support_data.json'
// import $ from 'jquery'
import axios from 'axios'
import toastr from 'toastr'
toastr.options = {
  'closeButton': true,
  'timeOut': '3000'
}
export default {
  props: {
    disabledForm: {
      type: Boolean,
      default: false
    },
    thongTinXuong: {
      productionPlantIdentityFileEntryId: 0,
      productionPlantIdentityType: '2',
      productionIdentityFileName: '',
      productionPlantStatus: '1',
      id: 0
    },
    thongTinXuongPev: {
      type: Object,
      default: {}
    }
  },
  components: {
  },
  data: () => ({
    ngayCapMenu: false,
    ngayCap: '',
    validFormNX: false,
    cityItems: [],
    wardItems: [],
    districtItems: [],
    statusItems: [
      {
        itemCode: '1',
        itemName: 'Hoạt động'
      },
      {
        itemCode: '2',
        itemName: 'Không hđ'
      }
    ],
    headersNguoiDaiDien: [
      {
        'text': 'Họ và tên',
        'align': 'center',
        'sortable': false,
        'value': 'stt',
        'display': ''
      },
      {
        'text': 'Số điện thoại',
        'align': 'center',
        'sortable': false,
        'value': 'maXuong',
        'display': ''
      },
      {
        'text': 'Email',
        'align': 'center',
        'sortable': false,
        'value': 'tenXuong',
        'display': ''
      },
      {
        'text': 'Actions',
        'align': 'center',
        'sortable': false,
        'value': 'lastUpdate',
        'display': ''
      }
    ],
    dataNguoiDaiDienItems: [],
    loading: false,
    loadHomeDataTable: {},
    headers: [],
    payment: false,
    formTTDN: {},
    listXuongItems: [],
    listRegistrationTemplate: [],
    indexSelect: -1,
    loaiGCNItems: [
      {
        itemName: 'Giấy chứng nhận đăng ký doanh nghiệp',
        itemCode: '2'
      },
      {
        itemName: 'Giấy chứng nhận đăng ký kinh doanh',
        itemCode: '1'
      },
      {
        itemName: 'Giấy chứng nhận đầu tư',
        itemCode: '3'
      },
      {
        itemName: 'Giấy chứng nhận đăng ký địa điểm kinh doanh',
        itemCode: '4'
      },
      {
        itemName: 'Giấy chứng nhận đăng ký hoạt động chi nhánh',
        itemCode: '5'
      }
    ],
    loaiHinhItems: [
      {
        itemCode: 'Công ty Cổ phần',
        itemName: 'Công ty Cổ phần'
      },
      {
        itemCode: 'Công ty hợp danh',
        itemName: 'Công ty hợp danh'
      },
      {
        itemCode: 'Công ty liên doanh',
        itemName: 'Công ty liên doanh'
      },
      {
        itemCode: 'Công ty trách nhiệm hữu hạn hai thành viên trở lên',
        itemName: 'Công ty trách nhiệm hữu hạn hai thành viên trở lên'
      },
      {
        itemCode: 'Công ty trách nhiệm hữu hạn một thành viên',
        itemName: 'Công ty trách nhiệm hữu hạn một thành viên'
      },
      {
        itemCode: 'Doanh nghiệp Tư nhân',
        itemName: 'Doanh nghiệp Tư nhân'
      },
      {
        itemCode: 'Doanh nghiệp nhà nước',
        itemName: 'Doanh nghiệp nhà nước'
      },
      {
        itemCode: 'Hợp Tác Xã',
        itemName: 'Hợp Tác Xã'
      }
    ],
    linhVucItems: [
      {
        itemCode: 'Cục Đăng kiểm Việt Nam',
        itemName: 'Cục đăng kiểm Việt Nam'
      }
    ]
  }),
  computed: {
    styleStatus () {
      let vm = this
      let style = {}
      if (vm.thongTinChung['applicantStatus'] === 1 || vm.thongTinChung['applicantStatus'] === '1' || vm.thongTinChung['applicantStatus'] === 2 || vm.thongTinChung['applicantStatus'] === '2' || vm.disabledForm) {
        style['pointer-events'] = 'none'
        style['opacity'] = 0.6
      } else {
        style = {}
      }
      return style
    },
    thongTinChung () {
      /* eslint-disable */
      let item = this.$store.getters.thongTinChung || {}
      console.log('return item', item)
      return item
      /* eslint-disable */
    }
  },
  beforeCreate () {
    var vm = this
    vm.$nextTick(function () {
    })
  },
  created () {
    let vm = this
    vm.$nextTick(function () {
      vm.getDictItem('cityItems', {parent: 0, dictItemCode: 'ADMINISTRATIVE_REGION'})
      if (vm.thongTinXuong['productionPlantProvinceCode']) {
        vm.thongTinXuong['productionPlantProvinceCode'] = String(vm.thongTinXuong['productionPlantProvinceCode'])
        vm.getDictItem('districtItems', {parent: vm.thongTinXuong['productionPlantProvinceCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
      if (vm.thongTinXuong['productionPlantDistrictCode']) {
        console.log('productionPlantDistrictCode+++++++++', vm.thongTinXuong['productionPlantDistrictCode'])
        vm.thongTinXuong['productionPlantDistrictCode'] = String(vm.thongTinXuong['productionPlantDistrictCode'])
        vm.getDictItem('wardItems', {parent: vm.thongTinXuong['productionPlantDistrictCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
      if (vm.thongTinXuong['productionPlantWardCode']) {
        vm.thongTinXuong['productionPlantDistrictCode'] = String(vm.thongTinXuong['productionPlantDistrictCode'])
      }
      if (!vm.thongTinXuong['productionPlantIdentityType'] || vm.thongTinXuong['productionPlantIdentityType'] === '0') {
        vm.thongTinXuong['productionPlantIdentityType'] = '2'
      }
      if (!vm.thongTinXuong['productionPlantStatus'] || vm.thongTinXuong['productionPlantStatus'] === '0') {
        vm.thongTinXuong['productionPlantStatus'] = '1'
      }
    })
  },
  watch: {
    ngayCap (val) {
      this.thongTinXuong['productionPlantissuedate'] = this.formatDate(val)
    },
    'dataNguoiDaiDienItems' (val) {
      this.thongTinXuong['productionPlantMetadata'] = JSON.stringify(val)
    },
    'thongTinXuong.productionPlantProvinceCode' (val) {
      if (val) {
        this.getDictItem('districtItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    },
    'thongTinXuong.productionPlantDistrictCode' (val) {
      if (val) {
        this.getDictItem('wardItems', {parent: val, dictItemCode: 'ADMINISTRATIVE_REGION'})
      }
    },
    'thongTinXuong.id' (val) {
      if (!val || val === '0') {
        this.thongTinXuong['productionPlantProvinceCode'] = this.thongTinChung['applicantCityCode']
        this.thongTinXuong['productionPlantIdentityNo'] = this.thongTinChung['applicantCode']
      }
    }
  },
  methods: {
    bindNameproductionPlantIdentityType (code) {
      let vm = this
      if (code === 2 || code === '2') {
        vm.thongTinXuong['productionPlantIdentityName'] = 'Giấy chứng nhận đăng ký doanh nghiệp'
      } else if (code === 1 || code === '1') {
        vm.thongTinXuong['productionPlantIdentityName'] = 'Giấy chứng nhận đăng ký kinh doanh'
      } else if (code === 3 || code === '3') {
        vm.thongTinXuong['productionPlantIdentityName'] = 'Giấy chứng nhận đầu tư'
      } else if (code === 4 || code === '4') {
        vm.thongTinXuong['productionPlantIdentityName'] = 'Giấy chứng nhận đăng ký địa điểm kinh doanh'
      } else if (code === 5 || code === '5') {
        vm.thongTinXuong['productionPlantIdentityName'] = 'Giấy chứng nhận đăng ký hoạt động chi nhánh'
      }
    },
    formatDate (date) {
      console.log('date==========', date)
      if (!date) return null
        const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null
        console.log('date++++++++++++', date)
        const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    changeTinhThanh () {
      console.log('watch val======111=====', this.thongTinXuong['productionPlantProvinceCode'])
      this.getDictItem('districtItems', {parent: this.thongTinXuong['productionPlantProvinceCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
    },
    changeQuanHuyen () {
      console.log('watch val======222222=====', this.thongTinXuong['productionPlantDistrictCode'])
      this.getDictItem('wardItems', {parent: this.thongTinXuong['productionPlantDistrictCode'], dictItemCode: 'ADMINISTRATIVE_REGION'})
    },
    isChange (key) {
      let vm = this
      if (!vm.thongTinXuong || (Object.keys(vm.thongTinXuong).length === 0 && vm.thongTinXuong.constructor === Object)) {
        // console.log('not THONG TIN XƯỞNG ')
        return false
      }
      if (!vm.thongTinXuongPev || (Object.keys(vm.thongTinXuongPev).length === 0 && vm.thongTinXuongPev.constructor === Object)) {
        // console.log('not THONG TIN XƯỞNG PREV')
        return false
      }
      if (vm.thongTinXuong[key] !== vm.thongTinXuongPev[key]) {
        return true
      }
      return false
    },
    addContact () {
      this.dataNguoiDaiDienItems.push({})
    },
    deleteContact (item, index) {
      this.dataNguoiDaiDienItems.splice(index, 1)
    },
    changeInputFile (event) {
      let fileName = event.target.files[0] ? event.target.files[0]['name'] : ''
      this.thongTinXuong['productionIdentityFileName'] = fileName
      // console.log(this.thongTinXuong['productionIdentityFileName']);
    },
    async xacNhanTaiFileGCNDangKy () {
      let vm = this
      if (!vm.thongTinXuong['productionIdentityFileName']) {
        toastr.error('Bạn phải nhập tên file!')
        vm.$refs.formNhaXuong.validate()
        return
      }
      let inputFile = $('#fileGCN')[0]
      return vm.$store.dispatch('uploadFileFormDN', {
        inputFile: inputFile
      }).then(result => {
        toastr.success('Tải lên thành công!')
        vm.thongTinXuong['productionIdentityFileEntryId'] = result['fileId'] || 0
        vm.thongTinXuong['productionPlantIdentityFileEntryId'] = result['fileId'] || 0
      }).catch(xhr => {
        toastr.error('Tải lên thất bại, vui lòng thử lại!')
      })
    },
    xemFile (id) {
      let url = '/o/rest/v2/dossiers/fileEntryId/' + id
      let configs = {
        headers: {},
        responseType: "blob",
      }
      axios.get(url, configs).then(function (response) {
        var urlRes = window.URL.createObjectURL(response.data)
        window.open(urlRes, "_blank")
      }).catch(function (xhr) {
        console.log(xhr)
      })
    },
    getDictItem (key, data) {
      let vm = this
      if (!key) {
        return
      }
      if (!data) {
        data = {}
      }
      vm.$store.dispatch('getDictItem', data).then(result => {
        if (!result || !result['data']) {
          result = {
            total: 0,
            data: []
          }
        } else {
          result['data'] = result['data'].map(item => {
            if (item['itemCode']) {
              item['itemCode'] = String(item['itemCode'])
            }
            return item
          })
        }
        vm[key] = result['data']
      })
    },
    mapThongTinChungToForm () {
      let vm = this
      return new Promise((resolve, reject) => {
        vm.$store.dispatch('loadInitResource').then(function (result) {
          vm.loading = false
          if (!vm.id || vm.id === '0') {
            vm.thongTinChung = Object.assign(vm.thongTinChung, {
              applicantName: result.applicant['applicantName'],
              applicantIdType: result.applicant['applicantIdType'],
              applicantIdNo: result.applicant['applicantIdNo'],
              applicantIdDate: result.applicant['applicantIdDate'],
              address: result.applicant['address'],
              cityCode: result.applicant['cityCode'],
              districtCode: result.applicant['districtCode'],
              wardCode: result.applicant['wardCode'],
              contactName: result.applicant['contactName'],
              contactTelNo: result.applicant['contactTelNo'],
              contactEmail: result.applicant['contactEmail'],
              govAgencyCode: result.applicant['govAgencyCode'],
              representativeEnterprise: result.applicant['representativeEnterprise']
            })
          }
          resolve(vm.thongTinChung)
        }).catch(xhr => {
          vm.loading = false
          reject(xhr)
        })
      })
    }
  },
  filters: {
  }
}
</script>

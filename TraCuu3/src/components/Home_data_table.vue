<template>
  <div style="width: 100%">
    <div
      id="title-danhsach"
      class="row-header"
      style="
        height: 38px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
      "
    >
      <div class="background-triangle-big view_tp_pdf">
        <span>Tra cứu thông tin {{ module["pathParent"] }}</span>
      </div>
      <div class="collapsible1 mr-3" style="cursor: pointer">
        <span
          @click="isToggle = !isToggle"
          style="font-weight: bold; color: blue"
          >Tìm kiếm <i class="mdi mdi-chevron-down" v-if="!isToggle"></i
          ><i class="mdi mdi-chevron-up" v-if="isToggle"></i
        ></span>
      </div>
    </div>
    <div
      class="collapsible-content pb-1"
      v-if="isToggle"
      style="background: #fff"
    >
      <v-layout wrap class="ml-0">
        <v-flex
          xs12
          sm3
          class=""
          style="
            margin-top: 4px;
            font-size: 13px;
            text-align: right;
            padding-right: 10px;
          "
        >
          <span class="text-xs-right">Chọn hồ sơ: </span>
        </v-flex>
        <v-flex xs12 sm9 class="pr-1">
          <v-autocomplete
            @input="selectModuleAction()"
            v-model="selectModule"
            :items="modules"
            return-object
            item-text="name"
            item-value="module"
            autocomplete
            placeholder="Tên Module"
          >
            <!-- <template v-slot:append-outer>
                                            <v-icon>
                                                mdi-magnify
                                            </v-icon>
</template>-->
          </v-autocomplete>
        </v-flex>
        <v-flex xs12 sm3 md3>
          <div>
            <!-- <v-chip
                            style="height: 22px; color: #fff;"
                            color="primary"
                            label
                            @click="addSearch"
                            >
                            <v-icon size="17" style="color: #fff; font-size: 16px">add</v-icon> Thêm
                        </v-chip> -->

            <span
              style="
                float: right;
                padding-right: 10px;
                font-size: 13px;
                margin-top: 7px;
              "
              >Điều kiện tìm kiếm:
            </span>
          </div>
        </v-flex>
        <v-flex xs12 sm9 md9 class="mt-1">
          <div
            class="filter-item"
            v-for="(item, index) in listSearch"
            :key="index"
            style="clear: both; display: flex"
          >
            <v-autocomplete
              style="display: inline-block; width: 36%; float: left"
              outlined
              autocomplete
              class="pr-2 pt-0"
              @input="changeCondition(item)"
              :items="conditions"
              item-text="value"
              clearable
              v-model="item['conditionsSelect']"
              return-object
            ></v-autocomplete>
            <v-text-field
              style="display: inline-block; width: 35%"
              v-if="
                item['conditionsSelect'] &&
                (item['conditionsSelect']['type'] === 'string' ||
                  item['conditionsSelect']['type'] === 'keyword')
              "
              outlined
              class="pr-1 pt-0"
              placeholder="Nhập từ khóa"
              v-model="item['valueSearch']"
            >
            </v-text-field>
            <v-text-field
              style="display: inline-block; width: 35%"
              v-if="
                item['conditionsSelect'] &&
                item['conditionsSelect']['type'] === 'number'
              "
              outlined
              class="pt-0"
              type="number"
              placeholder="Nhập số"
              v-model="item['valueSearch']"
            >
            </v-text-field>

            <v-menu
              ref="menuDateTraCuuFrom"
              :close-on-content-click="false"
              v-if="
                item['conditionsSelect'] &&
                item['conditionsSelect']['type'] === 'date'
              "
              v-model="menuDateTraCuuFrom"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              style="width: 30%; display: normal"
            >
              <v-text-field
                slot="activator"
                v-model="item['fromDate']"
                append-icon="event"
                clearable
                class="pt-0 pr-1"
                readonly
              ></v-text-field>
              <v-date-picker
                v-model="item['fromDateTraCuu']"
                @input="parseDateTraCuuFrom(item)"
              ></v-date-picker>
            </v-menu>
            <!-- <DateTimePicker
                            style="display: inline-block; width: 25%;"
                            v-if="item['conditionsSelect']['type'] === 'date'"
                            v-model="item['fromDate']"
                            :first-day="1"
                            class="py-0 my-0"
                            :show-dst="false"
                            :show-hours="true"
                            :show-minutes="true"
                            :show-seconds="false"
                        ></DateTimePicker> -->

            <v-menu
              ref="menuDateTraCuuTo"
              :close-on-content-click="false"
              v-if="
                item['conditionsSelect'] &&
                item['conditionsSelect']['type'] === 'date'
              "
              v-model="menuDateTraCuuTo"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              style="width: 28%; display: normal"
            >
              <v-text-field
                slot="activator"
                v-model="item['toDate']"
                append-icon="event"
                clearable
                class="pt-0"
                readonly
              ></v-text-field>
              <v-date-picker
                v-model="item['toDateTraCuu']"
                @input="parseDateTraCuuTo(item)"
              ></v-date-picker>
            </v-menu>

            <!-- <DateTimePicker
                            style="display: inline-block; width: 25%;"
                            v-if="item['conditionsSelect']['type'] === 'date'"
                            v-model="item['toDate']"
                            :first-day="1"
                            class="py-0 my-0"
                            :show-dst="false"
                            :show-hours="true"
                            :show-minutes="true"
                            :show-seconds="false"
                        ></DateTimePicker> -->

            <!-- :items="
                (item['conditionsSelect']['items'] && item['conditionsSelect']['items']['length']) || getSelect(item['key'])
              " -->
            <v-autocomplete
              style="display: inline-block; width: 30%"
              v-if="
                item['conditionsSelect'] &&
                item['conditionsSelect']['type'] === 'select'
              "
              v-model="item['valueSearch']"
              :items="item['conditionsSelect']['items']"
              outlined
              autocomplete
              class="pt-0"
              item-text="itemText"
              item-value="itemValue"
            >
            </v-autocomplete>

            <v-autocomplete
              v-if="
                item['conditionsSelect'] &&
                (item['conditionsSelect']['type'] === 'string' ||
                  item['conditionsSelect']['type'] === 'number' ||
                  item['conditionsSelect']['type'] === 'keyword')
              "
              v-model="item['typeSearch']"
              :items="item['typeSearchItems']"
              item-text="name"
              class="pt-0"
              item-value="altername"
              autocomplete
              style="display: inline-block; width: 20%"
              outlined
            ></v-autocomplete>

            <v-chip
              class="mt-2"
              style="height: 22px; float: right; cursor: pointer"
              label
              @click="removeSearch(item, index)"
            >
              <v-icon
                size="18"
                style="font-size: 17px; cursor: pointer"
                color="red"
                >delete_outline</v-icon
              >
            </v-chip>
            <br />
          </div>
        </v-flex>
        <v-flex xs12 sm7 class="text-xs-right">
          <!-- <v-chip
                    style="height: 22px; color: #fff;"
                    color="primary"
                    label
                    @click="addSearch"
                    >
                    <v-icon size="17" style="color: #fff; font-size: 16px">add</v-icon> Thêm
                  </v-chip>

                  <span style="float: right; padding-right: 10px; font-size: 13px; margin-top: 6px;">Điều kiện tìm kiếm: </span> -->
          <v-btn
            small
            color="primary"
            class="ml-0"
            @click="addSearch()"
            style=""
            ><v-icon size="17" style="color: #fff; font-size: 17px">add</v-icon>
            Thêm điều kiện</v-btn
          >
          <v-btn
            small
            color="primary"
            class="ml-0"
            @click="traCuuThongKe()"
            style=""
            ><v-icon size="17" style="color: #fff; font-size: 17px"
              >search</v-icon
            >
            Tìm kiếm</v-btn
          >
        </v-flex>

        <v-flex
          xs12
          sm5
          class="text-xs-right"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <span style="padding-top: 5px">
            <i>Tổng số: </i> <label>{{ totalTraCuu }}</label>
          </span>
          <v-pagination
            :total-visible="7"
            :length="lengthPageTraCuuThongKe"
            v-model="pageTraCuuThongKe"
            @input="pagingTraCuu"
          ></v-pagination>
        </v-flex>
      </v-layout>
    </div>
    <v-layout row wrap class="ml-0">
      <!-- <v-flex xs12 sm12>
            <div style=" overflow-x: auto;" >
              <div>
                <v-data-table
                :headers="headers"
                :items="lists"
                hide-actions
                no-data-text = "Không có dữ liệu"
                :hide-default-header="false"
                hide-default-footer
                >
<template slot="items" slot-scope="props">
    <tr>
        <td v-for="(itemHeader, index) in headers" class="text-xs-center">
            <span v-if="itemHeader['display'] === 'stt'">{{page * 15 - 15 + props.index + 1}}</span>
            <span v-else-if="itemHeader['display'] === 'action'">
                                            <span style="color: blue; cursor: pointer;" @click="xemGiayChungNhan(props.item)">Xem giấy chứng nhận</span>
            <span style="color: blue; cursor: pointer;" @click="xemBienBan(props.item)">Xem biên bản</span>
            </span>
            <span v-else>{{getDisplay(props.item, itemHeader['display'])}}</span>
        </td>
    </tr>
</template>
              </v-data-table>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 sm12>
          <tiny-pagination :page="page" :pagesize="pageSize" @tiny:change-page="paggingData" :total="totalTraCuu"/>
        </v-flex> -->
      <v-flex xs12 sm12>
        <div
          v-show="loadingTableTraCuu"
          class="text-xs-center"
          style="width: 100%; background: #fff"
        >
          <v-progress-circular
            indeterminate
            v-bind:size="30"
            v-bind:width="2"
            color="purple"
          ></v-progress-circular>
          <br />
          Đang tải dữ liệu
        </div>
        <v-data-table
          :headers="headersTraCuu"
          :items="listsTraCuu"
          :loading="loadingTableTraCuu"
          loading-text="Đang tải dữ liệu, vui lòng chờ giây lát!"
          no-data-text="Không có dữ liệu"
          :hide-default-header="false"
          hide-default-footer
          hide-actions
          v-show="!loadingTableTraCuu"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td
                v-for="(itemHeader, index) in headersTraCuu"
                class="text-xs-center"
              >
                <span v-if="itemHeader['display'] === 'stt'">{{
                  pageTraCuuThongKe * 20 - 20 + props.index + 1
                }}</span>
                <div v-else-if="itemHeader['display'] === 'action'">
                  <!-- <v-chip label outline color="blue" v-if="checkMtCore(props.item)" @click="xemHoSo(props.item)">Xem hồ sơ</v-chip> <br> -->

                  <v-chip
                    small
                    label
                    outline
                    color="blue"
                    :disabled="
                      !props.item['deliverableFileEntryid'] ||
                      props.item['deliverableFileEntryid'] === '0'
                    "
                    @click="xemGiayChungNhan(props.item)"
                  >
                    <v-icon
                      size="17"
                      style="font-size: 15px"
                      :color="
                        props.item['vr_VehicleTypeCertificate'] &&
                        props.item['vr_VehicleTypeCertificate'][
                          'deliverableFileEntryid'
                        ] &&
                        props.item['vr_VehicleTypeCertificate'][
                          'deliverableFileEntryid'
                        ] !== '0'
                          ? 'green'
                          : 'red'
                      "
                    >
                      {{
                        props.item["vr_VehicleTypeCertificate"] &&
                        props.item["vr_VehicleTypeCertificate"][
                          "deliverableFileEntryid"
                        ] &&
                        props.item["vr_VehicleTypeCertificate"][
                          "deliverableFileEntryid"
                        ] !== "0"
                          ? "done"
                          : "cancel"
                      }}
                    </v-icon>
                    <span style="cursor: pointer">Xem GCN</span>
                  </v-chip>
                  <br />

                  <!-- <v-chip small label outline color="blue" v-if="checkMtCore(props.item)" @click="xemBienBan(props.item)">Xem biên bản</v-chip> <br> -->
                  <v-chip
                    small
                    label
                    outline
                    color="blue"
                    style="cursor: pointer"
                    @click="xemTSKT(props.item)"
                  >
                    <v-icon
                      size="17"
                      style="font-size: 15px"
                      :color="
                        props.item['vr_VehicleTypeCertificate'] &&
                        props.item['vr_VehicleTypeCertificate'][
                          'inspectionDossierFileId'
                        ] &&
                        props.item['vr_VehicleTypeCertificate'][
                          'inspectionDossierFileId'
                        ] !== '0'
                          ? 'green'
                          : 'red'
                      "
                    >
                      {{
                        props.item["vr_VehicleTypeCertificate"] &&
                        props.item["vr_VehicleTypeCertificate"][
                          "inspectionDossierFileId"
                        ] &&
                        props.item["vr_VehicleTypeCertificate"][
                          "inspectionDossierFileId"
                        ] !== "0"
                          ? "done"
                          : "cancel"
                      }}
                    </v-icon>
                    <span style="cursor: pointer">Xem TSKT</span>
                  </v-chip>
                </div>

                <span v-else-if="itemHeader['display'] === 'vr_VehicleTypeCertificate.certificateRecordNo' || itemHeader['display'] === 'vr_VehicleTypeCertificate.certificateRecordDate'">
                  <span v-if="props.item['vr_VehicleTypeCertificate'] && props.item['vr_VehicleTypeCertificate']['certificateRecordStatus'] === 2 || props.item['vr_VehicleTypeCertificate']['certificateRecordStatus'] === '2' || props.item['vr_VehicleTypeCertificate']['certificateRecordStatus'] === 3 || props.item['vr_VehicleTypeCertificate']['certificateRecordStatus'] === '3'">
                    {{getDisplay(props.item, itemHeader['display'], itemHeader['type'])}}
                  </span>
                </span>

                <span v-else>{{
                  getDisplay(
                    props.item,
                    itemHeader["display"],
                    itemHeader["type"]
                  )
                }}</span>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="dialogTSKT"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class=""
          style="
            height: 63px;
            background: #2c4577;
            color: #fff;
            font-size: 20px;
            position: relative;
          "
        >
          Thông số kỹ thuật
          <v-btn
            dark
            icon
            style="position: absolute; right: 19px"
            class="mx-0 my-0"
            v-on:click.native="dialogTSKT = false"
          >
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-title>
        <div style="max-height: 690px; overflow: auto">
          <v-progress-linear
            v-if="loadingDialog"
            :indeterminate="true"
          ></v-progress-linear>
          <div id="alpacajs_form_KQ1" style="">
            <div class="top-bb">
              <div class="top-bb-header">
                <h3 style="font-size: 15px !important">
                  Biên bản thẩm định thiết kế của
                  <span id="tenBienBanTSKT"></span>
                </h3>
              </div>
              <div class="top-bb-header" style="line-height: 32px">
                <label>Số biên bản:</label>
                <span id="column-so_bien_ban">
                  <div
                    class="alpaca-layout-binding-holder"
                    alpaca-layout-binding-field-name="so_bien_ban"
                  >
                    <div id="so_bien_ban"></div>
                  </div>
                </span>
              </div>
              <div class="top-bb-header" style="line-height: 32px">
                <label>Số Giấy chứng nhận:</label>
                <span id="gcn-auto"></span
                >
              </div>
              <div class="top-bb-content pl-2">
                <label>Đăng kiểm viên chính:</label>
                <span id="column-dang_kiem_vien_chinh">
                  <div id="dang_kiem_vien_chinh"></div>
                </span>
              </div>
              <div class="top-bb-content pl-2">
                <label>Đăng kiểm viên hỗ trợ:</label>
                <span id="column-dang_kiem_vien_ho_tro">
                  <div id="dang_kiem_vien_ho_tro"></div>
                </span>
              </div>
              <div class="top-bb-content pl-2">
                <label>Ngày thẩm định: từ</label>
                <span id="column-ngay_bat_dau_tham_dinh">
                  <div id="ngay_bat_dau_tham_dinh" style="width: auto;"></div>
                </span>
                <label style="width: auto;">&nbsp;&nbsp;&nbsp; đến &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <span id="column-ngay_ket_thuc_tham_dinh">
                  <div id="ngay_ket_thuc_tham_dinh"></div>
                </span>
              </div>
              <div class="top-bb-content pl-2">
                <label>Loại hình thiết kế:</label>
                <span id="column-loai_hinh_thiet_ke">
                  <div
                    class="alpaca-layout-binding-holder"
                    alpaca-layout-binding-field-name="loai_hinh_thiet_ke_text"
                  >
                    <div id="loai_hinh_thiet_ke_text"></div>
                  </div>
                </span>
              </div>
              <div class="top-bb-content pl-2">
                <label>Loại hồ sơ:</label>
                <span id="column-hinh_thuc_cap_giay">
                  <div
                    class="alpaca-layout-binding-holder"
                    alpaca-layout-binding-field-name="hinh_thuc_cap_giay"
                  >
                    <div id="hinh_thuc_cap_giay_text"></div>
                  </div>
                </span>
              </div>
              <div class="top-bb-content pl-2">
                <label>Tài liệu đính kèm:</label>
                <div id="div-uploadfile" style="padding: 0px 10px"></div>
              </div>
              <div class="top-bb-title">I. THÔNG TIN CHUNG</div>
              <div class="top-bb-ndtd-left" style="border-left: 1px solid #ccc">
                Nội dung
              </div>
              <div class="top-bb-ndtd-mid">Thông tin khai báo</div>
              <div class="top-bb-ndtd-mid">Thông tin xác nhận</div>
              <div
                class="top-bb-ndtd-right"
                style="border-right: 1px solid #ccc"
              ></div>

              <div class="lv-one">
                <div class="lv-title">1. Cơ sở thiết kế</div>
                <div class="lv-content">
                  <div class="lv-three">
                    <div class="content-label">1.1. Tên</div>
                    <div class="content-thiet-ke">
                      <div id="column-ten_co_so_thiet_ke">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="lb_ten_co_so_thiet_ke"
                        >
                          <span
                            class="alpaca-control"
                            id="ten_co_so_thiet_ke"
                            name="lb_ten_co_so_thiet_ke"
                            autocomplete="off"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="content-thiet-ke">
                      <div id="column-bb-ten_co_so_thiet_ke">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="bb_ten_co_so_thiet_ke"
                        >
                          <div id="bb_ten_co_so_thiet_ke"></div>
                        </div>
                      </div>
                    </div>
                    <div class="content-ket-luan">
                      <div id="column-kl-ten_co_so_thiet_ke">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="kl_ten_co_so_thiet_ke"
                        >
                          <div id="kl_ten_co_so_thiet_ke"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="lv-three">
                    <div class="content-label">1.2. Địa chỉ</div>
                    <div class="content-thiet-ke">
                      <div id="column-dia_chi_co_so_thiet_ke">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="lb_dia_chi_co_so_thiet_ke"
                        >
                          <span
                            class="alpaca-control"
                            id="dia_chi_co_so_thiet_ke"
                            name="lb_dia_chi_co_so_thiet_ke"
                            autocomplete="off"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="content-thiet-ke">
                      <div id="column-bb-dia_chi_co_so_thiet_ke">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="bb_dia_chi_co_so_thiet_ke"
                        >
                          <div id="bb_dia_chi_co_so_thiet_ke"></div>
                        </div>
                      </div>
                    </div>
                    <div class="content-ket-luan">
                      <div id="column-kl-dia_chi_co_so_thiet_ke">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="kl_dia_chi_co_so_thiet_ke"
                        >
                          <div id="kl_dia_chi_co_so_thiet_ke"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="lv-three">
                    <div class="content-label">1.3. Người đại diện</div>
                    <div class="content-thiet-ke">
                      <div id="column-XCG01003">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="lb_XCG01003"
                        >
                          <span
                            class="alpaca-control"
                            id="lb_XCG01003"
                            name="lb_XCG01003"
                            autocomplete="off"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="content-thiet-ke">
                      <div id="column-bb-XCG01003">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="bb_XCG01003"
                        >
                          <div id="bb_XCG01003"></div>
                        </div>
                      </div>
                    </div>
                    <div class="content-ket-luan">
                      <div id="column-kl-XCG01003">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="kl_XCG01003"
                        >
                          <div id="kl_XCG01003"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="lv-three">
                    <div class="content-label">1.4. Số điện thoại</div>
                    <div class="content-thiet-ke">
                      <div id="column-XCG01005">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="lb_XCG01005"
                        >
                          <span
                            class="alpaca-control"
                            id="lb_XCG01005"
                            name="lb_XCG01005"
                            autocomplete="off"
                          ></span>
                        </div>
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="XCG01004"
                        >
                          <div id="XCG01004"></div>
                        </div>
                      </div>
                    </div>
                    <div class="content-thiet-ke">
                      <div id="column-bb-XCG01005">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="bb_XCG01005"
                        >
                          <div id="bb_XCG01005"></div>
                        </div>
                      </div>
                    </div>
                    <div class="content-ket-luan">
                      <div id="column-kl-XCG01005">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="kl_XCG01005"
                        >
                          <div id="kl_XCG01005"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="lv-three">
                    <div class="content-label">1.5. Thư điện tử (Email)</div>
                    <div class="content-thiet-ke">
                      <div id="column-XCG01006">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="lb_XCG01006"
                        >
                          <span
                            class="alpaca-control"
                            id="lb_XCG01006"
                            name="lb_XCG01006"
                            autocomplete="off"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="content-thiet-ke">
                      <div id="column-bb-XCG01006">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="bb_XCG01006"
                        >
                          <div id="bb_XCG01006"></div>
                        </div>
                      </div>
                    </div>
                    <div class="content-ket-luan">
                      <div id="column-kl-XCG01006">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="kl_XCG01006"
                        >
                          <div id="kl_XCG01006"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="lv-one">
                <div class="lv-title">
                  2. Cơ sở sản xuất, lắp ráp, nhập khẩu
                </div>
                <div class="lv-content">
                  <div class="lv-three">
                    <div class="content-label">2.1. Tên</div>
                    <div class="content-thiet-ke">
                      <div id="column-XCG01001">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="lb_XCG01001"
                        >
                          <span
                            class="alpaca-control"
                            id="lb_XCG01001"
                            name="lb_XCG01001"
                            autocomplete="off"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="content-thiet-ke">
                      <div id="column-bb-XCG01001">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="bb_XCG01001"
                        >
                          <div id="bb_XCG01001"></div>
                        </div>
                      </div>
                    </div>
                    <div class="content-ket-luan">
                      <div id="column-kl-XCG01001">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="kl_XCG01001"
                        >
                          <div id="kl_XCG01001"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="lv-three">
                    <div class="content-label">2.2. Địa chỉ</div>
                    <div class="content-thiet-ke">
                      <div id="column-XCG01002">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="lb_XCG01002"
                        >
                          <span
                            class="alpaca-control"
                            id="lb_XCG01002"
                            name="lb_XCG01002"
                            autocomplete="off"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="content-thiet-ke">
                      <div id="column-bb-XCG01002">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="bb_XCG01002"
                        >
                          <div id="bb_XCG01002"></div>
                        </div>
                      </div>
                    </div>
                    <div class="content-ket-luan">
                      <div id="column-kl-XCG01002">
                        <div
                          class="alpaca-layout-binding-holder"
                          alpaca-layout-binding-field-name="kl_XCG01002"
                        >
                          <div id="kl_XCG01002"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="lv-one">
              <div class="lv-title">3. Thông tin tham chiếu</div>
              <div class="lv-content">
                <div class="lv-three">
                  <div class="content-label">
                    3.1. Số tham chiếu của xe cơ sở: (lấy từ dữ liệu của xe SXLR
                    hoặc nhập khẩu)
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-XCG01020">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="lb_XCG01020"
                      >
                        <span
                          class="alpaca-control"
                          id="lb_XCG01020"
                          name="lb_XCG01020"
                          autocomplete="off"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-bb-XCG01020">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="bb_XCG01020"
                      >
                        <div id="bb_XCG01020"></div>
                      </div>
                    </div>
                  </div>
                  <div class="content-ket-luan">
                    <div id="column-kl-XCG01020">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="kl_XCG01020"
                      >
                        <div id="kl_XCG01020"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="lv-three">
                  <div class="content-label">
                    3.2. Số tham chiếu của xe gốc bổ sung/mở rộng: (lấy từ dữ
                    liệu TĐTK)
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-"></div>
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-bb-"></div>
                  </div>
                  <div class="content-ket-luan"></div>
                </div>
              </div>
            </div>

            <div class="lv-one">
              <div class="lv-title">4. Thông tin Quy chuẩn áp dụng</div>
              <div class="lv-content">
                <div class="lv-three">
                  <div class="content-label">4.1. Quy chuẩn an toàn chung</div>
                  <div class="content-thiet-ke">
                    <div id="column-XCG01031">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="lb_XCG01031"
                      >
                        <span
                          class="alpaca-control"
                          id="lb_XCG01031"
                          name="lb_XCG01031"
                          autocomplete="off"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-bb-XCG01031">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="bb_XCG01031"
                      >
                        <div id="bb_XCG01031_text"></div>
                      </div>
                    </div>
                  </div>
                  <div class="content-ket-luan">
                    <div id="column-kl-XCG01031">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="kl_XCG01031"
                      >
                        <div id="kl_XCG01031"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="lv-three">
                  <div class="content-label">4.2. Quy chuẩn khí thải</div>
                  <div class="content-thiet-ke">
                    <div id="column-XCG01032">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="lb_XCG01032"
                      >
                        <span
                          class="alpaca-control"
                          id="lb_XCG01032"
                          name="lb_XCG01032"
                          autocomplete="off"
                        ></span>
                      </div>
                      <!-- <div class="alpaca-layout-binding-holder" alpaca-layout-binding-field-name="XCG01032_text">
                                <div id="XCG01032_text"></div>
                             </div> -->
                    </div>
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-bb-XCG01032">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="bb_XCG01032"
                      >
                        <div id="bb_XCG01032_text"></div>
                      </div>
                    </div>
                  </div>
                  <div class="content-ket-luan">
                    <div id="column-kl-XCG01032">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="kl_XCG01032"
                      >
                        <div id="kl_XCG01032"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="lv-one">
              <div class="lv-title">5. Thông tin chung về kiểu loại xe</div>
              <div class="lv-content" style="border-bottom: 1px solid black">
                <div class="lv-three">
                  <div class="content-label">5.1. Ký hiệu thiết kế</div>
                  <div class="content-thiet-ke">
                    <div id="column-XCG01026">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="lb_XCG01026"
                      >
                        <span
                          class="alpaca-control"
                          id="lb_XCG01026"
                          name="lb_XCG01026"
                          autocomplete="off"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-bb-XCG01026">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="bb_XCG01026"
                      >
                        <div id="bb_XCG01026"></div>
                      </div>
                    </div>
                  </div>
                  <div class="content-ket-luan">
                    <div id="column-kl-XCG01026">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="kl_XCG01026"
                      >
                        <div id="kl_XCG01026"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="lv-three">
                  <div class="content-label">5.2. Loại phương tiện</div>
                  <div class="content-thiet-ke">
                    <div id="column-XCG01050">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="lb_XCG01050"
                      >
                        <span
                          class="alpaca-control"
                          id="lb_XCG01050"
                          name="lb_XCG01050"
                          autocomplete="off"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-bb-XCG01050">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="bb_XCG01050"
                      >
                        <div id="bb_XCG01050_text"></div>
                      </div>
                    </div>
                  </div>
                  <div class="content-ket-luan">
                    <div id="column-kl-XCG01050">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="kl_XCG01050"
                      >
                        <div id="kl_XCG01050"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="lv-three">
                  <div class="content-label">5.3. Nhãn hiệu</div>
                  <div class="content-thiet-ke">
                    <div id="column-XCG01051">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="lb_XCG01051"
                      >
                        <span
                          class="alpaca-control"
                          id="lb_XCG01051"
                          name="lb_XCG01051"
                          autocomplete="off"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-bb-XCG01051">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="bb_XCG01051"
                      >
                        <div id="bb_XCG01051_text"></div>
                      </div>
                    </div>
                  </div>
                  <div class="content-ket-luan">
                    <div id="column-kl-XCG01051">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="kl_XCG01051"
                      >
                        <div id="kl_XCG01051"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="lv-three">
                  <div class="content-label">5.4. Tên thương mại</div>
                  <div class="content-thiet-ke">
                    <div id="column-XCG01052">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="lb_XCG01052"
                      >
                        <span
                          class="alpaca-control"
                          id="lb_XCG01052"
                          name="lb_XCG01052"
                          autocomplete="off"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-bb-XCG01052">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="bb_XCG01052"
                      >
                        <div id="bb_XCG01052"></div>
                      </div>
                    </div>
                  </div>
                  <div class="content-ket-luan">
                    <div id="column-kl-XCG01052">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="kl_XCG01052"
                      >
                        <div id="kl_XCG01052"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="lv-three">
                  <div class="content-label">5.5. Mã kiểu loại</div>
                  <div class="content-thiet-ke">
                    <div id="column-XCG01053">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="lb_XCG01053"
                      >
                        <span
                          class="alpaca-control"
                          id="lb_XCG01053"
                          name="lb_XCG01053"
                          autocomplete="off"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="content-thiet-ke">
                    <div id="column-bb-XCG01053">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="bb_XCG01053"
                      >
                        <div id="bb_XCG01053"></div>
                      </div>
                    </div>
                  </div>
                  <div class="content-ket-luan">
                    <div id="column-kl-XCG01053">
                      <div
                        class="alpaca-layout-binding-holder"
                        alpaca-layout-binding-field-name="kl_XCG01053"
                      >
                        <div id="kl_XCG01053"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="top-bb">
              <div class="top-bb-title" style="margin-top: 0">
                II. Thẩm định thiết kế:
              </div>
              <div class="top-bb-ndtd-left">Nội dung</div>
              <div class="top-bb-ndtd-mid">Thông tin khai báo</div>
              <div class="top-bb-ndtd-mid">Thông tin xác nhận</div>
              <div class="top-bb-ndtd-right">Kết luận</div>
            </div>
            <div id="column-auto"></div>
            <div class="bot-bb">
              <div class="bot-bb-title" style="border-bottom: 0">
                III. GHI CHÚ:
              </div>
              <div class="content-stt">1</div>
              <div class="content-label" id="title_ghi_chu_1">
                Ghi chú để in chứng chỉ
              </div>
              <div class="content-ket-luan">
                <div id="ghi_chu_in_chung_chi"></div>
              </div>

              <div class="content-stt">2</div>
              <div class="content-label" id="title_ghi_chu_1">Ghi chú khác</div>
              <div class="content-ket-luan">
                <div id="ghi_chu_khac"></div>
              </div>

              <div class="content-stt">3</div>
              <div class="content-label" id="title_ghi_chu_1">
                Ghi chú không đạt (nếu có)
              </div>
              <div class="content-ket-luan">
                <div id="ghi_chu_khong_dat"></div>
              </div>

              <div style="width: 100%; border-top: 1px solid black">
                <div class="bot-bb-title">IV. KẾT LUẬN CHUNG</div>
                <div class="content-chung"><div id="dem-ket-qua"></div></div>
                <div class="content-chung">
                  <div
                    id="ket_luan_chung"
                    style="
                      font-size: 15px !important;
                      padding-left: 30px;
                      font-weight: bold;
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import supportData from "../store/support_data.json";
import configJSON from "../store/config.json";
import fakeJSON from "../store/fakeResponse.json";
// import FilterAdv from './dklr/hanghai_filter_adv.vue'
// import TinyPagination from './dklr/hanghai_pagination.vue'
// import DateTimePicker from './dklr/DateTimePicker.vue'
import axios from "axios";
import $ from "jquery";
import toastr from "toastr";
toastr.options = {
  closeButton: true,
  timeOut: "3000",
};
export default {
  props: ["codeTable"],
  components: {
    // 'tiny-pagination': TinyPagination,
    // 'jx-hanghai-filter-adv': FilterAdv,
    // 'DateTimePicker': DateTimePicker
  },
  computed: {},
  data: () => ({
    menuDateTraCuuFrom: false,
    date: "",
    menuDateTraCuuTo: false,
    dialogTSKT: false,
    loadingDialog: false,
    headersTraCuu: [],
    listsTraCuu: [],
    fileTemplateNo: "",
    dossierId: 0,
    dossierFileId: 0,
    modules: configJSON["modules"],
    loadingTableTraCuu: false,
    totalTraCuu: 0,
    lengthPageTraCuuThongKe: 0,
    pageTraCuuThongKe: 1,
    sourceTable: "",
    module: {},
    selectModule: {
      name: "Thẩm định thiết kế Xe cơ giới",
      children: [],
      level: 1,
      id: "TT302011BGTVTTDTKXCG",
      showLableSearch: false,
      doanhNghiep: null,
      listDoanhNghiep: [],
      module: "TT302011BGTVTTDTKXCG",
      pathParent: "Thẩm định thiết kế Xe cơ giới",
    },
    listSearch: [
      {
        index: 0,
        value: "",
        searchType: "",
        dataitem: "",
        dataCollection: [],
        conditionsSelect: {},
      },
    ],
    pageSize: 15,
    page: 1,
    isToggle: true,
    conditions: [],
    dataItem: supportData["dataItem"],
    dataItemString: supportData["dataItemString"],
    dataItemKeyword: supportData["dataItemKeyword"],
    supportData: supportData,
    headers: [],
    lists: [],
    rules: {
      required: (value) => !!value || "Trường yêu cầu bắt buộc.",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+ "))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email không hợp lệ.";
      },
    },
  }),
  beforeCreate() {
    var vm = this;
    vm.$nextTick(function () {});
  },
  created() {
    var vm = this;
    vm.$nextTick(function () {
      console.log("configJSON.module============", configJSON["module"]);
      let query = vm.$router.history.current.query;
      if (query && query["page"]) {
        vm.page = parseInt(query["page"]) || 1;
      } else {
        vm.page = 1;
      }
      vm.listsTraCuu = fakeJSON["fake"];
      vm.selectModuleAction();
      // this.getHeader(this.codeTable)
      // this.search()
    });
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      // let vm = this
      // let query = newRoute.query
      let query = newRoute.query;
      if (query && query["page"]) {
        this.page = parseInt(query["page"]) || 1;
      } else {
        this.page = 1;
      }
      // this.getHeader(this.codeTable)
      // this.search()
    },
  },
  methods: {
    checkSearch() {
      let vm = this;
      if (vm.listSearch && vm.listSearch["length"]) {
        for (var i = 0; i < vm.listSearch.length; i++) {
          let item = vm.listSearch[i];
          if (
            item &&
            item["conditionsSelect"] &&
            item["conditionsSelect"]["value"]
          ) {
            return true;
          }
        }
      }
      return false;
    },
    controlLimit: function (id_, response) {
      $("." + id_ + "Class").show("fast");
      $.each(response, function (k, v) {
        if (k == "TechSpecs") {
          $.each(v, function (key, ob) {
            $("#" + ob).val("");
            $("#div-" + ob).addClass(id_ + "Class");
            $("#div-" + ob).hide("fast");
          });
        }
      });
    },
    getDataLimit: function (id_, vehicletype, formulatype, callback) {
      let vm = this;
      $.ajax({
        headers: {
          module: "1",
          dossierId: "",
          dossierFileId: vm.dossierFileId,
          groupId: 55301,
        },
        data: "",
        type: "get",
        dataType: "json",
        url:
          "/o/rest/vr-app/techspecslimit/vehicleclass/XCG/vehicletype/" +
          vehicletype +
          "/formulatype/" +
          formulatype,
        success: function (response) {
          callback(response);
        },
      });
    },
    getTrackChanges: function (callback) {
      let vm = this;
      $.ajax({
        headers: {
          // groupId: 55301,
        },
        data: {
          // dossierid: vm.dossierId,
          // contentfiletemplate: "KQ1",
        },
        type: "get",
        dataType: "json",
        url: "/o/rest/v2/dossiers/files/" + vm.dossierFileId + "/formdata",
        success: function (response) {
          if (!response) {
            console.log('Not response getThongTinChungBB--------', response);
            return;
          }
          let data = response;
          if (data) {
            let tmp = {
              dang_kiem_vien_chinh: data["dang_kiem_vien_chinh"],
              dang_kiem_vien_ho_tro: data["dang_kiem_vien_ho_tro"],
              ngay_bat_dau_tham_dinh: data["ngay_bat_dau_tham_dinh"],
              ngay_ket_thuc_tham_dinh: data["ngay_ket_thuc_tham_dinh"],
              loai_hinh_thiet_ke_text: data["loai_hinh_thiet_ke_text"],
              hinh_thuc_cap_giay_text: data["hinh_thuc_cap_giay_text"],
              so_bien_ban: data["so_bien_ban"],
              phien_ban_gcn: data["phien_ban_gcn"],
              ten_co_so_thiet_ke: data["ten_co_so_thiet_ke"],
              bb_ten_co_so_thiet_ke: data["bb_ten_co_so_thiet_ke"],
              dia_chi_co_so_thiet_ke: data["dia_chi_co_so_thiet_ke"],
              bb_dia_chi_co_so_thiet_ke: data["bb_dia_chi_co_so_thiet_ke"],
              lb_XCG01003: data["lb_XCG01003"],
              bb_XCG01003: data["bb_XCG01003"],
              lb_XCG01005: data["lb_XCG01005"],
              bb_XCG01005: data["bb_XCG01005"],
              lb_XCG01006: data["lb_XCG01006"],
              bb_XCG01006: data["bb_XCG01006"],
              lb_XCG01001: data["lb_XCG01001"],
              bb_XCG01001: data["bb_XCG01001"],
              lb_XCG01002: data["lb_XCG01002"],
              bb_XCG01002: data["bb_XCG01002"],
              lb_XCG01020: data["lb_XCG01020"],
              bb_XCG01020: data["bb_XCG01020"],
              lb_XCG01031: data["lb_XCG01031"],
              bb_XCG01031: data["bb_XCG01031"],
              lb_XCG01032: data["lb_XCG01032"],
              XCG01032_text: data["XCG01032_text"],
              bb_XCG01031_text: data["bb_XCG01031_text"],
              bb_XCG01032_text: data["bb_XCG01032_text"],
              lb_XCG01026: data["lb_XCG01026"],
              bb_XCG01026: data["bb_XCG01026"],
              lb_XCG01050: data["lb_XCG01050"],
              bb_XCG01050_text: data["bb_XCG01050_text"],
              lb_XCG01051: data["lb_XCG01051"],
              bb_XCG01051: data["bb_XCG01051"],
              bb_XCG01051_text: data["bb_XCG01051_text"],
              lb_XCG01052: data["lb_XCG01052"],
              bb_XCG01052: data["bb_XCG01052"],
              lb_XCG01053: data["lb_XCG01053"],
              bb_XCG01053: data["bb_XCG01053"],
            };
            $("#tenBienBanTSKT").text(data["bb_XCG01050_text"]);
            $("#gcn-auto").text(data['so_chung_chi'] || data['so_gcn_auto']);
            for (var key in tmp) {
              $("#" + key).text(tmp[key]);
            }
            if (
              data["ket_luan_chung"] === 1 ||
              data["ket_luan_chung"] === "1"
            ) {
              $("#ket_luan_chung").text("Đạt yêu cầu");
            } else {
              $("#ket_luan_chung").text("Không đạt yêu cầu");
            }
            if (data["ghi_chu_khong_dat"]) {
              $("#ghi_chu_khong_dat").html(
                data["ghi_chu_khong_dat"].replace(/\n/g, "<br />")
              );
            }
            console.log("tmp==================", tmp);
          }
        },
      });
    },
    getSchema2: function (callback) {
      let vm = this;
      $.ajax({
        headers: {
          apikey: "1234567890",
          module: "",
          fileTemplateNo: vm.fileTemplateNo,
          dossierId: vm.dossierId,
          dossierFileId: vm.dossierFileId,
          groupId: 55301,
          flag: "bb",
        },
        data: "",
        type: "get",
        dataType: "json",
        url: "/o/rest/vr-app/techspecs/XCG/vehicleclassexts",
        success: function (response) {
          callback(response);
        },
      });
    },
    getSchema3: function (callback) {
      let vm = this;
      $.ajax({
        headers: {
          apikey: "1234567890",
          module: "",
          fileTemplateNo: vm.fileTemplateNo,
          dossierId: vm.dossierId,
          dossierFileId: vm.dossierFileId,
          groupId: 55301,
          flag: "bb",
        },
        data: "",
        type: "get",
        dataType: "json",
        url: "/o/rest/vr-app/techspecs/TDTKXCG/vehicleclassexts",
        success: function (response2) {
          callback(response2);
        },
      });
    },
    generalHtml2(mang_ts) {
      let vm = this;
      // $('#formType_hidden').addClass('formType');
      // $('#formType_hidden').val('dklr');
      // $('.formSchema').val(JSON.stringify(mang_ts));
      var var_array = [];
      var html_code = "",
        html_code1 = "",
        html_code2 = "",
        html_code3 = "";
      var var_lv, var_lv1, var_lv2, var_lv3;
      var var_type,
        var_key,
        var_title,
        var_value,
        var_items,
        var_basicunit,
        var_standard,
        var_result;
      var var_datasource, var_value_text, var_resultTD, var_placeholder;
      var index_var = 0,
        check_loai_dong_co = 0,
        html_loai_dong_co = "";

      var_array[index_var] = "trackChange_ghi_chu_in_chung_chi";
      index_var++;
      var_array[index_var] = "trackChange_ghi_chu_khac";
      index_var++;
      var_array[index_var] = "trackChange_ghi_chu_khong_dat";
      index_var++;
      var tong_no = 0;
      var tong_yes = 0;
      var tong_nil = 0;
      var value_text = "";

      $(mang_ts).each(function (key, value) {
        var_lv1 = mang_ts[key];
        html_code3 = "";
        $(var_lv1["items"]).each(function (key1, value1) {
          var_lv2 = var_lv1["items"][key1];
          var_type = var_lv2["type"];
          var_key = var_lv2["key"];
          var_title = var_lv2["title"];
          var_value = var_lv2["value"];
          var_value_text = var_lv2["value_text"];
          var_standard = var_lv2["standard"];
          var_basicunit = var_lv2["basicunit"];
          var_resultTD = var_lv2["resultTD"];
          var_result = var_lv2["result"];
          var_placeholder = var_lv2["placeholder"];
          var_array[index_var] = var_key;
          index_var++;
          var_array[index_var] = "bb_" + var_key;
          index_var++;
          var_array[index_var] = "kl_" + var_key;
          index_var++;
          var check_key = "trackChange_bb_" + var_key;
          var_array[index_var] = check_key;
          var_array.check_key = "";
          index_var++;
          var check_key = "trackChange_kl_" + var_key;
          var_array[index_var] = check_key;
          var_array.check_key = "";
          index_var++;
          if (var_key == "loai_dong_co" && check_loai_dong_co == 0) {
            check_loai_dong_co = 1;
            html_loai_dong_co = "";
            var_datasource = var_lv2["datasource"];
            value_text = "";
            if (var_result == "") {
              if (var_value == "")
                html_loai_dong_co +=
                  '<div class="lv-three nil" id="div-' + var_key + '">';
              else
                html_loai_dong_co +=
                  '<div class="lv-three" id="div-' + var_key + '">';
            } else if (var_result == "no")
              html_loai_dong_co +=
                '<div class="lv-three not-pass" id="div-' + var_key + '">';
            else if (var_result == "nil")
              html_loai_dong_co +=
                '<div class="lv-three nil" id="div-' + var_key + '">';
            else
              html_loai_dong_co +=
                '<div class="lv-three" id="div-' + var_key + '">';

            if (var_standard == "" && var_basicunit == "")
              html_loai_dong_co +=
                '<div class="content-label"><div><span>' +
                var_title +
                "</span></div></div>";
            else if (var_standard != "")
              html_loai_dong_co +=
                '<div class="content-label"><div><span>' +
                var_title +
                '</span> &nbsp;<span class="fa fa-info-circle" title="' +
                var_standard +
                '"></span></div></div>';
            else if (var_basicunit != "")
              html_loai_dong_co +=
                '<div class="content-label"><div><span>' +
                var_title +
                '</span>&nbsp;<i style="font-size: 13px;">' +
                var_basicunit +
                "</i></div></div>";

            html_loai_dong_co +=
              '<div class="content-thiet-ke">' +
              var_value_text +
              '<input type="hidden" name="' +
              var_key +
              '" id="' +
              var_key +
              '" value="' +
              var_value +
              '" /><input type="hidden" name="' +
              var_key +
              '_text" id="' +
              var_key +
              '_text" value="' +
              var_value_text +
              '" /></div>';
            html_loai_dong_co += '<div class="content-thiet-ke">';

            // html_loai_dong_co += '<select class="alpaca-control form-control my-select" id="bb_' + var_key + '" name="bb_' + var_key + '">';
            // html_loai_dong_co += '<option value="">'+var_placeholder+'</option>';
            // $.each(var_datasource, function (k, vl) {
            //   if (var_resultTD.toString() == var_datasource[k]['value'].toString()) {
            //     html_loai_dong_co += '<option selected value="' + var_datasource[k]['value'] + '">' + var_datasource[k]['text'] + '</option>';
            //     value_text = var_datasource[k]['text'];
            //   } else
            //     html_loai_dong_co += '<option value="' + var_datasource[k]['value'] + '">' + var_datasource[k]['text'] + '</option>';
            // });
            // html_loai_dong_co += '</select>';

            $.each(var_datasource, function (k, vl) {
              if (
                var_resultTD.toString() == var_datasource[k]["value"].toString()
              ) {
                value_text = var_datasource[k]["text"];
                html_loai_dong_co += var_datasource[k]["text"];
              }
            });

            html_loai_dong_co +=
              '<input type="hidden" id="bb_' +
              var_key +
              '_text" name="bb_' +
              var_key +
              '_text" value="' +
              value_text +
              '" />';

            html_loai_dong_co += "</div>";
            html_loai_dong_co += '<div class="content-ket-luan">';
            if (var_result == "no") {
              tong_no++;
              html_loai_dong_co += "Không đạt";
            } else if (var_result == "nil") {
              tong_nil++;
              html_loai_dong_co += "Không áp dụng";
            } else if (
              var_result !== "" &&
              var_result !== null &&
              var_result !== undefined
            ) {
              tong_yes++;
              html_loai_dong_co += "Đạt";
            }
            // html_loai_dong_co+='<select class="alpaca-control form-control check-result" name="kl_'+var_key+'" id="kl_'+var_key+'">';
            //   if (var_result == '') {
            //     if (var_value == '') {
            //       tong_nil++;
            //       html_loai_dong_co+='<option value="yes">Đạt</option>';
            //       html_loai_dong_co+='<option value="no">Không đạt</option>';
            //       html_loai_dong_co+='<option value="nil"  selected>Không áp dụng</option>';
            //     } else {
            //       tong_yes++;
            //       html_loai_dong_co+='<option value="yes" selected>Đạt</option>';
            //       html_loai_dong_co+='<option value="no">Không đạt</option>';
            //       html_loai_dong_co+='<option value="nil" >Không áp dụng</option>';
            //     }
            //   } else
            //   if (var_result == 'no') {
            //     tong_no++;
            //     html_loai_dong_co+='<option value="yes">Đạt</option>';
            //     html_loai_dong_co+='<option value="no" selected>Không đạt</option>';
            //     html_loai_dong_co+='<option value="nil" >Không áp dụng</option>';
            //   } else
            //   if (var_result == 'nil') {
            //     tong_nil++;
            //     html_loai_dong_co+='<option value="yes">Đạt</option>';
            //     html_loai_dong_co+='<option value="no" >Không đạt</option>';
            //     html_loai_dong_co+='<option value="nil" selected>Không áp dụng</option>';
            //   } else {
            //     tong_yes++;
            //     html_loai_dong_co+='<option selected value="yes">Đạt</option>';
            //     html_loai_dong_co+='<option value="no">Không đạt</option>';
            //     html_loai_dong_co+='<option value="nil" >Không áp dụng</option>';
            //   }
            // html_loai_dong_co+='</select>';
            html_loai_dong_co += "</div>";
            html_loai_dong_co += "</div>";
            var_array[index_var] = "bb_" + var_key + "_text";
            index_var++;
            var_array[index_var] = var_key + "_text";
            index_var++;
          } else {
            switch (var_type) {
              case "text":
              case "text1":
              case "text2":
              case "text3": {
                if (var_result == "") {
                  if (var_value == "")
                    html_code3 +=
                      '<div class="lv-three nil" id="div-' + var_key + '">';
                  else
                    html_code3 +=
                      '<div class="lv-three" id="div-' + var_key + '">';
                } else if (var_result == "no")
                  html_code3 +=
                    '<div class="lv-three not-pass" id="div-' + var_key + '">';
                else if (var_result == "nil")
                  html_code3 +=
                    '<div class="lv-three nil" id="div-' + var_key + '">';
                else
                  html_code3 +=
                    '<div class="lv-three" id="div-' + var_key + '">';

                if (var_standard == "" && var_basicunit == "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    "</span></div></div>";
                else if (var_standard != "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    '</span> &nbsp;<span class="fa fa-info-circle" title="' +
                    var_standard +
                    '"></span></div></div>';
                else if (var_basicunit != "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    '</span>&nbsp;<i style="font-size: 13px;">' +
                    var_basicunit +
                    "</i></div></div>";

                html_code3 +=
                  '<div class="content-thiet-ke">' +
                  var_value +
                  '<input type="hidden" name="' +
                  var_key +
                  '" id="' +
                  var_key +
                  '" value="' +
                  var_value +
                  '" /></div>';
                // html_code3+='<div class="content-thiet-ke text-thiet-ke"><input class="alpaca-control form-control" name="bb_'+var_key+'" id="bb_'+var_key+'" value="'+var_resultTD+'" /></div>';
                html_code3 +=
                  '<div class="content-thiet-ke text-thiet-ke">' +
                  var_resultTD +
                  "</div>";
                html_code3 += '<div class="content-ket-luan">';
                if (var_result == "no") {
                  tong_no++;
                  html_code3 += "Không đạt";
                } else if (var_result == "nil") {
                  tong_nil++;
                  html_code3 += "Không áp dụng";
                } else if (
                  var_result !== "" &&
                  var_result !== null &&
                  var_result !== undefined
                ) {
                  tong_yes++;
                  html_code3 += "Đạt";
                }
                // html_code3+='<select class="alpaca-control form-control check-result" name="kl_'+var_key+'" id="kl_'+var_key+'">';

                //   if (var_result == '') {
                //     if (var_value == '') {
                //       tong_nil++;
                //       html_code3+='<option value="yes">Đạt</option>';
                //       html_code3+='<option value="no">Không đạt</option>';
                //       html_code3+='<option value="nil"  selected>Không áp dụng</option>';
                //     } else {
                //       tong_yes++;
                //       html_code3+='<option value="yes" selected>Đạt</option>';
                //       html_code3+='<option value="no">Không đạt</option>';
                //       html_code3+='<option value="nil" >Không áp dụng</option>';
                //     }
                //   } else
                //   if (var_result == 'no') {
                //     tong_no++;
                //     html_code3+='<option value="yes">Đạt</option>';
                //     html_code3+='<option value="no" selected>Không đạt</option>';
                //     html_code3+='<option value="nil" >Không áp dụng</option>';
                //   } else
                //   if (var_result == 'nil') {
                //     tong_nil++;
                //     html_code3+='<option value="yes">Đạt</option>';
                //     html_code3+='<option value="no" >Không đạt</option>';
                //     html_code3+='<option value="nil" selected>Không áp dụng</option>';
                //   } else {
                //     tong_yes++;
                //     html_code3+='<option selected value="yes">Đạt</option>';
                //     html_code3+='<option value="no">Không đạt</option>';
                //     html_code3+='<option value="nil" >Không áp dụng</option>';
                //   }
                // html_code3+='</select>';
                html_code3 += "</div>";
                html_code3 += "</div>";
                break;
              }
              case "number":
              case "number1":
              case "number2":
              case "number3": {
                if (var_result == "") {
                  if (var_value == "")
                    html_code3 +=
                      '<div class="lv-three nil" id="div-' + var_key + '">';
                  else
                    html_code3 +=
                      '<div class="lv-three" id="div-' + var_key + '">';
                } else if (var_result == "no")
                  html_code3 +=
                    '<div class="lv-three not-pass" id="div-' + var_key + '">';
                else if (var_result == "nil")
                  html_code3 +=
                    '<div class="lv-three nil" id="div-' + var_key + '">';
                else
                  html_code3 +=
                    '<div class="lv-three" id="div-' + var_key + '">';

                if (var_standard == "" && var_basicunit == "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    "</span></div></div>";
                else if (var_standard != "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    '</span> &nbsp;<span class="fa fa-info-circle" title="' +
                    var_standard +
                    '"></span></div></div>';
                else if (var_basicunit != "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    '</span>&nbsp;<i style="font-size: 13px;">' +
                    var_basicunit +
                    "</i></div></div>";

                html_code3 +=
                  '<div class="content-thiet-ke">' +
                  var_value +
                  '<input type="hidden" name="' +
                  var_key +
                  '" id="' +
                  var_key +
                  '" value="' +
                  var_value +
                  '" /></div>';
                html_code3 +=
                  '<div class="content-thiet-ke text-thiet-ke"><input class="alpaca-control form-control" name="bb_' +
                  var_key +
                  '" id="bb_' +
                  var_key +
                  '" value="' +
                  var_resultTD +
                  '" /></div>';
                html_code3 += '<div class="content-ket-luan">';
                if (var_result == "no") {
                  tong_no++;
                  html_code3 += "Không đạt";
                } else if (var_result == "nil") {
                  tong_nil++;
                  html_code3 += "Không áp dụng";
                } else if (
                  var_result !== "" &&
                  var_result !== null &&
                  var_result !== undefined
                ) {
                  tong_yes++;
                  html_code3 += "Đạt";
                }
                // html_code3+='<select class="alpaca-control form-control check-result" name="kl_'+var_key+'" id="kl_'+var_key+'">';
                //   if (var_result == 'no') {
                //     if (var_value == '') {
                //       tong_nil++;
                //       html_code3+='<option value="yes">Đạt</option>';
                //       html_code3+='<option value="no">Không đạt</option>';
                //       html_code3+='<option value="nil"  selected>Không áp dụng</option>';
                //     } else {
                //       tong_yes++;
                //       html_code3+='<option value="yes" selected>Đạt</option>';
                //       html_code3+='<option value="no">Không đạt</option>';
                //       html_code3+='<option value="nil" >Không áp dụng</option>';
                //     }
                //   } else
                //   if (var_result == 'no') {
                //     tong_no++;
                //     html_code3+='<option value="yes">Đạt</option>';
                //     html_code3+='<option value="no" selected>Không đạt</option>';
                //     html_code3+='<option value="nil" >Không áp dụng</option>';
                //   } else
                //   if (var_result == 'nil') {
                //     tong_nil++;
                //     html_code3+='<option value="yes">Đạt</option>';
                //     html_code3+='<option value="no" >Không đạt</option>';
                //     html_code3+='<option value="nil" selected>Không áp dụng</option>';
                //   } else {
                //     tong_yes++;
                //     html_code3+='<option selected value="yes">Đạt</option>';
                //     html_code3+='<option value="no">Không đạt</option>';
                //     html_code3+='<option value="nil" >Không áp dụng</option>';
                //   }
                // html_code3+='</select>';
                html_code3 += "</div>";
                html_code3 += "</div>";
                break;
              }
              case "select":
              case "select1":
              case "select2":
              case "select3": {
                var_datasource = var_lv2["datasource"];
                value_text = "";
                if (var_result == "") {
                  if (var_value == "")
                    html_code3 +=
                      '<div class="lv-three nil" id="div-' + var_key + '">';
                  else
                    html_code3 +=
                      '<div class="lv-three" id="div-' + var_key + '">';
                } else if (var_result == "no")
                  html_code3 +=
                    '<div class="lv-three not-pass" id="div-' + var_key + '">';
                else if (var_result == "nil")
                  html_code3 +=
                    '<div class="lv-three nil" id="div-' + var_key + '">';
                else
                  html_code3 +=
                    '<div class="lv-three" id="div-' + var_key + '">';

                if (var_standard == "" && var_basicunit == "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    "</span></div></div>";
                else if (var_standard != "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    '</span> &nbsp;<span class="fa fa-info-circle" title="' +
                    var_standard +
                    '"></span></div></div>';
                else if (var_basicunit != "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    '</span>&nbsp;<i style="font-size: 13px;">' +
                    var_basicunit +
                    "</i></div></div>";

                html_code3 +=
                  '<div class="content-thiet-ke">' +
                  var_value_text +
                  '<input type="hidden" name="' +
                  var_key +
                  '" id="' +
                  var_key +
                  '" value="' +
                  var_value +
                  '" /><input type="hidden" name="' +
                  var_key +
                  '_text" id="' +
                  var_key +
                  '_text" value="' +
                  var_value_text +
                  '" /></div>';
                html_code3 += '<div class="content-thiet-ke">';

                // html_code3 += '<select class="alpaca-control form-control my-select" id="bb_' + var_key + '" name="bb_' + var_key + '">';
                // html_code3 += '<option value="">'+var_placeholder+'</option>';
                // $.each(var_datasource, function (k, vl) {
                //   if (var_resultTD.toString() == var_datasource[k]['value'].toString()) {
                //     html_code3 += '<option selected value="' + var_datasource[k]['value'] + '">' + var_datasource[k]['text'] + '</option>';
                //     value_text = var_datasource[k]['text'];
                //   } else
                //     html_code3 += '<option value="' + var_datasource[k]['value'] + '">' + var_datasource[k]['text'] + '</option>';
                // });
                // html_code3 += '</select>';
                $.each(var_datasource, function (k, vl) {
                  if (
                    var_resultTD.toString() ==
                    var_datasource[k]["value"].toString()
                  ) {
                    value_text = var_datasource[k]["text"];
                    html_code3 += var_datasource[k]["text"];
                  }
                });

                html_code3 +=
                  '<input type="hidden" id="bb_' +
                  var_key +
                  '_text" name="bb_' +
                  var_key +
                  '_text" value="' +
                  value_text +
                  '" />';

                html_code3 += "</div>";
                html_code3 += '<div class="content-ket-luan">';
                if (var_result == "no") {
                  tong_no++;
                  html_code3 += "Không đạt";
                } else if (var_result == "nil") {
                  tong_nil++;
                  html_code3 += "Không áp dụng";
                } else if (
                  var_result !== "" &&
                  var_result !== null &&
                  var_result !== undefined
                ) {
                  tong_yes++;
                  html_code3 += "Đạt";
                }
                // html_code3+='<select class="alpaca-control form-control check-result" name="kl_'+var_key+'" id="kl_'+var_key+'">';
                //   if (var_result == '') {
                //     if (var_value == '') {
                //       tong_nil++;
                //       html_code3+='<option value="yes">Đạt</option>';
                //       html_code3+='<option value="no">Không đạt</option>';
                //       html_code3+='<option value="nil" selected >Không áp dụng</option>';
                //     } else {
                //       tong_yes++;
                //       html_code3+='<option value="yes" selected>Đạt</option>';
                //       html_code3+='<option value="no">Không đạt</option>';
                //       html_code3+='<option value="nil" >Không áp dụng</option>';
                //     }
                //   } else
                //   if (var_result == 'no') {
                //     tong_no++;
                //     html_code3+='<option value="yes">Đạt</option>';
                //     html_code3+='<option value="no" selected>Không đạt</option>';
                //     html_code3+='<option value="nil" >Không áp dụng</option>';
                //   } else
                //   if (var_result == 'nil') {
                //     tong_nil++;
                //     html_code3+='<option value="yes">Đạt</option>';
                //     html_code3+='<option value="no" >Không đạt</option>';
                //     html_code3+='<option value="nil" selected>Không áp dụng</option>';
                //   } else {
                //     tong_yes++;
                //     html_code3+='<option selected value="yes">Đạt</option>';
                //     html_code3+='<option value="no">Không đạt</option>';
                //     html_code3+='<option value="nil" >Không áp dụng</option>';
                //   }
                // html_code3+='</select>';
                html_code3 += "</div>";
                html_code3 += "</div>";

                var_array[index_var] = "bb_" + var_key + "_text";
                index_var++;
                var_array[index_var] = var_key + "_text";
                index_var++;

                break;
              }
              case "textarea":
              case "textarea1":
              case "textarea2":
              case "textarea3": {
                if (var_result == "") {
                  if (var_value == "")
                    html_code3 +=
                      '<div class="lv-three nil" id="div-' + var_key + '">';
                  else
                    html_code3 +=
                      '<div class="lv-three" id="div-' + var_key + '">';
                } else if (var_result == "no")
                  html_code3 +=
                    '<div class="lv-three not-pass" id="div-' + var_key + '">';
                else if (var_result == "nil")
                  html_code3 +=
                    '<div class="lv-three nil" id="div-' + var_key + '">';
                else
                  html_code3 +=
                    '<div class="lv-three" id="div-' + var_key + '">';

                if (var_standard == "" && var_basicunit == "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    "</span></div></div>";
                else if (var_standard != "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    '</span> &nbsp;<span class="fa fa-info-circle" title="' +
                    var_standard +
                    '"></span></div></div>';
                else if (var_basicunit != "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    '</span>&nbsp;<i style="font-size: 13px;">' +
                    var_basicunit +
                    "</i></div></div>";

                html_code3 +=
                  '<div class="content-thiet-ke">' +
                  var_value +
                  '<input type="hidden" name="' +
                  var_key +
                  '" id="' +
                  var_key +
                  '" value="' +
                  var_value +
                  '" /></div>';
                html_code3 +=
                  '<div class="content-thiet-ke text-thiet-ke"><textarea name="bb_' +
                  var_key +
                  '" id="bb_' +
                  var_key +
                  '">' +
                  var_resultTD +
                  " </textarea></div>";
                html_code3 += '<div class="content-ket-luan">';
                if (var_result == "no") {
                  tong_no++;
                  html_code3 += "Không đạt";
                } else if (var_result == "nil") {
                  tong_nil++;
                  html_code3 += "Không áp dụng";
                } else if (
                  var_result !== "" &&
                  var_result !== null &&
                  var_result !== undefined
                ) {
                  tong_yes++;
                  html_code3 += "Đạt";
                }
                // html_code3+='<select class="alpaca-control form-control check-result" name="kl_'+var_key+'" id="kl_'+var_key+'">';
                //   if (var_result == 'no') {
                //     if (var_value == '') {
                //       tong_nil++;
                //       html_code3+='<option value="yes">Đạt</option>';
                //       html_code3+='<option value="no" >Không đạt</option>';
                //       html_code3+='<option value="nil" selected>Không áp dụng</option>';
                //     } else {
                //       tong_yes++;
                //       html_code3+='<option value="yes" selected>Đạt</option>';
                //       html_code3+='<option value="no">Không đạt</option>';
                //       html_code3+='<option value="nil" >Không áp dụng</option>';
                //     }
                //   } else if (var_result == 'no') {
                //     tong_no++;
                //     html_code3+='<option value="yes">Đạt</option>';
                //     html_code3+='<option value="no" selected>Không đạt</option>';
                //     html_code3+='<option value="nil" >Không áp dụng</option>';
                //   } else if (var_result == 'nil') {
                //     tong_nil++;
                //     html_code3+='<option value="yes">Đạt</option>';
                //     html_code3+='<option value="no" >Không đạt</option>';
                //     html_code3+='<option value="nil" selected>Không áp dụng</option>';
                //   } else {
                //     tong_yes++;
                //     html_code3+='<option selected value="yes">Đạt</option>';
                //     html_code3+='<option value="no">Không đạt</option>';
                //     html_code3+='<option value="nil" >Không áp dụng</option>';
                //   }
                // html_code3+='</select>';
                html_code3 += "</div>";
                html_code3 += "</div>";
                break;
              }
              default: {
                if (var_result == "") {
                  if (var_value == "")
                    html_code3 +=
                      '<div class="lv-three nil" id="div-' + var_key + '">';
                  else
                    html_code3 +=
                      '<div class="lv-three" id="div-' + var_key + '">';
                } else if (var_result == "no")
                  html_code3 +=
                    '<div class="lv-three not-pass" id="div-' + var_key + '">';
                else if (var_result == "nil")
                  html_code3 +=
                    '<div class="lv-three nil" id="div-' + var_key + '">';
                else
                  html_code3 +=
                    '<div class="lv-three" id="div-' + var_key + '">';

                if (var_standard == "" && var_basicunit == "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    "</span></div></div>";
                else if (var_standard != "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    '</span> &nbsp;<span class="fa fa-info-circle" title="' +
                    var_standard +
                    '"></span></div></div>';
                else if (var_basicunit != "")
                  html_code3 +=
                    '<div class="content-label"><div><span>' +
                    var_title +
                    '</span>&nbsp;<i style="font-size: 13px;">' +
                    var_basicunit +
                    "</i></div></div>";

                html_code3 +=
                  '<div class="content-thiet-ke">' +
                  var_value +
                  '<input type="hidden" name="' +
                  var_key +
                  '" id="' +
                  var_key +
                  '" value="' +
                  var_value +
                  '" /></div>';
                html_code3 +=
                  '<div class="content-thiet-ke text-thiet-ke"><input type="hidden" class="alpaca-control form-control" name="bb_' +
                  var_key +
                  '" id="bb_' +
                  var_key +
                  '" value="' +
                  var_resultTD +
                  '" /></div>';
                html_code3 += '<div class="content-ket-luan">';
                html_code3 +=
                  '<input type="hidden" name="kl_' +
                  var_key +
                  '" id="kl_' +
                  var_key +
                  '" value="" />';

                html_code3 += "</div>";
                html_code3 += "</div>";
                break;
              }
            }
          }
        });
        if (html_code3 == "") {
          var_key = var_lv1["key"];
          var_array[index_var] = var_key;
          index_var++;

          var_type = var_lv1["type"];
          var_title = var_lv1["title"];
          var_value = var_lv1["value"];
          var_standard = var_lv1["standard"];
          var_result = var_lv1["result"];
          var_basicunit = var_lv1["basicunit"];
          html_code += '<div class="lv-one">';
          html_code += '<div class="lv-title">' + var_title + "</div>";
          html_code += html_code3;
          html_code += "</div>";
          if (check_loai_dong_co == 1) {
            check_loai_dong_co = 2;
            html_code += '<div class="lv-one">';
            html_code += '<div class="lv-title"></div>';
            html_code += html_loai_dong_co;
            html_code += "</div>";
          }
        } else {
          var_key = var_lv1["key"];
          var_array[index_var] = var_key;
          index_var++;
          var_title = var_lv1["title"];
          html_code += '<div class="lv-one">';
          html_code += '<div class="lv-title">' + var_title + "</div>";
          html_code += '<div class="lv-content">';
          html_code += html_code3;
          html_code += "</div>";
          html_code += "</div>";

          if (check_loai_dong_co == 1) {
            check_loai_dong_co = 2;
            html_code += '<div class="lv-one">';
            html_code += '<div class="lv-title"></div>';
            html_code += html_loai_dong_co;
            html_code += "</div>";
          }
        }
      });

      $("#column-auto").html(html_code);

      $(".lv-three").mouseover(function () {
        $(this).addClass("ob-focus");
      });
      $(".lv-three").mouseout(function () {
        $(this).removeClass("ob-focus");
      });

      $("#loai_hinh_thiet_ke").addClass("my-select");
      $("#hinh_thuc_cap_giay").addClass("my-select");
      $("#bb_XCG01050").addClass("my-select");
      $("#bb_XCG01051").addClass("my-select");
      $("#bb_XCG01031").addClass("my-select");
      $("#bb_XCG01032").addClass("my-select");
      $("#bb_loai_dong_co").addClass("my-select");

      var bien =
        "kl_ten_co_so_thiet_ke,kl_dia_chi_co_so_thiet_ke,kl_XCG01003,kl_XCG01005,kl_XCG01006,kl_XCG01001,kl_XCG01002,kl_XCG01020,kl_XCG01031,kl_XCG01032,kl_XCG01026,kl_XCG01050,kl_XCG01051,kl_XCG01052,kl_XCG01053";
      var m = bien.split(",");
      for (var i = 0; i < m.length; i++) {
        $("#" + m[i]).addClass("check-result2");
        if ($("#" + m[i]).val() == "no")
          $("#" + m[i])
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .addClass("not-pass");
        if ($("#" + m[i]).val() == "nil")
          $("#" + m[i])
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .addClass("nil");
      }
      for (var z = 1; z < 10; z++) {
        var text = "bb_TDTKXCG00" + parseInt(z);
        $("#" + text).hide();
      }
      for (var y = 10; y < 37; y++) {
        var text = "bb_TDTKXCG0" + parseInt(y);
        $("#" + text).hide();
      }
      $(".my-select").change(function () {
        var id_ = $(this).attr("id");
        var gt = $("#" + id_ + " option:selected").text();
        $("#" + id_ + "_text").val(gt);
      });
      $("#bb_loai_dong_co").change(function () {
        var dong_co = $("#bb_loai_dong_co").val();
        if (dong_co == "") {
          $("#XCG01277").parent().parent().parent().parent().show();
          $("#XCG01300").parent().parent().parent().parent().show();
          $("#XCG01255").parent().parent().parent().parent().show();

          $("#XCG01277").parent().parent().parent().hide();
          $("#XCG01300").parent().parent().parent().hide();
          $("#XCG01255").parent().parent().parent().hide();

          $("#XCG01277")
            .parent()
            .parent()
            .parent()
            .parent()
            .find(".lv-title")
            .click(false);
          $("#XCG01300")
            .parent()
            .parent()
            .parent()
            .parent()
            .find(".lv-title")
            .click(false);
          $("#XCG01255")
            .parent()
            .parent()
            .parent()
            .parent()
            .find(".lv-title")
            .click(false);
        }
        if (dong_co == "hybrid") {
          for (var i = 79; i < 100; i++) {
            var key = "bb_XCG012" + parseInt(i);
            $("#" + key).val("");
          }
          $("#XCG01277")
            .parent()
            .parent()
            .parent()
            .find(".lv-title")
            .click(true);
          $("#XCG01277").parent().parent().parent().parent().show();
          $("#XCG01277").parent().parent().parent().show();
          $("#XCG01300").parent().parent().parent().parent().hide();
          $("#XCG01255").parent().parent().parent().parent().hide();
        }
        if (dong_co == "chay_dien") {
          for (var i = 2; i < 9; i++) {
            var key = "bb_XCG0130" + parseInt(i);
            $("#" + key).val("");
          }
          $("#XCG01300")
            .parent()
            .parent()
            .parent()
            .find(".lv-title")
            .click(true);
          $("#XCG01300").parent().parent().parent().parent().show();
          $("#XCG01300").parent().parent().parent().show();
          $("#XCG01277").parent().parent().parent().parent().hide();
          $("#XCG01255").parent().parent().parent().parent().hide();
        }
        if (dong_co == "dot_trong") {
          for (var i = 57; i < 77; i++) {
            var key = "bb_XCG012" + parseInt(i);
            $("#" + key).val("");
          }
          $("#XCG01255")
            .parent()
            .parent()
            .parent()
            .find(".lv-title")
            .click(true);
          $("#XCG01255").parent().parent().parent().parent().show();
          $("#XCG01255").parent().parent().parent().show();
          $("#XCG01300").parent().parent().parent().parent().hide();
          $("#XCG01277").parent().parent().parent().parent().hide();
        }
      });
      $('.lv-one .lv-label:contains("II.5.4")').css("display", "none");
      $("#kl_loai_dong_co").hide();
      $("#loai_dong_co").parent().hide();
      $("#XCG140").parent().parent().hide();
      $("#XCG140").parent().parent();
      $("#XCG054").parent().parent().hide();
      var func_ket_luan = function () {
        var tg_dem =
          '<table border="0" style="width:600px" cellpadding="5"><tr><td>Kết luận đạt: <b>' +
          tong_yes +
          "</b></td><td>Kết luận không đạt: <b>" +
          tong_no +
          "</b></td><td>Kết luận không áp dụng: <b>" +
          tong_nil +
          "</b></td></tr></table>";
        $("#dem-ket-qua").html(tg_dem);
        console.log("tg_dem============", tg_dem);
      };

      var f_count_result = function () {
        tong_yes = 0;
        tong_no = 0;
        tong_nil = 0;
        $(".bien-ban-tham-dinh")
          .find(".check-result")
          .each(function () {
            var id_ = $(this).attr("id");
            var gt = $("#" + id_ + " option:selected").val();
            if (gt == "no") {
              tong_no++;
            } else if (gt == "nil") {
              tong_nil++;
            } else {
              tong_yes++;
            }
          });
        func_ket_luan();
      };

      $(".check-result").change(function () {
        var id_ = $(this).attr("id");
        var gt = $("#" + id_ + " option:selected").val();
        if (gt == "no") {
          $("#" + id_)
            .parent()
            .parent()
            .addClass("not-pass");
        } else {
          $("#" + id_)
            .parent()
            .parent()
            .removeClass("not-pass");
        }
        if (gt == "nil") {
          $("#" + id_)
            .parent()
            .parent()
            .addClass("nil");
        } else {
          $("#" + id_)
            .parent()
            .parent()
            .removeClass("nil");
        }
        f_count_result();
      });

      func_ket_luan();

      $(".check-result2").change(function () {
        var id_ = $(this).attr("id");
        var gt = $("#" + id_ + " option:selected").val();
        if (gt == "no") {
          $("#" + id_)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .addClass("not-pass");
        } else
          $("#" + id_)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .removeClass("not-pass");
        if (gt == "nil") {
          $("#" + id_)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .addClass("nil");
        } else
          $("#" + id_)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .removeClass("nil");
      });
      var id_ = "bb_XCG01070";
      var lpt = $("#bb_XCG01050").val();
      var val_ = $("#bb_XCG01070").val();
      if (val_ != "" && lpt != "") {
        vm.getDataLimit(id_, lpt, val_, function (response) {
          vm.getDataLimitcontrolLimit(id_, response);
        });
      }
      $("#bb_XCG01070").change(function () {
        var id_ = $(this).attr("id");
        var val_ = $(this).val();
        var lpt = $("#bb_XCG01050").val();
        if (val_ != "" && lpt != "") {
          vm.getDataLimit(id_, lpt, val_, function (response) {
            vm.controlLimit(id_, response);
          });
        } else {
          $("." + id_ + "Class").show("fast");
        }
      });

      $("#bb_XCG01050_text").val($("#bb_XCG01050 option:selected").text());
      $("#bb_XCG01051_text").val($("#bb_XCG01051 option:selected").text());
    },
    parseDate2(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDateTraCuuFrom(item) {
      let vm = this;
      item["fromDate"] = vm.parseDate2(item["fromDateTraCuu"]);
    },
    parseDateTraCuuTo(item) {
      let vm = this;
      item["toDate"] = vm.parseDate2(item["toDateTraCuu"]);
    },
    selectModuleAction() {
      let vm = this;
      console.log("selectModule+++++", vm.selectModule);
      vm.listsTraCuu = [];
      vm.lengthPageTraCuuThongKe = 0;
      vm.pageTraCuuThongKe = 1;
      vm.listSearch = [
        {
          index: 0,
          value: null,
          searchType: null,
          dataitem: null,
          dataCollection: [],
          conditionsSelect: {},
          typeSearchItems: [],
        },
      ];
      if (vm.selectModule && vm.selectModule["module"] === "COP") {
        vm.headersTraCuu = configJSON.headersCOP;
        vm.conditions = configJSON.conditionsCOP;
        vm.soureTable = "vr_COPReportRepository";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTTDTKXCG"
      ) {
        vm.headersTraCuu = configJSON.headersThamDinh;
        vm.conditions = configJSON.conditionsTDTKXCG;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTTDTKXMCD"
      ) {
        vm.headersTraCuu = configJSON.headersThamDinh;
        vm.conditions = configJSON.conditionsTDTKXMCD;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTKTSPMXCG"
      ) {
        vm.headersTraCuu = configJSON.headersKiemTraSanPhamMau;
        vm.conditions = configJSON.conditionsKTSPMXCG;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTKTSPMXCNBB"
      ) {
        vm.headersTraCuu = configJSON.headersKiemTraSanPhamMau;
        vm.conditions = configJSON.conditionsKTSPMXCNBB;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTCNCLKLTXXCG"
      ) {
        vm.headersTraCuu = configJSON.headersCNCLKL;
        vm.conditions = configJSON.conditionsCNCLKLXCG;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTCNCLKLTXXMTGM"
      ) {
        vm.headersTraCuu = configJSON.headersCNCLKL;
        vm.conditions = configJSON.conditionsCNCLKLXMY;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTCNCLKLLKOTO"
      ) {
        vm.headersTraCuu = configJSON.headersCNCLKL;
        vm.conditions = configJSON.conditionsCNCLKLLKXCG;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTCNCLKLLKXM"
      ) {
        vm.headersTraCuu = configJSON.headersCNCLKL;
        vm.conditions = configJSON.conditionsCNCLKLLKXMY;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTCNCLKLTXXBBCN"
      ) {
        vm.headersTraCuu = configJSON.headersCNCLKL;
        vm.conditions = configJSON.conditionsCNCLKLXCN;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTCNCLKLTXXBBCH"
      ) {
        vm.headersTraCuu = headersCNCLKL;
        vm.conditions = conditionsCNCLKLXCH;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        vm.selectModule["module"] === "TT302011BGTVTCNCLKLTXXDD"
      ) {
        vm.headersTraCuu = configJSON.headersCNCLKL;
        vm.conditions = configJSON.conditionsCNCLKLXDD;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else if (
        vm.selectModule &&
        (vm.selectModule["module"] === "TT302011BGTVTKTSPMXBBCN" ||
          vm.selectModule["module"] === "TT302011BGTVTKTSPMXCG")
      ) {
        vm.headersTraCuu = configJSON.headersThamDinh;
        vm.conditions = configJSON.conditionsKTSPMXCG;
        vm.soureTable = "vr_VehicleTypeCertificate";
      } else {
        vm.headersTraCuu = configJSON.headersCNCLKL;
        vm.conditions = configJSON.conditionsCNCLKL;
        vm.soureTable = "vr_VehicleTypeCertificate";
      }
      if (vm.selectModule["vehicleClass"] && vm.selectModule["table"]) {
        vm.getTSKT(vm.selectModule["vehicleClass"], vm.selectModule["table"]);
      }
      console.log("vm.conditions===============", vm.conditions);
    },
    checkMtCore(item) {
      let vm = this;
      let result = "";
      let ref = vm.soureTable + ".mtCore";
      let arrKey = ref.split(".");
      for (var i = 0; i < arrKey.length; i++) {
        let key = arrKey[i];
        if (typeof result === "object" && result.constructor === Object) {
          result = result[key];
        } else {
          result = item[key];
        }
      }
      if (result && (result === 1 || result === "1")) {
        return true;
      } else {
        return false;
      }
    },
    parseTimestamp(str) {
      if (!str) {
        return 0;
      }
      var dateString = str;
      var dateMomentObject = moment(dateString, "DD/MM/YYYY");
      var dateObject = dateMomentObject.toDate();
      return dateObject.getTime() || 0;
    },
    getCurrentTime() {
      let date = new Date();
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    },
    getSelect: function (item) {
      if (item['conditionsSelect'] && item['conditionsSelect']['url']) {
        $.ajax({
          url: item['conditionsSelect']['url'],
          headers: {
            groupId: 55301
          },
          dataType: 'json',
          success: function (result) {
            var data = result['data'] || result['Items']
            if (data && data['length']) {
              data = data.map(function (itemResponse) {
                return {
                  itemText: itemResponse[item['conditionsSelect']['itemText']] || itemResponse['value'],
                  itemValue: itemResponse[item['conditionsSelect']['itemValue']] || itemResponse['key']
                }
              })
            }
            if (item['conditionsSelect']) {
              item['conditionsSelect']['items'] = data || []
            }
          }
        })
      }
    },
    changeCondition(item) {
      var vm = this;
      var conditionsSelect = item["conditionsSelect"];
      item["valueSearch"] = "";
      console.log("conditionsSelect=============", conditionsSelect);
      if (conditionsSelect && conditionsSelect["type"]) {
        console.log(
          "conditionsSelect=======TYPE======",
          conditionsSelect["type"]
        );
        if (conditionsSelect["type"] === "string") {
          item["typeSearch"] = "like";
          item["typeSearchItems"] = this.dataItemString;
        } else if (conditionsSelect["type"] === "keyword") {
          item["typeSearch"] = "=";
          item["typeSearchItems"] = this.dataItemKeyword;
        } else if (conditionsSelect["type"] === "number") {
          item["typeSearch"] = "=";
          item["typeSearchItems"] = this.dataItem;
          item["valueSearch"] = 0;
        } else if (conditionsSelect["type"] === "select") {
          // item["typeSearch"] = "=";
          // item["typeSearchItems"] = this.dataItemString;
          item['typeSearch'] = '='
          item['typeSearchItems'] = this.dataItemString
          if (conditionsSelect['url']) {
            vm.getSelect(item)
          }
          item['valueSearch'] = ''
        } else {
          item["fromDate"] = this.getCurrentTime() || "";
          item["toDate"] = this.getCurrentTime() || "";
        }
      } else {
        item["typeSearch"] = "=";
      }
      console.log("item=============", item);
    },
    getTSKT(vehicleclass, table) {
      let vm = this;
      if (!vehicleclass) {
        return new Promise();
      }
      let url =
        "/o/rest/vr-app/techspecs/" + vehicleclass + "/vehicleclassexts";
      let urlTDTK =
        "/o/rest/vr-app/techspecs/" +
        "TDTK" +
        vehicleclass +
        "/vehicleclassexts";
      let configTSKT = {
        headers: {
          apikey: "1234567890",
          module: "",
          groupId: 55301,
        },
      };
      let tskt = axios.get(url, configTSKT);
      let tsktExts = axios.get(urlTDTK, configTSKT);
      Promise.all([tskt, tsktExts]).then((results) => {
        let resTSKT = results[0]["data"] || [];
        let resTSKT2 = results[1]["data"] || [];
        console.log("resTSKT============", resTSKT);
        console.log("resTSKT2============", resTSKT2);
        let resTmp = resTSKT.concat(resTSKT2);
        let res = [];
        for (var i = 0; i < resTmp.length; i++) {
          let items = resTmp[i]["items"] || [];
          for (var j = 0; j < items.length; j++) {
            if (items[j] && items[j]["datasource"]) {
              res.push({
                key: "data." + table + "." + items[j]["key"],
                value: items[j]["title"],
                type: "select",
                itemText: "text",
                itemValue: "value",
                items: items[j]["datasource"],
              });
            } else {
              res.push({
                key: "data." + table + "." + items[j]["key"],
                value: items[j]["title"],
                type: "string",
              });
            }
          }
        }
        console.log("res============", res);
        vm.conditions = vm.conditions.concat(res);
      });
    },
    removeSearch(item, index) {
      if (this.listSearch && this.listSearch["length"] === 1) {
        return;
      }
      this.listSearch.splice(index, 1);
    },
    getDisplay(item, link, type) {
      let result = "";
      if (!link) {
        return "";
      } else {
        let arrKey = link.split(".");
        for (var i = 0; i < arrKey.length; i++) {
          let key = arrKey[i];
          if (typeof result === "object" && result.constructor === Object) {
            result = result[key];
          } else {
            result = item[key];
          }
        }
      }
      if (type && type === "date" && result) {
        let date = new Date(result);
        let strDate =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        result = strDate;
      }
      console.log("link====================", link, result);
      return result;
    },
    xemGiayChungNhan(item) {
      let vm = this;
      if (
        !item["vr_VehicleTypeCertificate"] ||
        !item["vr_VehicleTypeCertificate"]["deliverableFileEntryid"]
      ) {
        console.log(
          "not deliverableFileEntryid",
          item["vr_VehicleTypeCertificate"]["deliverableFileEntryid"]
        );
        return;
      }
      let url =
        "/o/rest/v2/dossiers/fileEntryId/" +
        item["vr_VehicleTypeCertificate"]["deliverableFileEntryid"];
      let configs = {
        headers: {},
        responseType: "blob",
      };
      axios
        .get(url, configs)
        .then(function (response) {
          var urlRes = window.URL.createObjectURL(response.data);
          window.open(urlRes, "_blank");
        })
        .catch(function (xhr) {
          console.log(xhr);
        });
    },
    xemTSKT(item) {
      let vm = this;
      vm.dialogTSKT = true;
      vm.dossierId = item["dossierId"];
      vm.fileTemplateNo = item["vr_VehicleTypeCertificate"]
        ? item["vr_VehicleTypeCertificate"]["serviceCode"]
        : 0;
      vm.dossierFileId = item["vr_VehicleTypeCertificate"]
        ? item["vr_VehicleTypeCertificate"]["inspectionDossierFileId"]
        : 0;
      vm.getTrackChanges();
      vm.getSchema2(function (response) {
        var sum_res = response;
        vm.getSchema3(function (response2) {
          sum_res = $.merge(sum_res, response2);
          vm.generalHtml2(sum_res);
          $('.lv-one .lv-label:contains("II.5.4")').css("display", "none");
          var dong_co = $("#bb_loai_dong_co").val();
          if (dong_co == "") {
            $("#XCG01277").parent().parent().parent().parent().show();
            $("#XCG01300").parent().parent().parent().parent().show();
            $("#XCG01255").parent().parent().parent().parent().show();

            $("#XCG01277").parent().parent().parent().hide();
            $("#XCG01300").parent().parent().parent().hide();
            $("#XCG01255").parent().parent().parent().hide();

            $("#XCG01277")
              .parent()
              .parent()
              .parent()
              .parent()
              .find(".lv-title")
              .click(false);
            $("#XCG01300")
              .parent()
              .parent()
              .parent()
              .parent()
              .find(".lv-title")
              .click(false);
            $("#XCG01255")
              .parent()
              .parent()
              .parent()
              .parent()
              .find(".lv-title")
              .click(false);
          }
          if (dong_co == "hybrid") {
            $("#XCG01277")
              .parent()
              .parent()
              .parent()
              .find(".lv-title")
              .click(true);
            $("#XCG01277").parent().parent().parent().parent().show();
            $("#XCG01277").parent().parent().parent().show();
            $("#XCG01300").parent().parent().parent().parent().hide();
            $("#XCG01255").parent().parent().parent().parent().hide();
          }
          if (dong_co == "chay_dien") {
            $("#XCG01300")
              .parent()
              .parent()
              .parent()
              .find(".lv-title")
              .click(true);
            $("#XCG01300").parent().parent().parent().parent().show();
            $("#XCG01300").parent().parent().parent().show();
            $("#XCG01277").parent().parent().parent().parent().hide();
            $("#XCG01255").parent().parent().parent().parent().hide();
          }
          if (dong_co == "dot_trong") {
            $("#XCG01255")
              .parent()
              .parent()
              .parent()
              .find(".lv-title")
              .click(true);
            $("#XCG01255").parent().parent().parent().parent().show();
            $("#XCG01255").parent().parent().parent().show();
            $("#XCG01300").parent().parent().parent().parent().hide();
            $("#XCG01277").parent().parent().parent().parent().hide();
          }
        });
      });
    },
    // checkPartNo (serviceCode) {
    //   if () {

    //   }
    // },
    getDossierFileAndView(item) {
      let vm = this;
      let param = {
        params: data,
        responseType: "blob",
      };
      let url =
        "/o/rest/v2/dossiers/" +
        vm.dossierId +
        "/files/" +
        item["referenceUid"];
      axios
        .get("", param)
        .then(function (response) {
          var url = window.URL.createObjectURL(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // getSelect(item, key) {
    //   if (item && item["items"]["length"]) {
    //     return item["items"];
    //   } else {
    //     return [];
    //   }
    // },
    pagingTraCuu(page) {
      let vm = this;
      console.log("vm.pageTraCuuThongKe==============", vm.pageTraCuuThongKe);
      vm.traCuuThongKeAction();
    },
    getHeader(code) {
      let vm = this;
      if (code === "COP") {
        vm.headers = supportData["headersCOP"];
        vm.conditions = supportData["conditionsCOP"];
        vm.sourceTable = "vr_COPReportRepository";
      } else {
        vm.headers = supportData["headersCNCLKL"];
        vm.conditions = supportData["conditionsCNCLKL"];
        vm.sourceTable = "vr_VehicleTypeCertificate";
      }
    },
    searchActionBtn() {
      this.page = 1;
      let path = this.$router.history.current.path;
      let query = this.$router.history.current.query;
      this.$router.push({
        path: path,
        query: {
          ...query,
          page: 1,
        },
      });
    },
    async search(query) {
      console.log(this.module);
      let vm = this;
      console.log("query================", vm.$router.history.current.query);
      let queryTmp = {};
      if (!query) {
        queryTmp = vm.$router.history.current.query;
        console.log("queryTmp================", queryTmp);
        delete queryTmp["page"];
      }
      let queries = vm.generateQuery(queryTmp);
      this.$store.dispatch("getDataTable", queries).then((result) => {
        console.log("result ============>>", result);
        let tmpData = result["hits"]["hits"] || [];
        if (tmpData && tmpData["length"]) {
          if (vm.codeTable === "COP") {
            tmpData = vm.convertModelCOP(tmpData);
          } else {
            tmpData = vm.convertModelCNCLKL(tmpData);
          }
        }
        console.log("tempData==============", tmpData);
        vm.lists = tmpData;
        vm.totalTraCuu = result["hits"]["total"] || 0;
      });
    },
    convertModelCOP(model) {
      if (!model) {
        return [];
      }
      return model.map((item) => {
        return {
          vr_COPProductionPlantEquipment:
            item["_source"]["data"]["vr_COPProductionPlantEquipment"],
          vr_COPProductType: item["_source"]["data"]["vr_COPProductType"],
          vr_COPReportRepository:
            item["_source"]["data"]["vr_COPReportRepository"],
          vr_COPProductionPlantEmployee:
            item["_source"]["data"]["vr_COPProductionPlantEmployee"],
          vr_COPReport_Attach: item["_source"]["data"]["vr_COPReport_Attach"],
          vr_COPProductLine: item["_source"]["data"]["vr_COPProductLine"],
          vr_COPProductionPlantProdEquipment:
            item["_source"]["data"]["vr_COPProductionPlantProdEquipment"],
          dossierId: item["_source"]["dossierId"],
          dossierIdCTN: item["_source"]["dossierIdCTN"],
          dossierNo: item["_source"]["dossierNo"],
          companyId: item["_source"]["companyId"],
          id: item["_source"]["id"],
        };
      });
    },
    convertModelCNCLKL(model) {
      if (!model) {
        return [];
      }
      return model.map((item) => {
        return {
          vr_technicalspec_xmy: item["_source"]["data"]["vr_technicalspec_xmy"],
          vr_cfg_technicalspec: item["_source"]["data"]["vr_cfg_technicalspec"],
          vr_VehicleSpecification:
            item["_source"]["data"]["vr_VehicleSpecification"],
          vr_inspectionstandard:
            item["_source"]["data"]["vr_inspectionstandard"],
          vr_technicalspec_xcg: item["_source"]["data"]["vr_technicalspec_xcg"],
          vr_VehicleEquipment: item["_source"]["data"]["vr_VehicleEquipment"],
          vr_technicalspec_lkxmy:
            item["_source"]["data"]["vr_technicalspec_lkxmy"],
          vr_technicalspec_xdd: item["_source"]["data"]["vr_technicalspec_xdd"],
          vr_technicalspec_xcnbb:
            item["_source"]["data"]["vr_technicalspec_xcnbb"],
          vr_cfg_limit_technicalspec:
            item["_source"]["data"]["vr_cfg_limit_technicalspec"],
          vr_technicalspec_lkxcg:
            item["_source"]["data"]["vr_technicalspec_lkxcg"],
          vr_technicalspec_xchbb:
            item["_source"]["data"]["vr_technicalspec_xchbb"],
          vr_VehicleTypeCertificate:
            item["_source"]["data"]["vr_VehicleTypeCertificate"],
          dossierId: item["_source"]["dossierId"],
          dossierIdCTN: item["_source"]["dossierIdCTN"],
          dossierNo: item["_source"]["dossierNo"],
          companyId: item["_source"]["companyId"],
          id: item["_source"]["id"],
        };
      });
    },
    generateQuery(query) {
      let vm = this;
      let mustQuery = [
        {
          match: {
            type_es: vm.soureTable,
          },
        },
      ];
      let queries = {
        indice: vm.soureTable,
        query: {
          size: 20,
          from: this.pageTraCuuThongKe * 20 - 20,
          query: {
            bool: {
              must: mustQuery,
            },
          },
        },
      };
      for (var i = 0; i < vm.listSearch.length; i++) {
        if (vm.listSearch[i] && vm.listSearch[i]["conditionsSelect"]) {
          let conditionsSelect = vm.listSearch[i]["conditionsSelect"];
          var key = conditionsSelect['key']
          if (key && key.indexOf('data.') === -1) {
            key = "data." + key;
          }
          if (vm.listSearch[i]["conditionsSelect"]["type"] === "string") {
            if (conditionsSelect) {
              let tmpObj = {};
              tmpObj[key] = vm.listSearch[i]["valueSearch"];
              mustQuery.push({
                match_phrase: tmpObj,
              });
            }
          } else if (
            vm.listSearch[i]["conditionsSelect"]["type"] === "keyword"
          ) {
            if (conditionsSelect) {
              let tmpObj = {
                term: {},
              };
              // tmpObj['term'][key + '.keyword'] = vm.listSearch[i]['valueSearch']
              tmpObj["term"][key] = vm.listSearch[i]["valueSearch"];
              mustQuery.push(tmpObj);
            }
          } else if (vm.listSearch[i]["conditionsSelect"]["type"] === "date") {
            if (conditionsSelect) {
              let tmpObj = {};
              let fromDate = vm.parseTimestamp(vm.listSearch[i]["fromDate"]);
              let tmp = 86399000; // 23h59'59s cộng thêm để tìm chính xác tới cuối ngày
              let toDate = vm.parseTimestamp(vm.listSearch[i]["toDate"]) + tmp;
              tmpObj[key] = {
                gte: fromDate,
                lte: toDate,
              };
              mustQuery.push({
                range: tmpObj,
              });
            }
          } else if (
            vm.listSearch[i]["conditionsSelect"]["type"] === "number"
          ) {
            console.log(
              "typeSearch+++++++++++++++++++",
              vm.listSearch[i]["typeSearch"]
            );
            if (conditionsSelect) {
              let tmpObj = {};
              tmpObj[key] = {};
              if (vm.listSearch[i]["typeSearch"] === "gte") {
                tmpObj[key] = {
                  gte: parseFloat(vm.listSearch[i]["valueSearch"]),
                };
                mustQuery.push({
                  range: tmpObj,
                });
              } else if (vm.listSearch[i]["typeSearch"] === "lte") {
                tmpObj[key] = {
                  lte: parseFloat(vm.listSearch[i]["valueSearch"]),
                };
                mustQuery.push({
                  range: tmpObj,
                });
              } else if (vm.listSearch[i]["typeSearch"] === "=") {
                tmpObj[key] = {
                  lte: parseFloat(vm.listSearch[i]["valueSearch"]),
                  gte: parseFloat(vm.listSearch[i]["valueSearch"]),
                };
                mustQuery.push({
                  range: tmpObj,
                });
              } else {
                tmpObj[key] = {
                  lte: parseFloat(vm.listSearch[i]["valueSearch"]),
                  gte: parseFloat(vm.listSearch[i]["valueSearch"]),
                };
                mustQuery.push({
                  range: tmpObj,
                });
              }
            }
          } else if (
            vm.listSearch[i]["conditionsSelect"]["type"] === "select"
          ) {
            if (conditionsSelect && vm.listSearch[i]["valueSearch"] !== "") {
              let tmpObj = {
                term: {},
              };
              // tmpObj['term'][key + '.keyword'] = vm.listSearch[i]['valueSearch']
              tmpObj["term"][key] = vm.listSearch[i]["valueSearch"];
              mustQuery.push(tmpObj);
            }
          }
        }
      }
      let tmpObj = {
        term: {},
      };
      if (vm.selectModule["module"] !== "COP") {
        tmpObj["term"]["data.vr_VehicleTypeCertificate.serviceCode"] =
        vm.selectModule["module"] || "";
        mustQuery.push(tmpObj);
      }
      queries = {
        indice: vm.soureTable,
        query: {
          size: 20,
          _source: vm.selectModule["sourceFilters"] || {
            excludes: ["data.vr_VehicleSpecification"],
          },
          from: this.pageTraCuuThongKe * 20 - 20,
          query: {
            bool: {
              must: mustQuery,
            },
          },
        },
      };
      console.log("query ========", queries);
      return queries;
    },
    traCuuThongKe: function (callBack) {
      var vm = this;
      console.log("load more!!");
      vm.pageTraCuuThongKe = 1;
      if (!vm.checkSearch()) {
        toastr.error("Vui lòng chọn một điều kiện tìm kiếm!");
        return;
      }
      vm.traCuuThongKeAction();
    },
    traCuuThongKeAction: function (callBack) {
      var vm = this;
      let queries = vm.generateQuery({});
      vm.listsTraCuu = [];
      vm.loadingTableTraCuu = true;
      var promise = new Promise(function (resolve, reject) {
        var url = "/o/rest/vr-app/_search";
        axios
          .post(url, queries)
          .then(function (response) {
            var serializable = response.data;
            if (typeof serializable["hits"]["total"] === "number") {
              vm.totalTraCuu = serializable["hits"]["total"] || 0;
              vm.lengthPageTraCuuThongKe = Math.ceil(
                (serializable["hits"]["total"] || 0) / 20
              );
            } else {
              vm.totalTraCuu = serializable["hits"]["total"]
                ? serializable["hits"]["total"]["value"]
                : 0;
              let totalTmp = serializable["hits"]["total"]
                ? serializable["hits"]["total"]["value"]
                : 0;
              vm.lengthPageTraCuuThongKe = Math.ceil(totalTmp / 20);
            }
            let tmpData = serializable["hits"]["hits"] || [];
            if (tmpData && tmpData["length"]) {
              if (vm.selectModule && vm.selectModule["module"] === "COP") {
                tmpData = vm.convertModelCOP(tmpData);
              } else {
                tmpData = vm.convertModelCNCLKL(tmpData);
              }
            }
            vm.listsTraCuu = tmpData || [];
            vm.loadingTableTraCuu = false;
            resolve(true);
          })
          .catch(function (error) {
            console.log(error);
            setTimeout(function () {
              vm.loadingTableTraCuu = false;
            }, 2000);
            reject(false);
          });
      });
      promise.then(
        function (success) {},
        function (xhr) {}
      );
    },
    addSearch() {
      const index = this.listSearch.length + 1;
      const item = {
        index,
        value: null,
        searchType: null,
        dataitem: null,
        dataCollection: [],
        conditionsSelect: {},
      };
      this.listSearch.push(item);
    },
    paggingData(config) {
      this.page = config["page"];
      let path = this.$router.history.current.path;
      let query = this.$router.history.current.query;
      this.$router.push({
        path: path,
        query: {
          ...query,
          page: config["page"],
        },
      });
    },
  },
  filters: {
    maXuong(value) {
      if (!value) {
        return;
      }
      return value.substring(value.length - 12, value.length);
    },
    money(value) {
      if (value) {
        var moneyCur = (value / 1).toFixed(0).replace(".", ",");
        return (
          moneyCur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"
        );
      } else {
        return "";
      }
    },
  },
};
/* eslint-disable */
</script>

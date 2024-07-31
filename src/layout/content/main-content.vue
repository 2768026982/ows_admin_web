<template>
  <main class="site-content" :class="{ 'site-content--tabs': $route.meta.isTab }">
    <el-tabs
      v-if="$route.meta.isTab"
      v-model="mainTabsActiveName"
      class="main-tabs"
      :closable="true"
      @tab-click="selectedTabHandle"
      @tab-remove="removeTabHandle">
      <el-dropdown class="site-tabs__tools" :show-timeout="0">
        <span>{{$t("main-content.tabs-span")}}</span><i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="tabsCloseCurrentHandle">{{$t("main-content.dropdown-item-1")}}</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseOtherHandle">{{$t("main-content.dropdown-item-2")}}</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseAllHandle">{{$t("main-content.dropdown-item-3")}}</el-dropdown-item>
          <el-dropdown-item @click.native="refresh()">{{$t("main-content.dropdown-item-4")}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tab-pane
        v-for="item in mainTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name">
        <el-card :body-style="siteContentViewHeight">
          <iframe
            v-if="item.type === 'iframe'"
            :src="item.iframeUrl"
            width="100%" height="100%" frameborder="0" scrolling="yes">
          </iframe>
          <keep-alive v-else>
            <router-view v-if="item.name === mainTabsActiveName"/>
          </keep-alive>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <!-- 主入口标签页 e -->
    <el-card v-else :body-style="siteContentViewHeight">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </el-card>
  </main>

</template>

<script>
import {isURL} from '@/utils/validate'

export default {
    inject: ['refresh'],
    provide() {
      return {
        drawerClose: this.drawerClose,
        closeCurrentTab: this.tabsCloseCurrentHandle,
      }
    },
    components: {},
    data() {
      return {
        contentHeight: document.documentElement['clientHeight'] - 72 - 1
      }
    },
    computed: {
      documentClientHeight: {
        get() {
          return this.$store.state.common.documentClientHeight
        }
      },
      menuActiveName: {
        get() {
          return this.$store.state.common.menuActiveName
        },
        set(val) {
          this.$store.commit('common/updateMenuActiveName', val)
        }
      },
      mainTabs: {
        get() {
          return this.$store.state.common.mainTabs
        },
        set(val) {
          this.$store.commit('common/updateMainTabs', val)
        }
      },
      mainTabsActiveName: {
        get() {
          return this.$store.state.common.mainTabsActiveName
        },
        set(val) {
          this.$store.commit('common/updateMainTabsActiveName', val)
        }
      },
      siteContentViewHeight() {
        var height = this.documentClientHeight - 72 - 1;
        if (this.$route.meta.isTab) {
          height -= 40
          return isURL(this.$route.meta.iframeUrl) ? {height: height + 'px'} : {minHeight: height + 'px'}
        }
        return {minHeight: height + 'px'}
      },
      //跳轉的目標頁面的name
      routeName: {
        get() {
          return this.$store.state.clickSide.routeName
        },
        set(val) {
          this.$store.commit('clickSide/updateRouteName', val)
        }
      },
      //系統管理：支付方式設定頁面   只讀true 可修改false
      presetValueListReadonly: {
        get() {
          return this.$store.state.clickSide.presetValueList.readonly
        },
        set(val) {
          this.$store.commit('clickSide/updateReadonly', val)
        }
      },
      //系統管理：支付方式設定頁面   是否調接口
      presetValueListGoApiFlag: {
        get() {
          return this.$store.state.clickSide.presetValueList.goApiFlag
        },
        set(val) {
          this.$store.commit('clickSide/updateGoApiFlag', val)
        }
      },
      //商戶管理--詳細--支付方式頁面只讀true 可修改false
      payInfoReadonly: {
        get() {
          return this.$store.state.clickSide.merchantPayInfo.readonly
        },
        set(val) {
          this.$store.commit('clickSide/updateMerReadonly', val)
        }
      },
      //商戶管理--詳細--支付方式頁面:是否調接口
      payInfoGoApiFlag: {
        get() {
          return this.$store.state.clickSide.merchantPayInfo.goApiFlag
        },
        set(val) {
          this.$store.commit('clickSide/updateMerGoApiFlag', val)
        }
      },
    },
    mounted() {
      window.onresize = () => {
        setTimeout(() => {
          this.contentHeight = document.documentElement['clientHeight'] - 72 - 1
        }, 200)

      }
    },
    methods: {
      // tabs, 选中tab
      selectedTabHandle(tab) {
        tab = this.mainTabs.filter(item => item.name === tab.name);
        //保存當前當前點擊的是哪個頁面的name
        this.routeName = tab[0].name;
        //支付方式預設值設定  是可修改狀態 要問詢
        if (!this.presetValueListReadonly) {
          if (tab[0].name !== 'payment-preset-value-list') {
            this.openTips(this.$t("main-content.selectedTabHandle-preset-tips"),1);
          }
        }
        if (!this.payInfoReadonly) {
          //商戶管理---詳細---支付方式是可修改狀態  要問詢
          if (tab[0].name !== 'merchant-base/base-list') {
            this.openTips(this.$t("main-content.selectedTabHandle-pay-tips"),2);
          }
        } else {
          if (tab.length >= 1) {
            this.$router.push({name: tab[0].name, query: tab[0].query, params: tab[0].params});
            //支付方式預設值設定 只讀
            this.presetValueListReadonly = true;
            //商戶管理--詳細--支付方式 只讀
            this.payInfoReadonly = true;
          }
        }
      },
      openTips(title,type) {
        let prompt = this.$t("main-content.tips-title")?
          this.$t("main-content.tips-title"):'提示';
        let confirm = this.$t("main-content.tips-confirmButtonText")?
          this.$t("main-content.tips-confirmButtonText"):'確定';
        let cancel = this.$t("main-content.tips-cancelButtonText")?
          this.$t("main-content.tips-cancelButtonText"):'取消';

        this.$confirm(title, prompt, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'warning'
        }).then(() => {
          if (type === 1) {
            //調保存接口
            this.presetValueListGoApiFlag = true;
          }
          if (type === 2) {
            //調接口
            this.payInfoGoApiFlag = true;
          }
        }).catch(() => {
          if (type === 1) {
            //不調接口
            this.presetValueListGoApiFlag = false;
            //支付方式預設值設定 修改中
            this.presetValueListReadonly = false;
          }
          if (type === 2) {
            //不調接口
            this.payInfoGoApiFlag = false;
            //商戶--詳細--支付方式 修改中
            this.payInfoReadonly = false;
          }
        })
      },
      updateStatus() {
        //系統管理---支付方式預設值設定 只讀
        this.presetValueListReadonly = true;
        //商戶--詳細--支付方式 只讀
        this.payInfoReadonly = true;
      },
      // tabs, 刪除tab
      removeTabHandle(tabName) {
        this.updateStatus();
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            var tab = this.mainTabs[this.mainTabs.length - 1]
            this.$router.push({name: tab.name, query: tab.query, params: tab.params}, () => {
              this.mainTabsActiveName = this.$route.name
            })
          }
        } else {
          this.menuActiveName = ''
          this.$router.push({name: 'home'})
        }
      },
      // tabs, 关闭当前
      tabsCloseCurrentHandle() {
        this.removeTabHandle(this.mainTabsActiveName)
      },
      // tabs, 关闭其它
      tabsCloseOtherHandle() {
        this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
      },
      // tabs, 关闭全部
      tabsCloseAllHandle() {
        this.mainTabs = []
        this.menuActiveName = ''
        this.$router.push({name: 'home'})
      },
      // tabs, 刷新当前
      tabsRefreshCurrentHandle() {
        var tab = this.$route
        this.removeTabHandle(tab.name)
        this.$nextTick(() => {
          this.$router.push({name: tab.name, query: tab.query, params: tab.params})
        })
      },

      drawerClose() {
        var el = document.getElementsByTagName("body")[0];
        var hasClass = this.hasClassFun(el, 'el-popup-parent--hidden');
        if (document.querySelector(".el-drawer__open") != null) {
          if (hasClass == false) {
            el.className += ' el-popup-parent--hidden ';
            setTimeout(() => {
              this.drawerClose()
            }, 500)
          }
        } else {
          var DomClass = el.className;
          DomClass = DomClass.replace('el-popup-parent--hidden', "");
          el.className = DomClass;
        }
      },
      hasClassFun(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
      }
    }
  }
</script>
<style lang="scss" scoped>
  /deep/ .site-content > .el-tabs > .el-tabs__content {
    padding: 0 !important;
  }

  .main-tabs {
    /deep/ .el-tabs__item:focus.is-active.is-focus:not(:active) {
      box-shadow: none;
    }
  }

</style>


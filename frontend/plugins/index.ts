import Vue from 'vue'
import Container from '~/components/Container.vue'
import FormItemLabel from '~/components/FormItemLabel.vue'
import ImageUploader from '~/components/ImageUploader.vue'
import MessageAlert from '~/components/MessageAlert.vue'
import Selector from '~/components/Selector.vue'
import Thumbnail from '~/components/Thumbnail.vue'
import BtnEdit from '~/components/BtnEdit.vue'
import BtnRemove from '~/components/BtnRemove.vue'
import BtnSave from '~/components/BtnSave.vue'
import BtnBack from '~/components/BtnBack.vue'
import BtnRefresh from '~/components/BtnRefresh.vue'
import BtnUndo from '~/components/BtnUndo.vue'
import TipIcon from '~/components/TipIcon.vue'
import FiltersBox from '~/components/FiltersBox.vue'
import FiltersBoxItem from '~/components/FiltersBoxItem.vue'
import Icon from '~/components/Icon.vue'
import SnackBar from '~/components/SnackBar.vue'
import DateInput from '~/components/DateInput.vue'
import HelperFunctions from '~/components/HelperFunctions.vue'
import CenteredLogo from '~/components/CenteredLogo.vue'
import FooterBar from '~/components/FooterBar.vue'
import TutorialLabel from '~/components/TutorialLabel.vue'
import TooltipInfo from '~/components/TooltipInfo.vue'
import CardPanel from '~/components/CardPanel.vue'
import ColorPanel from '~/components/ColorPanel.vue'
import WikiLink from '~/components/WikiLink.vue'

Vue.component('container', Container)
Vue.component('FormItemLabel', FormItemLabel)
Vue.component('ImageUploader', ImageUploader)
Vue.component('MessageAlert', MessageAlert)
Vue.component('Selector', Selector)
Vue.component('Thumbnail', Thumbnail)
Vue.component('BtnEdit', BtnEdit)
Vue.component('BtnRemove', BtnRemove)
Vue.component('BtnSave', BtnSave)
Vue.component('BtnBack', BtnBack)
Vue.component('BtnRefresh', BtnRefresh)
Vue.component('BtnUndo', BtnUndo)
Vue.component('TipIcon', TipIcon)
Vue.component('FiltersBox', FiltersBox)
Vue.component('FiltersBoxItem', FiltersBoxItem)
Vue.component('Icon', Icon)
Vue.component('SnackBar', SnackBar)
Vue.component('DateInput', DateInput)
Vue.component('HelperFunctions', HelperFunctions)
Vue.component('CenteredLogo', CenteredLogo)
Vue.component('FooterBar', FooterBar)
Vue.component('TutorialLabel', TutorialLabel)
Vue.component('TooltipInfo', TooltipInfo)
Vue.component('CardPanel', CardPanel)
Vue.component('ColorPanel', ColorPanel)
Vue.component('WikiLink', WikiLink)

// Global
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

import { Dialog } from 'quasar'
import AlertComponent from 'src/components/Dialog/AlertComponent'
export const alertDialog = ({
  title,
  message = null,
  submessage = null,
  onYes = () => { },
  persistent = false,
  label = 'Ok',
  isForm = false,
  iconPath,
  iconName,
  iconClass
}) => {
  Dialog.create({
    component: AlertComponent,
    parent: this,
    html: true,
    title,
    isForm,
    message,
    submessage,
    label,
    iconPath,
    iconName,
    iconClass,
    persistent
  }).onOk(onYes)
}

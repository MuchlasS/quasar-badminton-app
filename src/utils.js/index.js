import { Dialog, Notify } from 'quasar'
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

export const showNotification = ({ message, color = 'blue', icon }) => {
  Notify.create({
    message,
    color,
    icon,
    position: 'top',
    progress: true,
    timeout: 3000
  })
}

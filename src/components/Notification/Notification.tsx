import {
  toast,
  Slide,
  type ToastPosition,
  type ToastOptions,
} from 'react-toastify'

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default'

interface ToastParams {
  type?: ToastType
  text: string
  options?: ToastOptions
}

export const showToast = ({
  type = 'default',
  text,
  options = {},
}: ToastParams) => {
  const baseOptions: ToastOptions = {
    position: (options.position || 'top-right') as ToastPosition,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    ...options,
  }

  switch (type) {
    case 'success':
      toast.success(text, baseOptions)
      break
    case 'error':
      toast.error(text, baseOptions)
      break
    case 'info':
      toast.info(text, baseOptions)
      break
    case 'warning':
      toast.warning(text, baseOptions)
      break
    default:
      toast(text, baseOptions)
  }
}

import React, { useEffect } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import './ResponsiveDialog.css'

interface Props {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const ResponsiveDialog = ({ open, onClose, children }: Props) => {
  const isMobile = useIsMobile()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  if (!open) return null

  return (
    <div className="dialog-backdrop">
      <div className={isMobile ? 'dialog-drawer' : 'dialog-modal'}>
        {isMobile && (
          <button className="dialog-close" onClick={onClose}>
            ✕
          </button>
        )}
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  )
}

export default ResponsiveDialog

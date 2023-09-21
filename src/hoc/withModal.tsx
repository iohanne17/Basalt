import React, { useEffect, useState, ComponentType, ReactNode, useContext } from 'react'
import { BackHandler, InteractionManager, Keyboard, Modal, View, StyleSheet } from 'react-native'

export interface ModalOptions {
  scrollable?: boolean
  fullScreen?: boolean
  closeCb?: () => void
}

type openModalFunc = (data: ReactNode, modalOptions?: ModalOptions) => void

export interface TWithModal {
  openModal: openModalFunc
  closeModal: () => void
}

export const ModalsContext = React.createContext<TWithModal>({
  openModal: () => console.warn('openModal must be overriden'),
  closeModal: () => console.warn('closeModal must be overriden'),
})

interface StateModal {
  isVisible: boolean
  component?: ReactNode
  modalOptions?: ModalOptions
}

interface Props {
  children: ReactNode
}

export const ModalsProvider = (props: Props) => {
  const [state, setState] = useState<StateModal>({
    isVisible: false,
    component: <View />,
    modalOptions: undefined,
  })

  const openModal: openModalFunc = (component, modalOptions) => {
    Keyboard.dismiss()
    setState({
      isVisible: true,
      component,
      modalOptions,
    })
  }

  const closeModal = () => {
    InteractionManager.runAfterInteractions(() => {
      setState({
        ...state,
        isVisible: false,
      })
      if (modalOptions?.closeCb) {
        modalOptions.closeCb()
      }
    })
  }

  const { component, isVisible, modalOptions } = state

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isVisible) {
      const backAction = () => {
        closeModal()

        return true
      }
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

      return () => {
        backHandler.remove()
      }
    }
  }, [isVisible])

  return (
    <ModalsContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {props.children}
      <Modal animationType="slide" transparent={false} visible={isVisible}>
        <View style={styles.modalContent}>{component}</View>
      </Modal>
    </ModalsContext.Provider>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: '100%',
    width: '100%',
    paddingTop: 50,
    backgroundColor: '#25292e',
    paddingHorizontal: 16,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
})

export function withModal<P>(WrappedComponent: ComponentType<P & TWithModal>) {
  const ComponentWithExtraInfo = (props: P) => {
    const { openModal, closeModal } = useContext(ModalsContext)
    // At this point, the props being passed in are the original props the component expects.
    return <WrappedComponent {...props} openModal={openModal} closeModal={closeModal} />
  }
  return ComponentWithExtraInfo
}

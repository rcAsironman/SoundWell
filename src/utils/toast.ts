import Toast from 'react-native-toast-message';


export const showSuccessToast = (title: string, message = '', visibility = 3000) => {

    Toast.show({
        type: 'success', // 'success' | 'error' | 'info'
        text1: title,
        text2: message,
        visibilityTime: visibility,
        position: 'bottom'
    })

}

export const showErrorToast = (title: string, message = '', visibility = 3000) => {
    Toast.show({
        type: 'error', // 'success' | 'error' | 'info'
        text1: title,
        text2: message,
        visibilityTime: visibility,
        position: 'bottom'
    })
}

export const showWarningToast = (title: string, message = '', visibility = 3000) =>{ 
    Toast.show({
        type: 'warning', // 'success' | 'error' | 'info'
        text1: title,
        text2: message,
        visibilityTime: visibility,
        position: 'bottom'
    })
}

import { useCallback } from 'react'

const useConvertToBase64 = () => {
    return useCallback((file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result)
            };
            reader.onerror = function (error) {
                console.log('Error while converting imag to Base64: ', error);
                reject(false)
            };
        })

    }, [])
}

export default useConvertToBase64
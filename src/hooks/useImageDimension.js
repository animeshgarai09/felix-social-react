import { useCallback } from 'react'

const useImageDimension = () => {
    return useCallback((image) => {
        return new Promise(function (resolved, rejected) {
            var i = new Image()
            i.src = image
            i.onload = function () {
                if (i.width > i.height) {
                    resolved({ width: i.width, height: i.height, orientation: "horizontal" })
                } else {
                    resolved({ width: i.width, height: i.height, orientation: "vertical" })
                }
            };
        })
    }, [])
}

export default useImageDimension
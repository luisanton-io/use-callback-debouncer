import { useState, useEffect, useCallback } from "react"

const useCallbackDebouncer = function <T>(callback: () => T, timeout: number = 250) {

    const [callbackTimeout, setCallbackTimeout] = useState<NodeJS.Timeout | null>(null)

    const debouncedCallback = () => {
        setCallbackTimeout(setTimeout(callback, timeout));
    }
    const cancelDebounce = useCallback(() => {
        callbackTimeout && clearTimeout(callbackTimeout)
    }, [callbackTimeout])

    useEffect(() => cancelDebounce, [cancelDebounce])

    return [debouncedCallback, cancelDebounce]
}

export default useCallbackDebouncer
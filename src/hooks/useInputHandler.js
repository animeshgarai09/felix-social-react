import { useState } from "react"

const useInputHandler = (state) => {
    const [inputState, setInputState] = useState(state)
    const inputChange = (evt) => {
        const type = evt.target.type;
        const value = evt.target.value;
        const name = evt.target.name
        console.log(type)
        switch (type) {

            case 'checkbox':
                if (value !== "on") {
                    setInputState({
                        ...inputState,
                        [name]: value
                    });
                } else {

                    setInputState({
                        ...inputState,
                        [name]: evt.target.checked
                    });
                }
                break
            default:
                setInputState({
                    ...inputState,
                    [name]: value
                });
                break
        }


    }
    return { inputState, inputChange, setInputState }
}

export default useInputHandler
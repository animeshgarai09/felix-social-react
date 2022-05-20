import styles from "./emoji-picker.module.scss"
import data from '@emoji-mart/data/sets/14/native.json'
import { Picker } from 'emoji-mart'
import { useRef, useEffect, useState } from 'react'
import { IconButton, useOnClickOutside } from 'react-felix-ui'
import { CgSmileMouthOpen } from "@icons"
import useDarkMode from "use-dark-mode";
import { usePopper } from 'react-popper';

const EmojiPicker = ({ onEmojiSelect }) => {
    const ref = useRef()
    const [isVisible, setPicker] = useState(false)
    const { value } = useDarkMode();
    const [buttonElement, setButtonElement] = useState(null);
    const [pickerElement, setPickerElement] = useState(null);

    const dropdownRef = useOnClickOutside({ handler: () => setPicker(false), nodes: [buttonElement] })

    const { styles: { popper: popperStyles },
        attributes: { popper: popperAttributes }, update } = usePopper(
            buttonElement,
            pickerElement, {
            placement: "top-start",
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [-5, 15]
                    },
                },
            ],
        });
    useEffect(() => {
        new Picker({
            onEmojiSelect,
            data,
            // set: "facebook",
            ref,
            theme: "auto",
            previewPosition: "none"
        })
    }, [value])

    useEffect(() => {
        dropdownRef.current = ref.current
        setPickerElement(ref.current)
    }, [ref.current])

    return (
        <>
            <IconButton
                ref={setButtonElement}
                icon={<CgSmileMouthOpen />}
                onClick={() => { setPicker(prev => !prev); update() }}
                className={styles.iconButton}
            />
            <div ref={ref}
                className={`${styles.emoji_con} ${isVisible && styles.visible}`}
                style={popperStyles}
                {...popperAttributes}
            ></div>
        </>
    )
}
export default EmojiPicker
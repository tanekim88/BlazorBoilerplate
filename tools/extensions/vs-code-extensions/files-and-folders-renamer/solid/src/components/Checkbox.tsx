


import type { Component } from "solid-js";


interface Props {
    checked;
    label;
}

const Checkbox: Component<Props> = (props: Props) => {
    return (
        <div class={styles.App}>
            <div class="mdc-checkbox">
                <input
                    type="checkbox"
                    class="mdc-checkbox__native-control"
                    id="{id}"
                    checked={props.checked}
                />
                <div class="mdc-checkbox__background">
                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                        <path
                            class="mdc-checkbox__checkmark-path"
                            fill="none"
                            d="M1.73,12.91 8.1,19.28 22.79,4.59"
                        />
                    </svg>
                </div>
            </div>
            <label for="{id}">{props.label}</label>
        </div >
    );
};

export default Checkbox;

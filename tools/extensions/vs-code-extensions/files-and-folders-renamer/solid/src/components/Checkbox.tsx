


import type { Component } from "solid-js";
import { uid } from "uid";


interface Props {
    checked;
    label;
    onChange?;
}

export const Checkbox: Component<Props> = (props: Props) => {
    let id = `checkbox-${uid()}`;
    return (
        <>
            <div class="mdc-checkbox">
                <input
                    type="checkbox"
                    class="mdc-checkbox__native-control"
                    id={id}
                    checked={props.checked}
                    onchange={props.onChange}
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
            <label for={id}>{props.label}</label>
        </>
    );
};

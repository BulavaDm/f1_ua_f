<template>
    <div class="select">
        <div v-if="showLabel" class="select__label">
            {{ label }}
        </div>
        <div class="select__wrapper">
            <VueMultiselect
                v-model="selectedValue"
                :searchable="false"
                :placeholder="placeHolder"
                :options="options"
                :show-labels="false"
                :allow-empty="false"
                :label="labelType"
                :track-by="labelType"
                @select="selectOption"
            >
                <template v-slot:singleLabel="{ option }">
                    <div class="select__option option">
                        <div class="option__text can-overflow">
                            {{ option.name }}
                        </div>
                    </div>
                </template>
                <template v-slot:option="{ option }">
                    <div class="select__option option">
                        <div class="option__text can-overflow">
                            {{ option.name }}
                        </div>
                    </div>
                </template>
                <template v-slot:noResult>
                    Дані відсутні
                </template>
                <template v-slot:noOptions>
                    Дані відсутні
                </template>
            </VueMultiselect>
            <div v-if="selectedValue && isClear" class="select__clear">
                <button type="button" @click="clearSelectedOption">
                    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.875 1.50625L7.99375 0.625L4.5 4.11875L1.00625 0.625L0.125 1.50625L3.61875 5L0.125 8.49375L1.00625 9.375L4.5 5.88125L7.99375 9.375L8.875 8.49375L5.38125 5L8.875 1.50625Z" fill="#A4AFBE"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import cloneDeep from "lodash.clonedeep";
    import VueMultiselect from 'vue-multiselect';
    import "vue-multiselect/dist/vue-multiselect.css";

    export default {
        name: "AppBaseSelect",

        components: {
            VueMultiselect
        },

        props: {
            label: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                required: true
            },
            selectedOption: {
                type: Object
            },
            placeHolder: {
                type: String,
                default: ''
            },
            isClear: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                selectedValue: null,
            }
        },

        watch: {
            selectedOption(option) {
                if (option) {
                    this.selectedValue = cloneDeep(this.selectedOption);
                }
            },
        },

        computed: {
            showLabel() {
                return !!this.label;
            },

            labelType() {
                return 'name';
            }
        },

        methods: {
            selectOption(option) {
                this.$emit('select', option);
            },

            clearSelectedOption() {
                this.selectedValue = null;
                this.$emit('select', null);
            }
        }
    }
</script>


<style lang="scss">
    .select {
        position: relative;
        width: 100%;

        &__wrapper {
            position: relative;
        }

        &__clear {
            position: absolute;
            right: 32px;
            top: 11px;
            background: transparent;
            height: 24px;
            border-right: 1px solid var(--app-border);

            button {
                padding-right: 10px;
            }
        }

        &__label {
            margin-bottom: 8px;
        }
    }
</style>
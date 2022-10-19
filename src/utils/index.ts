/* eslint-disable import/prefer-default-export */
export const getFormattedTotalCost = (value: number | string): number | string => (value ? value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : 0);

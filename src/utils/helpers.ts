import type { SweetAlertOptions } from 'sweetalert2';
import Swal from 'sweetalert2';

export const toast = async (data: SweetAlertOptions) => {
    const options = {
        ...data,
        icon: data.icon ?? 'success',
        timer: (data.timer ?? 7) * 1000, // 7 secs,
        position: data.position ?? 'bottom-right',
        toast: data.toast ?? true,
        title: data.title,
        showConfirmButton: data.showConfirmButton ?? false,
    };

    await Swal.fire(options);
};

export const currencyFormat = (number?: number, currency = 'KES') => number && (new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 4
})).format(number);
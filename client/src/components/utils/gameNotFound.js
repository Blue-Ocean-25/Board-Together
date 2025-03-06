import Swal from 'sweetalert2';
const gameNotFound = () => {
  Swal.fire({
    buttonsStyling: false,
    icon: 'error',
    background: "#ffdba6",
    customClass: {
    popup: 'bg-base-200 text-base-content rounded-lg shadow-xl',
    // icon: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-100 mt-5',
    title: 'text-lg font-bold text-center mt-3',
    htmlContainer: 'text-sm text-gray-500 mt-2 text-center',
    confirmButton: 'btn btn-accent',
    },
    title: 'Invalid Session ID',
    text: 'Game session not found!',
  });
};

export default gameNotFound;
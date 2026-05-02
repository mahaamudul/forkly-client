import Swal from "sweetalert2";

const baseOptions = {
  position: "center",
  width: "30rem",
  background: "#ffffff",
  color: "#171717",
  confirmButtonColor: "#fb923c",
  cancelButtonColor: "#171717",
  reverseButtons: true,
  customClass: {
    popup: "rounded-lg",
    title: "font-cinzel",
    confirmButton: "rounded-md",
    cancelButton: "rounded-md",
  },
};

const originalFire = Swal.fire.bind(Swal);

Swal.fire = (titleOrOptions, html, icon) => {
  const options =
    typeof titleOrOptions === "object"
      ? titleOrOptions
      : { title: titleOrOptions, html, icon };

  return originalFire({
    ...baseOptions,
    ...options,
    position: "center",
    width: baseOptions.width,
    confirmButtonColor: baseOptions.confirmButtonColor,
    cancelButtonColor: baseOptions.cancelButtonColor,
    customClass: {
      ...baseOptions.customClass,
      ...options.customClass,
    },
  });
};

export default Swal;

export function showDialog(name: string) {
    const dialogs = document.querySelectorAll("dialog");
    dialogs.forEach((dialog) => {
        dialog.close();
    });

    // show modal
    (
        document.getElementById(name) as HTMLDialogElement
    ).showModal();

    // hide dialog on backdrop click
    const dialog = document.getElementById(name) as HTMLDialogElement;

    dialog.addEventListener(
        "click",
        (event: { clientX: number; clientY: number }) => {
            const rect = dialog.getBoundingClientRect();
            const isInDialog =
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width;
            if (!isInDialog) {
                dialog.close();
            }
        },
    );
}
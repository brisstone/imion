// modal.js
function openModal(modalId, modalContent) {
  const modal = document.getElementById(modalId);
  const modalBody = modal.querySelector(".modal-body");

  // Clear previous modal content
  modalBody.innerHTML = "";

  // Render new modal content
  modalBody.insertAdjacentHTML("beforeend", modalContent);

  // Show the modal
  modal.style.display = "block";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.addEventListener("click", (event) => {
  const modal = document.querySelector(".modal");
  if (event.target === modal) {
    closeModal(modal.id);
  }
});

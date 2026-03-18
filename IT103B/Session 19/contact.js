let editItem = document.getElementById("btn-edit");
let deleteItem = document.getElementById("btn-delete");

let contacts = [];

function editContact(index) {
    const contact = contacts[index];
    document.getElementById('contact-name').value = contact.name;
    document.getElementById('contact-phone').value = contact.phone;
    document.getElementById('contact-email').value = contact.email;

    const submitBtn = document.querySelector('.btn-add');
    submitBtn.textContent = 'Cập nhật';
}

function deleteContact(index) {
  if (confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {

    contacts.splice(index, 1);

    renderTable();

    alert('Xóa liên hệ thành công!');
  }
}

editContact();
deleteContact();
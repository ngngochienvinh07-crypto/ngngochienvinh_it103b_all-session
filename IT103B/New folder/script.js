let employees = JSON.parse(localStorage.getItem("employees")) || [];

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const pageSizeSelect = document.getElementById("pageSizeSelect");

const totalBadge = document.getElementById("totalBadge");
const listCount = document.getElementById("listCount");
const emptyState = document.getElementById("emptyState");

const formTitle = document.getElementById("formTitle");
const btnSubmit = document.getElementById("btnSubmit");

const inputName = document.getElementById("inputName");
const inputDob = document.getElementById("inputDob");
const inputEmail = document.getElementById("inputEmail");
const inputAddress = document.getElementById("inputAddress");

const paginationDiv = document.getElementById("pagination");
const pageInfo = document.getElementById("pageInfo");

let editId = null;
let currentPage = 1;
let pageSize = parseInt(pageSizeSelect.value);

function saveLocal() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function validateEmployee(name, dob, email, id = null) {
  if (name.trim() === "") {
    alert("Họ và tên không được để trống!");
    return false;
  }

  if (dob === "") {
    alert("Ngày sinh không được để trống!");
    return false;
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(dob)) {
    alert("Ngày sinh không đúng định dạng!");
    return false;
  }

  if (email.trim() === "") {
    alert("Email không được để trống!");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Email không đúng định dạng!");
    return false;
  }

  const isDuplicate = employees.some(emp =>
    emp.email.toLowerCase() === email.toLowerCase() &&
    emp.id !== id
  );

  if (isDuplicate) {
    alert("Email đã tồn tại!");
    return false;
  }

  return true;
}

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function resetForm() {
  inputName.value = "";
  inputDob.value = "";
  inputEmail.value = "";
  inputAddress.value = "";

  formTitle.innerText = "Thêm nhân viên mới";
  btnSubmit.innerText = "Thêm nhân viên";

  editId = null;
}

function submitForm() {
  if (editId === null)
    add();
  else
    updateEmployee();
}

function add() {
  const name = inputName.value.trim();
  const dob = inputDob.value;
  const email = inputEmail.value.trim();
  const address = inputAddress.value.trim();

  if (!validateEmployee(name, dob, email))
    return;

  const newEmployee = {
    id: employees.length + 1,
    name: name,
    dob: formatDate(dob),
    email: email,
    address: address
  };

  employees.push(newEmployee);

  saveLocal();

  currentPage = 1;

  applyFilterSort();

  alert("Thêm nhân viên thành công!");

  resetForm();
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);

  editId = id;

  inputName.value = emp.name;
  inputDob.value = convertToInputDate(emp.dob);
  inputEmail.value = emp.email;
  inputAddress.value = emp.address;

  formTitle.innerText = "Cập nhật nhân viên";
  btnSubmit.innerText = "Lưu thay đổi";
}

function updateEmployee() {
  const name = inputName.value.trim();
  const dob = inputDob.value;
  const email = inputEmail.value.trim();
  const address = inputAddress.value.trim();

  if (!validateEmployee(name, dob, email, editId))
    return;

  const index = employees.findIndex(
    e => e.id === editId
  );

  employees[index] = {
    id: editId,
    name: name,
    dob: formatDate(dob),
    email: email,
    address: address
  };

  saveLocal();

  currentPage = 1;

  applyFilterSort();

  alert("Cập nhật nhân viên thành công!");

  resetForm();
}

function remove(id) {
  const emp = employees.find(e => e.id === id);

  const confirmDelete = confirm(
    `Bạn có chắc muốn xóa nhân viên ${emp?.name || ""} không?`
  );

  if (!confirmDelete) return;

  employees = employees.filter(e => e.id !== id);

  saveLocal();

  currentPage = 1;

  applyFilterSort();

  alert("Xóa nhân viên thành công!");
}

let filteredEmployees = [...employees];

function searchEmployees() {
  const keyword = searchInput.value.toLowerCase();

  filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(keyword) ||
    emp.email.toLowerCase().includes(keyword)
  );

  currentPage = 1;

  applyFilterSort();
}

function sortEmployees() {
  const sort = sortSelect.value;

  if (sort === "name_asc") {
    filteredEmployees.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sort === "name_desc") {
    filteredEmployees.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  if (sort === "dob_asc") {
    filteredEmployees.sort((a, b) =>
      new Date(convertToInputDate(a.dob)) -
      new Date(convertToInputDate(b.dob))
    );
  }

  if (sort === "dob_desc") {
    filteredEmployees.sort((a, b) =>
      new Date(convertToInputDate(b.dob)) -
      new Date(convertToInputDate(a.dob))
    );
  }
}

function applyFilterSort() {
  sortEmployees();
  render();
}

function render() {
  tableBody.innerHTML = "";

  totalBadge.innerText = `${employees.length} nhân viên`;
  listCount.innerText = `${filteredEmployees.length} kết quả`;

  if (filteredEmployees.length === 0) {
    emptyState.style.display = "block";
    tableBody.innerHTML = "";
    pageInfo.innerHTML = "Hiển thị 0 – 0 trong tổng số 0";
    paginationDiv.innerHTML = "";
    return;
  }

  emptyState.style.display = "none";

  const totalPages = Math.ceil(
    filteredEmployees.length / pageSize
  );

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const pageData = filteredEmployees.slice(
    start,
    end
  );

  pageData.forEach((emp, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${start + index + 1}</td>
        <td class="td-name">${emp.name}</td>
        <td>${emp.dob}</td>
        <td class="td-email">${emp.email}</td>
        <td>${emp.address || ""}</td>
        <td>
          <div class="td-actions">
            <button class="btn btn-sm btn-edit" onclick="editEmployee(${emp.id})">Sửa</button>
            <button class="btn btn-sm btn-delete" onclick="remove(${emp.id})">Xóa</button>
          </div>
        </td>
      </tr>
    `;
  });

  pageInfo.innerHTML = `
    Hiển thị <strong>${start + 1}</strong> –
    <strong>${Math.min(end, filteredEmployees.length)}</strong>
    trong tổng số <strong>${filteredEmployees.length}</strong>
  `;

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  paginationDiv.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.innerText = "‹";
  prevBtn.className = "page-btn";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    render();
  };

  paginationDiv.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");

    btn.innerText = i;

    btn.className =
      "page-btn" +
      (i === currentPage ? " active" : "");

    btn.onclick = () => {
      currentPage = i;
      render();
    };

    paginationDiv.appendChild(btn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "›";
  nextBtn.className = "page-btn";
  nextBtn.disabled = currentPage === totalPages;

  nextBtn.onclick = () => {
    currentPage++;
    render();
  };

  paginationDiv.appendChild(nextBtn);
}

function convertToInputDate(dateString) {
  const parts = dateString.split("/");

  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

searchInput.addEventListener("input", searchEmployees);

sortSelect.addEventListener("change", () => {
  currentPage = 1;
  applyFilterSort();
});

pageSizeSelect.addEventListener("change", () => {
  pageSize = parseInt(pageSizeSelect.value);
  currentPage = 1;
  render();
});

btnSubmit.onclick = submitForm;

filteredEmployees = [...employees];

render();

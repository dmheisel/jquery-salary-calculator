$('document').ready(handleReady);

let employeeList = [];

function handleReady() {
	// $('#employeeForm').submit(handleSubmit);
	$('#employeeForm').submit(handleSubmit);
	$('#tableContainer').on('click', '.deleteButton', handleDelete);
}

function handleDelete() {
	//remove from employee array
	let idNumber = $(this)
		.parent()
		.siblings('.emp-ID')
		.text();
	//finds idnumber to remove, filters employee list to remove employee with matcing number
	employeeList = employeeList.filter(
		employee => employee.employeeID !== idNumber
	);

	// let el = $(this).parents('tr');
	// el.remove();
	updateTable();
}

function handleSubmit() {
	event.preventDefault(); // prevents refresh/default action of form submission

	let inputFields = $('#employeeForm :input');
	//selector for finding all input fields
	let employee = {};
	inputFields.each(function() {
		// console.log($(this).attr('name'), $(this).val());
		employee[$(this).attr('name')] = $(this).val();
	});

	let matchingIds = employeeList.filter(
		emp => emp.employeeID === employee.employeeID
	);

	if (matchingIds.length > 0) {
		alert(
			'Employee ID# already present in table.  Check number and re-submit.'
		);
		return;
	}
	//validate that employee isn't already on the table by checking ID

	employee.salary = parseInt(employee.salary);
	//convert salary from str to int

	employeeList.push(employee); // adds to list arary to contain all employees

	inputFields.val('');
	updateTable();
	//updtes from list, not from input
}

function updateTable() {
	$('#employeeTableBody').empty();
	for (let employee of employeeList) {
		let html = `<tr>
      <td class="emp-ID">${employee.employeeID}</td>
      <td class="name-first">${employee.firstName}</td>
      <td class="name-last">${employee.lastName}</td>
      <td class="emp-title">${employee.title}</td>
      <td class="emp-salary">${employee.salary}</td>
      <td>
				<button
					type="button"
					class="deleteButton btn btn-outline-secondary btn-sm"
					>
					Delete
        </button>
        </td>
      </tr>`;
		$('#employeeTableBody').append(html);
	}
	calcMonthlyCost();
}

function calcMonthlyCost() {
	let annualCost = 0;
	for (let employee of employeeList) {
		annualCost += employee.salary;
	}
	let monthlyCost = annualCost / 12;

	$('#totalMonthlyCost').text(
		`${monthlyCost.toLocaleString('en', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
			style: 'currency',
			currency: 'USD',
			currencyDisplay: 'symbol'
		})}`
	); // parses cost to readable display in USD

	if (monthlyCost > 20000) {
		$('#totalMonthlyCost')
			.parent()
			.removeClass('bg-info')
			.addClass('bg-danger');
	}
}
